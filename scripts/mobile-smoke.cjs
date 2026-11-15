const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const read = (path) => fs.readFileSync(path, "utf8");
const html = read("index.html");
const details = read("portfolio-details.js");
const gallery = read("portfolio-gallery.js");
const intro = read("portfolio-intro.js");
const css = read("portfolio-gallery.css");
const upgrade = read("portfolio-upgrade.css");

for (const path of ["portfolio-details.js","portfolio-gallery.js","portfolio-intro.js"]) {
  new vm.Script(read(path), { filename: path });
}
const inline = html.match(/<script>([\s\S]*?)<\/script>/);
assert(inline, "Inline JavaScript não encontrado");
new vm.Script(inline[1], { filename: "index-inline.js" });

const ids = [
  "entrada","entrar","contador-entrada","som","menu-mobile","nav-principal",
  "quem","roda","lista","contador","girar","projetos","galeria-projetos",
  "visualizador-projeto","projeto-modal-fechar","projeto-modal-titulo",
  "detalhe-disciplina","fechar-detalhe","detalhe-titulo","detalhe-acao",
  "maos","contato"
];
for (const id of ids) assert(html.includes('id="' + id + '"'), "ID ausente: " + id);

for (const asset of [
  "portfolio-upgrade.css","portfolio-gallery.css","portfolio-intro.js",
  "portfolio-gallery.js","portfolio-details.js","maos.png","silhueta.png"
]) {
  assert(fs.existsSync(asset), "Recurso não encontrado: " + asset);
}
const disciplinas = [...(html.match(/const DISCIPLINAS = \[([\s\S]*?)\];/)?.[1] || "").matchAll(/"([^"]+)"/g)].map(m => m[1]);
const nomes = [...details.matchAll(/\bnome:\s*"([^"]+)"/g)].map(m => m[1]);
assert.equal(disciplinas.length,16,"A roleta deve conter 16 áreas");
assert.deepEqual(nomes,disciplinas,"A ordem da roleta deve corresponder às fichas");

assert.match(html,/carregamento:\s*\(\)\s*=>/,"Som da tela de carregamento ausente");
assert.match(html,/addEventListener\("pointerdown", ativaSomCarregamento/,"Ativação por primeiro toque ausente");
assert.match(html,/som\.ctx\?\.resume/,"Áudio móvel deve ser retomado no gesto");
assert.match(html,/som\.ruido/,"Ruído de áudio deve ser reutilizado");
assert.match(html,/requestAnimationFrame\(\(\) => \{/,"Rolagem precisa ser limitada por frame");
assert.match(html,/if \(mobile && bruto >= 1\)/,"Animação mobile das mãos deve parar");
assert.match(css,/body\.aberto\.menu-aberto \.navegacao/,"Menu mobile ausente");
assert.match(details,/aria-expanded/,"Menu mobile sem estado acessível");
assert.match(intro,/const duracao=960/,"Intro não otimizada");
assert.match(gallery,/touchstart/,"Gestos do visualizador ausentes");
assert.match(upgrade,/@media.*max-width/s,"Regras responsivas ausentes");

console.log("✓ Sintaxe, IDs, arquivos, 16 disciplinas, entrada sonora, gestos e modo mobile conferidos.");
