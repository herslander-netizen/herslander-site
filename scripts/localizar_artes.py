#!/usr/bin/env python3
"""Gera variantes PT-BR das artes do portfólio, sem substituir os originais."""
import argparse
import json
import re
import shutil
from collections import defaultdict
from pathlib import Path

import cv2
import numpy as np
import pytesseract
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "assets/work/img"
OUT = BASE / "ptbr"
FONTS = {
    "sans": "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "bold": "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "serif": "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
}
# Expressões editoriais conferidas. O tradutor offline cobre os demais textos.
GLOSSARY = {
    "visual identity": "Identidade visual",
    "brand identity": "Identidade de marca",
    "brand definition": "Conceito da marca",
    "brand design": "Design de marca",
    "location london": "Localização: Londres",
    "post designs": "Artes para posts",
    "social media": "Redes sociais",
    "the name and the headlines": "O nome e os títulos",
    "fly at first light": "Voe ao amanhecer",
    "first light": "Amanhecer",
    "raised in shade": "Cultivado à sombra",
    "made to glow": "Feito para brilhar",
    "days in the dark": "Dias no escuro",
    "then one green": "Até surgir o verde",
    "you drink the whole leaf": "Você bebe a folha inteira",
    "over a decade": "Ao longo de uma década",
    "no model of the year": "Sem modelo do ano",
    "no themed edition": "Sem edição temática",
    "time does not shout": "O tempo não grita",
    "photo and title": "Foto e título",
    "photo and hand": "Foto e mão",
    "the mark": "A marca",
    "the feed": "O feed",
    "the type": "A tipografia",
    "photo and link": "Foto e link",
    "posts": "publicações",
    "followers": "seguidores",
    "following": "seguindo",
    "follow": "seguir",
    "message": "mensagem",
    "industry": "Setor",
    "project year": "Ano do projeto",
    "client": "Cliente",
}
PROTECT = re.compile(
    r"(luca\s+radez|designed\s+by|design\s+by|by\s+luca|"
    r"copyright|©|®|kyoto|japan|organic matcha|https?://|www\.|@|"
    r"^(alba|kage|meridio|quartier|paris|london|croissanterie|matcha)$)", re.I
)

def norm(s):
    return re.sub(r"\s+", " ", re.sub(r"[^\w\s-]", " ", s.lower())).strip()

def translator_offline():
    try:
        from argostranslate import package, translate
        languages = translate.get_installed_languages()
        en = next((l for l in languages if l.code == "en"), None)
        pt = next((l for l in languages if l.code == "pt"), None)
        if en is None or pt is None or not en.get_translation(pt):
            package.update_package_index()
            model = next((x for x in package.get_available_packages()
                          if x.from_code == "en" and x.to_code == "pt"), None)
            if model is None:
                print("Modelo EN-PT não disponível; aplicando somente glossário.")
                return None
            package.install_from_path(model.download())
        return lambda s: translate.translate(s, "en", "pt")
    except Exception as ex:
        print("Tradutor indisponível; usando glossário:", ex)
        return None

def translate_line(s, translate):
    n = norm(s)
    if PROTECT.search(s):
        return None
    if n in GLOSSARY:
        return GLOSSARY[n]
    if len(n) < 12 or len(n.split()) < 3 or not re.match(r"^[A-Za-z]", s) or re.search(r"\d{2}[:.]\d{2}", s):
        return None
    if not translate:
        return None
    try:
        pt = translate(s)
    except Exception:
        return None
    if not pt or norm(pt) == n or len(pt) > max(40, len(s)*2.2):
        return None
    return pt

def lines_from_ocr(small):
    d = pytesseract.image_to_data(small, lang="eng", config="--psm 11",
                                  output_type=pytesseract.Output.DICT)
    grouped = defaultdict(list)
    for i, s in enumerate(d["text"]):
        s = s.strip()
        try:
            conf = float(d["conf"][i])
        except (ValueError, TypeError):
            continue
        if not s or conf < 78:
            continue
        key = (d["block_num"][i], d["par_num"][i], d["line_num"][i])
        grouped[key].append((s, int(d["left"][i]), int(d["top"][i]),
                             int(d["width"][i]), int(d["height"][i])))
    for words in grouped.values():
        words.sort(key=lambda z: z[1])
        sentence = " ".join(z[0] for z in words)
        if len(sentence) < 7:
            continue
        x = min(z[1] for z in words)
        y = min(z[2] for z in words)
        right = max(z[1]+z[3] for z in words)
        bottom = max(z[2]+z[4] for z in words)
        yield sentence, (x, y, right-x, bottom-y), words

def color_of_text(area):
    if area.size == 0:
        return (240, 240, 240)
    pixels = cv2.cvtColor(area, cv2.COLOR_BGR2RGB).reshape((-1, 3))[::5]
    if len(pixels) < 6:
        return (240, 240, 240)
    _, labels, centers = cv2.kmeans(
        pixels.astype("float32"), 2, None,
        (cv2.TERM_CRITERIA_EPS+cv2.TERM_CRITERIA_MAX_ITER, 10, 0.2),
        2, cv2.KMEANS_PP_CENTERS
    )
    return tuple(int(v) for v in centers[np.argmin(np.bincount(labels.ravel()))])

def localize(large, smaller, translate):
    with Image.open(large) as im:
        original = im.convert("RGB")
    with Image.open(smaller) as im:
        small = im.convert("RGB")
    source = cv2.cvtColor(np.asarray(original), cv2.COLOR_RGB2BGR)
    height, width = source.shape[:2]
    sx, sy = width/small.width, height/small.height
    mask = np.zeros((height, width), dtype=np.uint8)
    changes = []
    for en, (xx, yy, ww, hh), words in lines_from_ocr(small):
        pt = translate_line(en, translate)
        if not pt:
            continue
        x, y, w, h = (int(xx*sx), int(yy*sy), int(ww*sx), int(hh*sy))
        if h < 14 or w < 50 or x < 0 or y < 0:
            continue
        if len(pt) > len(en)*1.8 and w < width*0.65:
            continue
        kind = "serif" if large.name.startswith(("quartier-", "meridio-")) else ("bold" if en.isupper() else "sans")
        size = max(12, int(h*0.85))
        available = min(width-x-8, w)
        while size > 10:
            font = ImageFont.truetype(FONTS[kind], size)
            box = font.getbbox(pt)
            if box[2]-box[0] <= available:
                break
            size -= 1
        if size <= 10:
            continue
        area = source[max(0,y-2):min(height,y+h+2), max(0,x-2):min(width,x+w+2)]
        color = color_of_text(area)
        # Apaga a linha completa, incluindo antialiasing e espaços.
        # Não remover pixels em fragmentos: isso deixava letras fantasma.
        cv2.rectangle(mask, (max(0,x-3), max(0,y-4)),
                      (min(width-1,x+w+3), min(height-1,y+h+4)), 255, -1)
        changes.append({"original": en, "traducao": pt, "bbox": [x,y,w,h],
                        "font": kind, "size": size, "rgb": color})
    if not changes:
        return None
    fixed = cv2.inpaint(source, mask, 3, cv2.INPAINT_TELEA)
    image = Image.fromarray(cv2.cvtColor(fixed, cv2.COLOR_BGR2RGB))
    draw = ImageDraw.Draw(image)
    for row in changes:
        x, y, w, h = row["bbox"]
        draw.text((x, y+max(-2,(h-row["size"])//2)), row["traducao"],
                  font=ImageFont.truetype(FONTS[row["font"]], row["size"]),
                  fill=row["rgb"])
    OUT.mkdir(parents=True, exist_ok=True)
    image.save(OUT/large.name, "WEBP", quality=88, method=5)
    image.resize(small.size, Image.Resampling.LANCZOS).save(
        OUT/smaller.name, "WEBP", quality=85, method=5)
    return changes

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()
    translate = translator_offline()
    # Apaga somente as variantes anteriores desta branch, jamais as originais.
    if OUT.exists():
        shutil.rmtree(OUT)
    report = []
    samples = []
    files = sorted(BASE.glob("*-720.webp"))
    if args.limit:
        files = files[:args.limit]
    for i, small in enumerate(files, 1):
        large = small.with_name(small.name.replace("-720.webp", ".webp"))
        if not large.is_file():
            continue
        print(f"[{i}/{len(files)}] {small.name}", flush=True)
        try:
            result = localize(large, small, translate)
            if result:
                report.append({"arquivo": large.name, "alteracoes": result})
                if len(samples) < 16:
                    samples.append((small, OUT/small.name))
        except Exception as ex:
            report.append({"arquivo": large.name, "erro": str(ex)})
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT/"revisao.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    if samples:
        w, h = 216, 270
        board = Image.new("RGB", (w*2, h*len(samples)), "white")
        for j, (a, b) in enumerate(samples):
            with Image.open(a) as before, Image.open(b) as after:
                board.paste(before.convert("RGB").resize((w,h)), (0, j*h))
                board.paste(after.convert("RGB").resize((w,h)), (w,j*h))
        board.save(OUT/"comparativo.jpg", quality=82)
    print(f"Artes propostas: {len([x for x in report if 'alteracoes' in x])}")

if __name__ == "__main__":
    main()
