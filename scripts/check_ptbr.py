#!/usr/bin/env python3
"""Verifica se os estudos de caso publicados em português mantêm os textos visíveis em pt-BR."""
from __future__ import annotations
from html import unescape
from pathlib import Path
import re
import sys

PAGES = [Path("work") / name / "index.html" for name in ("quartier", "meridio", "kage", "alba")]
CAPTION = re.compile(
    r'<figcaption class="wk-dida bp-dida"><p class="wk-pezzo mono">([^<]*)</p>'
    r'<p class="wk-titolo">([^<]*)</p><p class="wk-testo">([^<]*)</p></figcaption>'
)
UNTRANSLATED = re.compile(
    r"\b(?:the|and|with|without|from|into|every|each|before|after|has|have|"
    r"this|that|these|those|watch|brand|logo|logos|colour|colors|colours|"
    r"designed|pattern|patterns|packaging|campaign|posts|"
    r"typography|illustrations|the\s+brand\s+reel|fine\s+watchmaking|"
    r"croissanterie|organic\s+matcha|airline|art\s+direction|product\s+design)\b",
    re.IGNORECASE,
)
# Nomes de marcas, produtos, fontes e títulos de obras podem continuar no original.
EXEMPT_TITLES = {"Kage Display", "Basteleur Bold", "Morning Blend", "Shade Kit"}
EXPECTED = {"quartier": 30, "meridio": 13, "kage": 30, "alba": 30}

issues = []
# Evita regressão: descrições devem herdar a cor de cada painel temático.
contrast_css = Path("assets/css/work-contrast.css")
if not contrast_css.is_file():
    issues.append(f"{contrast_css}: folha de contraste ausente")
elif not re.search(
    r"\\.bp-panel\\s+\\.bp-dida\\s+\\.wk-testo\\s*\\{\\s*color:\\s*inherit\\s*;",
    contrast_css.read_text(encoding="utf-8"),
):
    issues.append(f"{contrast_css}: falta color: inherit nas descrições dos painéis")
for page in PAGES:
    if not page.is_file():
        issues.append(f"{page}: arquivo ausente")
        continue
    src = page.read_text(encoding="utf-8")
    if '<link rel="stylesheet" href="/assets/css/work-contrast.css">' not in src:
        issues.append(f"{page}: folha de contraste não está vinculada")
    if '<html lang="pt-BR">' not in src:
        issues.append(f"{page}: atributo lang não é pt-BR")
    captions = CAPTION.findall(src)
    if len(captions) != EXPECTED[page.parent.name]:
        issues.append(f"{page}: esperadas {EXPECTED[page.parent.name]} legendas, encontradas {len(captions)}")
    for index, (section, title, description) in enumerate(captions, start=1):
        for field, value in (("seção", section), ("título", title), ("descrição", description)):
            value = unescape(value)
            if field == "título" and value in EXEMPT_TITLES:
                continue
            match = UNTRANSLATED.search(value)
            if match:
                issues.append(f"{page}: legenda {index}, {field}: possível inglês: {match.group()!r}")
    for match in re.finditer(r'alt="([^"]+)"', src):
        label = unescape(match.group(1))
        if re.search(r"\b(?:Concept|The|Raised in shade|Fly at first light)\b", label):
            issues.append(f"{page}: texto alternativo em inglês: {label}")
    for match in re.finditer(r'aria-label="([^"]+)"', src):
        label = unescape(match.group(1))
        if re.match(r"^(Open|Close|Next|Previous):?\b", label, re.IGNORECASE):
            issues.append(f"{page}: aria-label em inglês: {label}")
    for bad in ("<span class=\"wk-x__t\">Close</span>", "<h2 class=\"bp-next__h mono\" id=\"bp-next-h\">Other brands</h2>"):
        if bad in src:
            issues.append(f"{page}: UI em inglês: {bad}")
for page in (Path("index.html"), Path("work/index.html")):
    if not page.is_file() or '<html lang="pt-BR">' not in page.read_text(encoding="utf-8"):
        issues.append(f"{page}: ausente ou idioma incorreto")
if issues:
    print("Falhas de tradução pt-BR:")
    for issue in issues:
        print(" -", issue)
    sys.exit(1)
print(f"Traduções pt-BR validadas: {sum(EXPECTED.values())} legendas em {len(PAGES)} projetos.")
