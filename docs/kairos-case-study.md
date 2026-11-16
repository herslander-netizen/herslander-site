# KAIRÓS — estudo de caso do portfólio

## Objetivo e posição

Inserir a KAIRÓS Produtora como quinto projeto em `/work/kairos/`, preservando o mesmo padrão de estudo de caso de Quartier, Meridio, Kage e Alba. A KAIRÓS é uma produtora audiovisual, com atuação criativa e aplicações de identidade de marca. Não apresentá-la como uma produtora de longas-metragens.

## Fontes da identidade

- **Marca canônica:** imagem `1000961595.png` fornecida pelo usuário, com assinatura horizontal preta sobre amarelo e amarela sobre preto, ícone K geométrico, grafia **KAIRÓS** e subtítulo **PRODUTORA**. Não redesenhar ou substituir esta assinatura por um símbolo inventado.
- **Motion original:** vídeo fornecido pelo usuário como `Kairós Pronto .mp4`, duração **16,043 segundos**, 1080 × 1920, 30 fps, vídeo H.264 e áudio AAC. A conversão para web preserva duração, proporção, quadros por segundo e áudio.
- **Simulações de apresentação:** outras peças WebP foram geradas com IA a partir das referências. São mockups ilustrativos, não provas de campanhas executadas, instalações existentes ou interfaces operacionais.

## Ordem da narrativa

1. Assinatura original em duas versões.
2. Sistema gráfico de marca e variações.
3. Direção de arte e paleta preto/amarelo.
4. Ambientação e sinalização (mockup).
5. Materiais institucionais e aplicações físicas (mockups).
6. Peça editorial de campanha (conceito).
7. Presença em redes sociais (mockup).
8. Apresentação do site responsivo (mockup).
9. **Motion original da KAIRÓS** com áudio, imagem de capa e controles.

## Integração

A branch `feat/portfolio-kairos-motion-20261116` contém as alterações de HTML, CSS e testes. Os **arquivos binários** são entregues separadamente em `kairos-midias-portfolio.zip`, pois a integração GitHub disponível neste chat edita código, mas não transfere diretamente anexos binários locais.

Extrair o ZIP na raiz do repositório, preservando os diretórios `assets/work/img/` e `assets/work/video/`. Não copiar o LEIA-ME e o manifesto para a publicação.

**Não mesclar o PR enquanto o workflow `Validar portfolio e midias` falhar.** O teste verifica a existência e o formato dos arquivos, a trilha de áudio, a duração do motion, links entre as cinco páginas, a lista de projetos e o sitemap. Verificar também o workflow de traduções e o cabeçalho da marca pessoal.

## Cuidados

- Sem alterações em banco de dados, DNS, contas Cloudflare ou código de interação minificado.
- Nenhuma foto gerada deve ser apresentada como registro real dos bastidores ou da sede.
- Reproduzir o motion com o mesmo comportamento usado nos outros projetos: entrada em viewport, botão de som, respeito à preferência de áudio já existente.
- Testar mobile 390px, tablet e desktop 1280px, especialmente carrossel com cinco projetos, painéis com textos legíveis e seção de vídeo.
- Garantir que a página principal não referencie a KAIRÓS antes do upload da mídia e aprovação dos testes.
