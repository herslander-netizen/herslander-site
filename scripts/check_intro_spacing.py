#!/usr/bin/env python3
"""Evita que o ponto laranja da saudação volte a encostar em “Olá”."""
from pathlib import Path
import re

html = Path("index.html").read_text(encoding="utf-8")
css = Path("assets/css/ajustes.css").read_text(encoding="utf-8")
assert 'class="intro__word" data-hello>Olá</span><span class="caret">' in html, "Estrutura da saudação alterada"
assert 'href="assets/css/ajustes.css"' in html, "CSS de ajustes não carregado"
match = re.search(r"\.intro__hello\s*>\s*\.caret\s*\{[^}]*margin-left:\s*([\d.]+)em\s*;", css)
assert match, "Falta espaçamento dedicado ao cursor/ponto da saudação"
assert 0.10 <= float(match.group(1)) <= 0.20, "O espaçamento está fora da faixa de leitura mobile"
print("OK — a saudação mantém espaço proporcional entre Olá e o ponto laranja.")
