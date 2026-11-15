# Reconstrução editorial — Herslander Jorge

> Documento de trabalho para GitHub, ChatGPT e Claude. Não caracteriza recuperação de banco de dados nem posse dos arquivos do site de referência.

## Alvo e método

- Referência: https://lucaradez.com/
- Fonte adicional: gravação fornecida pelo usuário em 15/11/2026 (53,46 s, 720×1600).
- Abordagem: preservar a experiência observável da referência, com conteúdo original em pt-BR para Herslander Jorge; evitar se apresentar como autor de trabalhos de terceiros.
- Hospedagem: GitHub + Cloudflare Pages. Publicação: apenas a branch `main`; esta reconstrução permanece em branch separada até revisão.

## Valores de cor confirmados via estilo computado

Os seguintes tons foram medidos em 15/11/2026 no site de referência, não estimados visualmente:

| Elemento | RGB observado | Hex |
| --- | --- | --- |
| Fundo editorial | rgb(230, 224, 221) | `#E6E0DD` |
| Texto e introdução escura | rgb(20, 21, 27) | `#14151B` |
| Laranja da seção de contato | rgb(241, 151, 89) | `#F19759` |
| Azul da roleta | rgb(11, 99, 164) | `#0B63A4` |
| Azul-marinho da seção de mãos | rgb(11, 43, 92) | `#0B2B5C` |

Alguns projetos possuem identidade própria, que não altera a paleta-base do site.

## Mapa de experiência

| Fluxo | Implementação atual | Conferência |
| --- | --- | --- |
| Intro com linhas, contador e entrada | `index.html`, `portfolio-intro.js` | Prévia mobile capturada |
| Nome e apresentação digitados com silhueta | `index.html` | Fonte existente preservada |
| Quatro papéis com fundo alternado | `index.html` | Ordem e cores alinhadas |
| Galeria horizontal com quatro projetos | `portfolio-gallery.js`, `portfolio-gallery.css` | Quatro cartões renderizados no browser |
| Projeto abre como apresentação integral | `portfolio-gallery.js` | Abertura visual conferida em 390px |
| Galeria por projeto com controles e gesto | `portfolio-gallery.js` | Código conferido; gestos precisam teste manual |
| Roleta de 16 disciplinas | `index.html`, `portfolio-details.js` | 16 índices conciliados |
| Disciplina abre explicação, entregas e contato | `portfolio-details.js`, `portfolio-upgrade.css` | Abertura visual conferida em 390px |
| Sons em entrada, digitação, papéis, roda e ações | `index.html`, JS do portfólio | Regras inspecionadas; escuta real pendente |
| Seção das mãos e contato | `index.html` + `maos.png` | Fonte original do repositório preservada |

## Projetos demonstrados na versão de reconstrução

Os quatro projetos apresentados são Flow, Kairós, Alvo OS e Herslander. São iniciativas próprias do titular e **não** representam conclusão comercial comprovada. Onde não havia fotografias verificadas, usamos arte editorial temporária com legenda explícita; não atribuímos ao titular trabalhos de Luca Radez ou dos clientes dele.

## Inventário público de mídia da referência

O HTML público da home referencia:

- `https://lucaradez.com/assets/work/img/quartier-copertina-720.webp`
- `https://lucaradez.com/assets/work/img/meridio-hero-720.webp`
- `https://lucaradez.com/assets/work/img/kage-copertina-720.webp`
- `https://lucaradez.com/assets/work/img/alba-copertina-720.webp`

A página pública de Quartier (`https://lucaradez.com/work/quartier/`) expõe **34 caminhos distintos de imagens** (identidade, logotipo, cor, tipografia, embalagem, aplicações etc.). Foram identificados os caminhos, mas não foi afirmado que sejam de propriedade do usuário, nem foram importados para a publicação.

Os arquivos do seu repositório de site pessoal incluem `maos.png` e `silhueta.png`; não há cópia das galerias Quartier/Meridio/Kage/Alba nesse repositório. Acesso ao banco antigo ou backups pode ampliar o material de recuperação caso exista um acervo autorizado.

## Pendências e limites

1. Obter e catalogar imagens próprias/autorizadas para substituir as cenas conceituais. Não publicar marcas/clientes de terceiros como trabalhos pessoais sem autorização.
2. Comparar desktop e mobile frame a frame. O CSS e o tempo de animações ainda não foram comprovados idênticos ao original.
3. Testar o áudio por escuta no navegador: o código gera sons sintetizados, mas não houve extração das amostras originais; os timbres podem diferir.
4. Conferir slides por toque/swipe, Escape, foco, reduzido movimento, Safari/Chrome e versões diferentes de aparelho.
5. Não publicar a branch de reconstrução em produção até verificar os pontos críticos.

## Histórico de validação (15/11/2026)

- Cloudflare Pages: builds de prévia retornaram `success`.
- Cloudflare Browser Rendering 390×844: capturada a entrada; renderizados quatro cartões; abertos com sucesso o projeto Flow e a disciplina Direção Criativa em tela cheia.
- O sistema de áudio foi inspecionado via código. A reprodução perceptiva ainda precisa ser testada em aparelho real.
- Browser Rendering retornou rate limit após consulta ao inventário da página Quartier. Não repetir chamadas enquanto limitado.

## Política de produção

A branch `feat/disciplines-fidelidade` e o PR #2 são o local de desenvolvimento. Não alterar domínio, DNS ou configurações de e-mail. Preservar a versão anterior de `main` até revisão.


## Atualização — foco total em mobile e áudio de carregamento (15/11/2026)

**Mudanças implementadas, sem alterar a produção:**

- **Som de carregamento:** um efeito original de subida e transição foi adicionado ao objeto `sons.carregamento`. A tela de entrada escuta o primeiro `pointerdown`; o botão Entrar oferece fallback por teclado. O áudio só é liberado no primeiro gesto do visitante porque Android/iOS impedem autoplay com som antes da interação. O botão de silenciar continua sendo respeitado.
- **Áudio leve:** o ruído branco para efeitos `sopro` passou a usar um `AudioBuffer` de 0,45 s compartilhado e em loop, evitando alocações e preenchimento de buffers a cada digitação, rolagem ou toque. Digitação e roleta limitam a frequência de pequenos sons.
- **Rolagem:** eventos passivos usam `requestAnimationFrame` para atualizar no máximo uma vez por quadro; a roleta não recalcula seus 16 itens quando está fora da área visível. Cores e etapas somente são reavaliadas quando necessário.
- **Mãos em Canvas:** no mobile, a densidade ASCII e o DPR são limitados; depois da animação inicial de 650 ms, o Canvas para de redesenhar continuamente. No desktop continua o movimento espaçado. Visibilidade, resize e carregamento da imagem permitem redesenho quando necessário.
- **Entrada:** contador reduzido para 960 ms e incrementos de 5 para diminuir atualizações do DOM.
- **Gestos:** menu mobile sob demanda no topo, sem barra inferior permanente, com `aria-expanded`, fechamento por Escape, seleção de link, toque fora e rolagem. Botões de toque ampliados, hover persistente reduzido no celular.
- **GitHub Actions:** workflow `.github/workflows/mobile-smoke.yml` testa sintaxe JavaScript, IDs, CSS/JS conectados, 16 disciplinas na mesma ordem, som de entrada e regras mobile, sem dependências.
- **Browser Rendering:** verificado a 390×844: quatro projetos, 16 disciplinas, entrada, abertura/fechamento do menu, abertura de projeto e da explicação da primeira disciplina. Captura visual adicional realizada a 360×800.

**Limitações que devem permanecer explícitas:** não foi possível fazer uma escuta humana comparativa nem medir métricas reais de FPS/INP em um aparelho físico. Sucesso em build, testes estáticos e navegação automatizada não equivale a garantir desempenho idêntico em todos os celulares. O som do carregamento é uma recriação original, não o `sprite.mp3` da referência, e não pode tocar antes de um gesto do usuário.

**Publicação:** alterações somente na branch `feat/disciplines-fidelidade` e no PR #2; produção permanece na `main`. Rever no aparelho Android e iOS antes da integração definitiva.


## Investigação passiva e ajustes — 15/11/2026

### Escopo e limites
- Referência observada: https://lucaradez.com/ (páginas publicamente acessíveis).
- Vídeo de referência: Record_2026-11-15-15-17-07_40deb401b9ffe8e1df2f1cc5ba480b12.mp4, 111,9 s, 5.477 quadros.
- Repositório autorizado para edição: herslander-netizen/herslander-site, PR #2, branch feat/disciplines-fidelidade.
- As skills do plugin REA foram consultadas, mas não há servidor MCP do REA exposto aqui. Não houve decompilação do JavaScript pelo REA; trata-se de investigação passiva de interface + observação de vídeo + testes em navegador.
- Fotografias e sons de terceiros não foram importados nem atribuídos a Herslander.

### Evidências e confiança

| ID | Base | Evidência direta | Limite |
| --- | --- | --- | --- |
| WEB-01 | https://lucaradez.com/ | 16 especialidades, quatro entregas cada, links de contato e de trabalhos | HTML público; não revela toda a implementação |
| VID-01 | vídeo anexado | a roleta abre uma seção azul com lista de cartões claros, título e Back | gravação da referência, não do Herslander |
| SRC-01 | index.html anterior | modal escuro individual usado no site Herslander | comparação de estrutura |
| SRC-02 | index.html, portfolio-details.js, portfolio-disciplines.css | lista com 16 cartões, destino por índice, link e navegação por histórico | implementação autoral |
| RUN-01 | Cloudflare Browser Rendering 390×844 | a disciplina 16 abre; URL passa a #disciplina-16 | navegador remoto |
| RUN-02 | Cloudflare Browser Rendering 360×800 | 16 cartões, quatro pontos da galeria, histórico Voltar correto; card 16 inicia ~113px abaixo do topo | não equivale a medição de FPS ou INP |
| CI-01 | GitHub Actions mobile-smoke.yml | análise de sintaxe e integração de recursos | teste estático |

### Correções feitas
1. A roleta abre a lista contínua de cartões claros em fundo azul #0B63A4, em vez de um modal escuro isolado; a primeira posição exibida corresponde à disciplina tocada.
2. O botão Voltar e Escape restauram o histórico; a URL muda conforme a disciplina visível, e o foco retorna à opção escolhida.
3. A última disciplina estava inicialmente ~292px abaixo do topo. Após reservar área de rolagem ao fim da lista, passou a ~113px no teste mobile. A hipótese inicial de renderização diferida não era a causa suficiente; a falta de espaço após o último cartão era decisiva.
4. A galeria passou a ter quatro indicadores acessíveis e rolagem horizontal com estado ativo sincronizado; no celular as setas redundantes desaparecem.
5. O nome responde de forma reversível ao avanço/retorno do scroll inicial, com atualização apenas quando muda a quantidade de caracteres visíveis.
6. São preservados os ganhos anteriores de desempenho: áudio com buffer reutilizado, roleta recalculada apenas na área visível, Canvas das mãos interrompido após a animação mobile.

### Pesquisa de boas práticas
- Autoplay e AudioContext dependem de gesto do usuário: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices
- Estimativas de tamanho com content-visibility/contain-intrinsic-size podem alterar posição da rolagem: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-size

### Pendências verificáveis
- Falta inspeção comparativa de sons por audição humana e perfil real de desempenho em Android/iPhone.
- Galerias completas de fotografias originais dependem de arquivos autorais e permissões identificados; os gráficos atuais são conceituais.
- A equivalência de todos os tempos de transição, tipografia e gestos com a referência ainda não foi comprovada.
- A versão de produção não foi alterada; validação feita em prévia Cloudflare Pages.
