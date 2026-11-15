/* Sequência de acesso: contador tipográfico, entrada e saudação. */
(() => {
  "use strict";
  const contador=document.querySelector("#contador-entrada");
  const painel=document.querySelector("#entrada");
  const entrar=document.querySelector("#entrar");
  if(!contador || !painel || !entrar) return;
  const reduzir=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function pronto(){
    painel.classList.add("entrada-pronta");
    contador.textContent="100";
  }
  if(reduzir){pronto();return;}
  const inicio=performance.now();
  const duracao=1400;
  let ultimo=-1;
  function avancar(agora){
    if(!document.body.contains(painel) || painel.classList.contains("sai")) return;
    const progresso=Math.max(0,Math.min(1,(agora-inicio)/duracao));
    const valor=Math.floor(progresso*100);
    if(valor!==ultimo){
      contador.textContent=String(valor).padStart(3,"0");
      ultimo=valor;
    }
    if(progresso<1) requestAnimationFrame(avancar);
    else pronto();
  }
  requestAnimationFrame(avancar);
  entrar.addEventListener("click",()=>{
    const alvo=document.querySelector("#heroi");
    if(!alvo)return;
    const mensagem=document.createElement("div");
    mensagem.className="ola-entrada";
    mensagem.setAttribute("aria-hidden","true");
    mensagem.append(document.createTextNode("Olá"));
    const ponto=document.createElement("span");
    ponto.textContent=".";
    mensagem.append(ponto);
    alvo.append(mensagem);
    requestAnimationFrame(()=>mensagem.classList.add("ola-entrada-ativa"));
    setTimeout(()=>{
      mensagem.classList.remove("ola-entrada-ativa");
      mensagem.addEventListener("transitionend",()=>mensagem.remove(),{once:true});
      setTimeout(()=>mensagem.remove(),700);
    },750);
  },{once:true});
})();
