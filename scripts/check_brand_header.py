#!/usr/bin/env python3
"""Evita regressões na assinatura da marca nos cabeçalhos do portfólio."""
from pathlib import Path
import re
import sys

pages = [
    Path("index.html"), Path("work/index.html"),
    *(Path("work") / name / "index.html" for name in ("quartier", "meridio", "kage", "alba")),
]
css_path = Path("assets/css/brand-name.css")
problems = []
if not css_path.is_file():
    problems.append(f"{css_path}: não encontrado")
else:
    css = css_path.read_text(encoding="utf-8")
    for selector, weight in (
        (".bar__name .nm__l", "700"),
        (".bar__name .nm__r", "400"),
    ):
        expr = re.escape(selector) + r"\s*\{[^}]*font-weight:\s*" + weight + r"\s*;"
        if not re.search(expr, css):
            problems.append(f"{css_path}: estilo incorreto para {selector}")
    if not re.search(r"\.bar__name\s+\.nm__mark\s*\{[^}]*color:\s*#F59E63\s*;", css, re.I):
        problems.append(f"{css_path}: o asterisco precisa usar #F59E63")
signature = '<span class="nm__l">Herslander</span> <span class="nm__r">Jorge</span><span class="nm__mark" aria-hidden="true">✱</span>'
for page in pages:
    if not page.is_file():
        problems.append(f"{page}: página ausente")
        continue
    html = page.read_text(encoding="utf-8")
    header = re.search(r'<header class="bar(?: [^"]+)?"[^>]*>(.*?)</header>', html, flags=re.S)
    if not header or signature not in header.group(1):
        problems.append(f"{page}: nome, pesos ou posição do asterisco incorretos")
    href = "assets/css/brand-name.css" if page == Path("index.html") else "/assets/css/brand-name.css"
    if f'<link rel="stylesheet" href="{href}">' not in html:
        problems.append(f"{page}: CSS da assinatura não carregado")
if problems:
    for problem in problems:
        print("FALHA:", problem)
    sys.exit(1)
print(f"Assinatura Herslander Jorge✱ verificada em {len(pages)} cabeçalhos.")
