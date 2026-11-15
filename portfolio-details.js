/* Conteúdo de serviços e navegação do portfólio Herslander Jorge — pt-BR. */
(() => {
  "use strict";

  const servicos = [
    { nome: "Direção Criativa", descricao: "Desenvolvo o conceito que orienta uma marca ou campanha, mantendo a mensagem consistente da primeira ideia até a publicação.", entregas: ["Conceito e narrativa","Briefing e referências","Direção de equipes e peças","Revisão criativa"] },
    { nome: "Estratégia de Marca", descricao: "Analiso o negócio, o mercado e a concorrência para estruturar posicionamento, público, linguagem e prioridades de comunicação.", entregas: ["Posicionamento","Definição de público","Tom de voz","Plano de comunicação"] },
    { nome: "Identidade de Marca", descricao: "Organizo os elementos que fazem uma marca ser reconhecida: símbolo, tipografia, cores, aplicações e padrões de apresentação.", entregas: ["Logotipo e assinatura","Paleta e tipografia","Manual da marca","Sistema visual"] },
    { nome: "Direção de Arte", descricao: "Defino a linguagem visual de campanhas, fotografias, peças editoriais e conteúdos, mantendo coerência entre diferentes formatos.", entregas: ["Conceito visual","Direção de imagens","Tratamento fotográfico","Imagens com IA"] },
    { nome: "Texto e Conteúdo", descricao: "Transformo uma ideia em mensagens que funcionam para redes sociais, anúncios, roteiros de vídeo, apresentações e páginas digitais.", entregas: ["Textos e chamadas","Roteiros de vídeos","Conteúdo para campanhas","Calendário editorial"] },
    { nome: "Design Gráfico", descricao: "Crio materiais de comunicação para meios digitais e impressos a partir de uma identidade visual consistente.", entregas: ["Posts e carrosséis","Stories","Peças e cartazes","Apresentações"] },
    { nome: "Design de Produto", descricao: "Desenvolvo a apresentação visual de produtos e serviços, incluindo embalagens, rótulos e imagens para catálogos e comércio digital.", entregas: ["Conceito de produto","Rótulos e embalagens","Imagens de produto com IA","Catálogo e e-commerce"] },
    { nome: "Vídeo e Motion Design", descricao: "Combino montagem, ritmo, som, legendas e grafismos para criar vídeos e animações alinhados à identidade de cada marca.", entregas: ["Vídeos curtos","Edição e finalização","Animações e motion","Legendas e adaptação"] },
    { nome: "Social Media", descricao: "Planejo conteúdos, formatos e frequência para manter uma presença digital organizada e acompanhar seus resultados.", entregas: ["Plano editorial","Organização de publicações","Relacionamento com o público","Métricas e insights"] },
    { nome: "Tráfego Pago", descricao: "Estruturo campanhas em plataformas como Instagram e Facebook, com criativos, testes, acompanhamento e ajustes baseados em objetivos.", entregas: ["Geração de contatos","Criativos para anúncios","Testes A/B","Relatórios"] },
    { nome: "Web Design e Desenvolvimento", descricao: "Desenho e construo sites responsivos, páginas de apresentação e experiências com interações úteis, velocidade e clareza.", entregas: ["Sites institucionais","Landing pages","Interfaces responsivas","Interações e integrações"] },
    { nome: "Aplicativos Sob Medida", descricao: "Projeto sistemas e aplicativos orientados às rotinas de um negócio: agendamento, relacionamento, gestão e integrações.", entregas: ["Agendamentos e pagamentos","Áreas restritas","Painéis e CRM","Integrações entre sistemas"] },
    { nome: "Automações com IA", descricao: "Conecto ferramentas e crio fluxos para acompanhar contatos, reduzir tarefas repetitivas e executar ações com regras e validação.", entregas: ["Automações de mensagens","Acompanhamento de leads","Alertas operacionais","Relatórios automatizados"] },
    { nome: "Prospecção B2B", descricao: "Organizo a pesquisa de empresas e potenciais parceiros usando dados publicados legitimamente, com foco em abordagens relevantes.", entregas: ["Pesquisa de empresas","Segmentação por região","Segmentação por nicho","Organização de contatos"] },
    { nome: "Agentes de IA", descricao: "Desenvolvo assistentes com contexto do negócio para ajudar em sites e mensagens, consultar informações e transferir casos que exigem uma pessoa.", entregas: ["Atendimento no WhatsApp","Chat para sites","Respostas contextualizadas","Integração com agendas"] },
    { nome: "Cérebro da Empresa", descricao: "Estruturo informações, ferramentas e fluxos para que a equipe consulte dados e acione processos em um ambiente integrado e controlado.", entregas: ["Base de conhecimento","Ferramentas conectadas","Painéis e relatórios","Ações com permissões"] }
  ];

  const dialogo = document.querySelector("#detalhe-disciplina");
  const lista = document.querySelector("#lista");
  if (!dialogo || !lista) return;

  const whatsapp = "5579998181983";
  const tocar = (efeito) => {
    if (typeof sons !== "undefined" && typeof sons[efeito] === "function") sons[efeito]();
  };
  const numero = document.querySelector("#detalhe-numero");
  const indiceVisual = document.querySelector("#detalhe-indice");
  const titulo = document.querySelector("#detalhe-titulo");
  let ultimaOpcao = null;
  const descricao = document.querySelector("#detalhe-descricao");
  const entregas = document.querySelector("#detalhe-entregas");
  const acao = document.querySelector("#detalhe-acao");
  const verProjetos = document.querySelector("#detalhe-projetos");
  const fechar = document.querySelector("#fechar-detalhe");

  function abrirDetalhe(indice) {
    const servico = servicos[indice];
    if (!servico) return;
    const numeroAtual = String(indice + 1).padStart(2, "0");
    numero.textContent = numeroAtual + " / " + String(servicos.length).padStart(2, "0");
    indiceVisual.textContent = numeroAtual;
    titulo.textContent = servico.nome;
    descricao.textContent = servico.descricao;
    entregas.replaceChildren();
    servico.entregas.forEach((entrega, i) => {
      const item = document.createElement("li");
      const contagem = document.createElement("span");
      contagem.textContent = String(i + 1).padStart(2, "0");
      item.append(contagem, document.createTextNode(entrega));
      entregas.append(item);
    });
    const mensagem = "Olá! Quero conversar com Herslander Jorge sobre " + servico.nome + ".";
    acao.href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(mensagem);
    verProjetos.hidden = ![0,2,3,5,6,7,10,11].includes(indice);
    if (!dialogo.open) {
      ultimaOpcao = document.activeElement;
      dialogo.showModal();
      dialogo.scrollTop = 0;
      fechar.focus();
      tocar("detalhe");
    }
  }

  Array.from(lista.children).forEach((item, indice) => {
    if (!servicos[indice]) return;
    item.setAttribute("role", "button");
    item.tabIndex = 0;
    item.setAttribute("aria-label", "Conhecer " + servicos[indice].nome);
    item.addEventListener("click", () => abrirDetalhe(indice));
    item.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirDetalhe(indice);
      }
    });
  });

  fechar.addEventListener("click", () => dialogo.close());
  verProjetos.addEventListener("click",(evento)=>{
    evento.preventDefault();
    dialogo.close();
    requestAnimationFrame(()=>document.querySelector("#projetos")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));
  });
  dialogo.addEventListener("close", () => {
    tocar("voltar");
    if (ultimaOpcao?.isConnected && typeof ultimaOpcao.focus === "function") ultimaOpcao.focus({ preventScroll: true });
    ultimaOpcao = null;
  });
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) {
      const area = dialogo.getBoundingClientRect();
      if (evento.clientX < area.left || evento.clientX > area.right ||
          evento.clientY < area.top || evento.clientY > area.bottom) {
        dialogo.close();
      }
    }
  });

  const menuMobile = document.querySelector("#menu-mobile");
  const navPrincipal = document.querySelector("#nav-principal");
  const fecharMenu = () => {
    document.body.classList.remove("menu-aberto");
    menuMobile?.setAttribute("aria-expanded", "false");
  };
  menuMobile?.addEventListener("click", () => {
    const abrir = !document.body.classList.contains("menu-aberto");
    document.body.classList.toggle("menu-aberto", abrir);
    menuMobile.setAttribute("aria-expanded", String(abrir));
    tocar("toque");
    if (abrir) navPrincipal?.querySelector("a")?.focus({preventScroll:true});
  });
  document.addEventListener("pointerdown", (evento) => {
    if (document.body.classList.contains("menu-aberto") &&
        !menuMobile?.contains(evento.target) && !navPrincipal?.contains(evento.target)) fecharMenu();
  }, {passive:true});
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharMenu();
  });
  window.addEventListener("scroll", () => {
    if (document.body.classList.contains("menu-aberto")) fecharMenu();
  }, {passive:true});
  window.addEventListener("resize", fecharMenu, {passive:true});
  document.querySelectorAll(".navegacao a").forEach((link) => {
    link.addEventListener("click", () => {
      tocar("toque");
      fecharMenu();
      if (dialogo.open) dialogo.close();
    });
  });
})();
