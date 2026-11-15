/* Projetos autorais para a galeria interativa.
 * Para trocar arte conceitual por fotos: forneça arquivos autorizados e preencha
 * imagem em cada cena. Não apresenta trabalhos de terceiros como se fossem do autor.
 */
(() => {
 "use strict";
 const PROJETOS_AUTORAIS = [
   {
     nome:"Flow",slug:"flow",categoria:"Produto digital",
     estado:"Produto em evolução",
     introducao:"Plataforma de agendamento, relacionamento com clientes e automação para profissionais e estabelecimentos. Um projeto de produto digital que conecta experiência mobile e operação.",
     atuacao:"Produto, UX/UI e desenvolvimento",
     formato:"Agendamento, CRM e atendimento",
     cenas:[
       {titulo:"flow.",legenda:"Agendamento e relacionamento",tipo:"identidade"},
       {titulo:"Seu negócio no ritmo certo.",legenda:"Direção de experiência digital",tipo:"frase"},
       {titulo:"Agenda + Atendimento",legenda:"Sistema integrado — projeto em evolução",tipo:"sistema"},
     ],
   },
   {
     nome:"Kairós",slug:"kairos",categoria:"Identidade e comunicação",
     estado:"Marca em estruturação",
     introducao:"Proposta de uma produtora que reúne audiovisual, conteúdo, design, campanhas, desenvolvimento e inteligência artificial. Direção criativa pensada para comunicação com propósito.",
     atuacao:"Identidade, conteúdo e comunicação",
     formato:"Produtora e soluções digitais",
     cenas:[
       {titulo:"KAIRÓS",legenda:"Ideias que viram movimento",tipo:"identidade"},
       {titulo:"Ideias em movimento.",legenda:"Construção de linguagem visual",tipo:"frase"},
       {titulo:"Imagem + Estratégia",legenda:"Comunicação integrada — em estruturação",tipo:"sistema"},
     ],
   },
   {
     nome:"Alvo OS",slug:"alvo",categoria:"Sistema de gestão",
     estado:"Em desenvolvimento",
     introducao:"Projeto de sistema para organizar operação, demandas e processos digitais. Interface e estrutura pensadas para unir organização e tecnologia em um ambiente de trabalho.",
     atuacao:"Arquitetura, interface e automação",
     formato:"Sistema web",
     cenas:[
       {titulo:"ALVO OS",legenda:"Operação organizada em uma plataforma",tipo:"identidade"},
       {titulo:"Mais clareza. Menos ruído.",legenda:"Direção de produto e processos",tipo:"frase"},
       {titulo:"Gestão + Tecnologia",legenda:"Sistema em desenvolvimento",tipo:"sistema"},
     ],
   },
   {
     nome:"Herslander",slug:"herslander",categoria:"Identidade pessoal",
     estado:"Site em evolução",
     introducao:"Apresentação profissional que reúne criação, direção de marca e tecnologia em uma experiência digital editorial e interativa.",
     atuacao:"Direção criativa e desenvolvimento web",
     formato:"Portfólio pessoal",
     cenas:[
       {titulo:"Herslander Jorge",legenda:"Criatividade e tecnologia",tipo:"identidade"},
       {titulo:"Boas ideias merecem direção.",legenda:"Uma experiência digital autoral",tipo:"frase"},
       {titulo:"Criação + Tecnologia",legenda:"Portfólio interativo — em evolução",tipo:"sistema"},
     ],
   }
 ];
 const trilho=document.querySelector("#galeria-projetos");
 const dialogo=document.querySelector("#visualizador-projeto");
 if(!trilho || !dialogo) return;
 const $=(sel)=>dialogo.querySelector(sel);
 const q=(sel)=>document.querySelector(sel);
 const title=$("#projeto-modal-titulo");
 const indice=$("#projeto-modal-indice");
 const categoria=$("#projeto-modal-categoria");
 const estado=$("#projeto-modal-estado");
 const introducao=$("#projeto-modal-introducao");
 const atuacao=$("#projeto-modal-atuacao");
 const formato=$("#projeto-modal-formato");
 const cena=$("#projeto-modal-cena");
 const placar=$("#projeto-modal-placar");
 const anterior=$("#projeto-modal-anterior");
 const proximo=$("#projeto-modal-proximo");
 const fechar=$("#projeto-modal-fechar");
 let atual=-1,slide=0,ativador=null;
 const tocar=(nome)=>{
   if(typeof sons!=="undefined" && typeof sons[nome]==="function") sons[nome]();
 };
 function criar(tag,classe,conteudo){
   const elemento=document.createElement(tag);
   if(classe) elemento.className=classe;
   if(conteudo!==undefined) elemento.textContent=conteudo;
   return elemento;
 }
 function capa(projeto,i){
   const botao=criar("button","projeto-cartao");
   botao.type="button";
   botao.setAttribute("aria-label","Ver projeto "+projeto.nome);
   const selo=criar("div","projeto-selo");
   selo.append(criar("span",null,String(i+1).padStart(2,"0")+" / "+projeto.nome),
                criar("span",null,projeto.categoria));
   const art=criar("div","projeto-capa projeto-capa--"+projeto.slug);
   art.append(criar("span","arte-fundo"),criar("span","arte-forma"),
              criar("strong","arte-nome",projeto.cenas[0].titulo));
   const legenda=criar("div","arte-legenda");
   legenda.append(criar("span",null,"Herslander Jorge"),criar("span",null,"Visual conceitual"));
   art.append(legenda);
   const info=criar("div","projeto-info");
   info.append(criar("strong",null,projeto.nome),criar("span",null,projeto.estado));
   botao.append(selo,art,info);
   botao.addEventListener("click",()=>abrir(i,botao));
   return botao;
 }
 PROJETOS_AUTORAIS.forEach((projeto,i)=>trilho.append(capa(projeto,i)));
 function renderCena(){
   const p=PROJETOS_AUTORAIS[atual];
   if(!p) return;
   const dados=p.cenas[slide];
   cena.replaceChildren();
   cena.className="projeto-imagem projeto-capa--"+p.slug+" projeto-imagem--"+dados.tipo;
   cena.setAttribute("aria-label",p.nome+" — cena "+(slide+1)+": "+dados.legenda);
   if(dados.imagem){
     const img=criar("img");
     img.src=dados.imagem;
     img.alt=dados.alt||dados.legenda;
     img.loading="lazy";
     cena.append(img);
   } else {
     const tituloCena=criar("div","arte-nome",dados.titulo);
     cena.append(tituloCena);
   }
   const rodape=criar("div","arte-pequena");
   rodape.append(criar("span",null,p.nome),criar("span",null,dados.legenda));
   cena.append(rodape);
   placar.textContent=String(slide+1).padStart(2,"0")+" / "+String(p.cenas.length).padStart(2,"0");
   anterior.disabled=slide===0;
   proximo.disabled=slide===p.cenas.length-1;
 }
 function trocar(indice){
   const projeto=PROJETOS_AUTORAIS[atual];
   if(!projeto || indice<0 || indice>=projeto.cenas.length || indice===slide) return;
   slide=indice;
   tocar("toque");
   renderCena();
 }
 function abrir(i,botao){
   const p=PROJETOS_AUTORAIS[i];
   if(!p || dialogo.open) return;
   atual=i;slide=0;ativador=botao;
   title.textContent=p.nome;
   indice.textContent=String(i+1).padStart(2,"0")+" / "+String(PROJETOS_AUTORAIS.length).padStart(2,"0");
   categoria.textContent=p.categoria;
   estado.textContent=p.estado;
   introducao.textContent=p.introducao;
   atuacao.textContent=p.atuacao;
   formato.textContent=p.formato;
   renderCena();
   dialogo.showModal();
   dialogo.scrollTop=0;
   fechar.focus({preventScroll:true});
   tocar("detalhe");
 }
 fechar.addEventListener("click",()=>dialogo.close());
 dialogo.addEventListener("close",()=>{
   tocar("voltar");
   if(ativador?.isConnected) ativador.focus({preventScroll:true});
   atual=-1;ativador=null;
 });
 dialogo.addEventListener("click",(evento)=>{
   if(evento.target!==dialogo) return;
   const r=dialogo.getBoundingClientRect();
   if(evento.clientX<r.left || evento.clientX>r.right ||
      evento.clientY<r.top || evento.clientY>r.bottom) dialogo.close();
 });
 anterior.addEventListener("click",()=>trocar(slide-1));
 proximo.addEventListener("click",()=>trocar(slide+1));
 dialogo.addEventListener("keydown",(evento)=>{
   if(evento.key==="ArrowRight"){evento.preventDefault();trocar(slide+1);}
   if(evento.key==="ArrowLeft"){evento.preventDefault();trocar(slide-1);}
 });
 let toqueInicial=null;
 cena.addEventListener("touchstart",(evento)=>{
   if(evento.touches.length===1){
     toqueInicial={x:evento.touches[0].clientX,y:evento.touches[0].clientY};
   }
 },{passive:true});
 cena.addEventListener("touchend",(evento)=>{
   if(!toqueInicial || !evento.changedTouches.length) return;
   const dx=evento.changedTouches[0].clientX-toqueInicial.x;
   const dy=evento.changedTouches[0].clientY-toqueInicial.y;
   if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.4){
     trocar(slide+(dx<0?1:-1));
   }
   toqueInicial=null;
 },{passive:true});
 q("#projeto-avancar")?.addEventListener("click",()=>{
   const primeiro=trilho.querySelector(".projeto-cartao");
   const distancia=primeiro ? primeiro.getBoundingClientRect().width+28 : trilho.clientWidth*.8;
   trilho.scrollBy({left:distancia,behavior:"smooth"});tocar("toque");
 });
 q("#projeto-voltar")?.addEventListener("click",()=>{
   const primeiro=trilho.querySelector(".projeto-cartao");
   const distancia=primeiro ? primeiro.getBoundingClientRect().width+28 : trilho.clientWidth*.8;
   trilho.scrollBy({left:-distancia,behavior:"smooth"});tocar("toque");
 });
})();
