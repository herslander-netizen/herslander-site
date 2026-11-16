#!/usr/bin/env python3
"""Bloqueia publicação do projeto Kairós se alguma mídia estiver ausente ou inválida."""
from __future__ import annotations
from pathlib import Path
from html import unescape
import json
import re
import shutil
import subprocess
import sys

ROOT = Path(".")
PAGE = ROOT / "work/kairos/index.html"
problems: list[str] = []
if not PAGE.is_file():
    raise SystemExit("Página work/kairos/index.html ausente")
html = PAGE.read_text(encoding="utf-8")
paths = sorted(set(re.findall(
    r"/assets/work/(?:img|video)/kairos-[A-Za-z0-9.-]+(?:\.webp|\.mp4)", html
)))
if len(paths) < 18:
    problems.append(f"Esperadas pelo menos 18 referências de mídia, encontradas {len(paths)}")
for rel in paths:
    file = ROOT / rel.lstrip("/")
    if not file.is_file():
        problems.append(f"Mídia ausente: {file}")
        continue
    with file.open("rb") as stream:
        magic = stream.read(12)
    if file.suffix == ".webp":
        if not (magic[:4] == b"RIFF" and magic[8:] == b"WEBP"):
            problems.append(f"WebP inválido: {file}")
    elif file.suffix == ".mp4":
        if b"ftyp" not in magic:
            problems.append(f"MP4 inválido: {file}")
        if not 100_000 <= file.stat().st_size <= 20_000_000:
            problems.append(f"MP4 fora dos limites esperados: {file}")
        elif shutil.which("ffprobe"):
            proc = subprocess.run([
                "ffprobe", "-v", "error", "-show_entries",
                "stream=codec_type,width,height:format=duration",
                "-of", "json", str(file)
            ], capture_output=True, text=True)
            if proc.returncode:
                problems.append(f"Vídeo ilegível: {file}")
            else:
                meta = json.loads(proc.stdout)
                streams = meta.get("streams", [])
                if not any(x.get("codec_type") == "audio" for x in streams):
                    problems.append("Motion Kairós sem áudio")
                if not any(x.get("codec_type") == "video" for x in streams):
                    problems.append("Motion Kairós sem trilha de vídeo")
                duration = float(meta.get("format", {}).get("duration", 0))
                if not 15 <= duration <= 17:
                    problems.append(f"Duração inesperada do motion: {duration:.1f} s")
for p in ("index.html", "work/index.html"):
    text = (ROOT / p).read_text(encoding="utf-8")
    if "/work/kairos/" not in text:
        problems.append(f"{p}: Kairós não está na lista de projetos")
for p in ("quartier", "meridio", "kage", "alba"):
    text = (ROOT / "work" / p / "index.html").read_text(encoding="utf-8")
    if "/work/kairos/" not in text:
        problems.append(f"Projeto {p}: falta navegação para Kairós")
if "work/kairos/" not in (ROOT / "sitemap.xml").read_text(encoding="utf-8"):
    problems.append("sitemap.xml: Kairós não indexada")
home = (ROOT / "index.html").read_text(encoding="utf-8")
if len(re.findall(r"data-gl-card\b", home)) != len(re.findall(r"data-gl-dot\b", home)):
    problems.append("Home: número de cartões diferente do número de indicadores")
if problems:
    for item in problems:
        print("FALHA:", item)
    raise SystemExit(1)
print(f"Kairós validada: {len(paths)} referências de mídia, vídeo com áudio e navegação integrada.")
