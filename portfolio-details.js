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


  /* Página de disciplinas: a roleta navega para a coleção completa de cartões. */
  const dialogo = document.querySelector("#detalhe-disciplina");
  const lista = document.querySelector("#lista");
  const raizCartoes = document.querySelector("#disciplinas-cartoes");
  const fechar = document.querySelector("#fechar-detalhe");
  if (!dialogo || !lista || !raizCartoes || !fechar) return;
  const whatsapp = "5579998181983";
  const mostrarTrabalho = new Set([0, 2, 3, 5, 6, 7, 10, 11]);
  const origem = window.location.pathname + window.location.search;
  const prefixo = "#disciplina-";
  const tocar = (efeito) => {
    if (typeof sons !== "undefined" && typeof sons[efeito] === "function") sons[efeito]();
  };
  let focoAnterior = null;
  let indiceAtual = -1;
  let agendadoScroll = false;
  let scrollHabilitado = false;

  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }
  function numerar(n) { return String(n).padStart(2, "0"); }
  function endereco(index) { return origem + prefixo + numerar(index + 1); }
  function indiceDoHash() {
    const match = window.location.hash.match(/^#disciplina-(\d{1,2})$/);
    const i = match ? Number(match[1]) - 1 : -1;
    return i >= 0 && i < servicos.length ? i : -1;
  }
  const cards = servicos.map((servico, i) => {
    const article = criar("article", "disciplina-cartao");
    article.id = "disciplina-" + numerar(i + 1);
    article.setAttribute("aria-labelledby", "titulo-disciplina-" + numerar(i + 1));

    const top = criar("div", "disciplina-card-topo mono");
    top.append(criar("span", null, "Disciplina"), criar("span", null, numerar(i + 1)));

    const titulo = criar("h3", "disciplina-nome", servico.nome);
    titulo.id = "titulo-disciplina-" + numerar(i + 1);
    const descricao = criar("p", "disciplina-descricao", servico.descricao);
    const entregas = criar("ol", "disciplina-entregas");
    servico.entregas.forEach((entrega, n) => {
      const item = criar("li");
      item.append(criar("span", "numero", numerar(n + 1)), criar("span", null, entrega));
      entregas.append(item);
    });
    const acoes = criar("div", "disciplina-acoes");
    const contato = criar("a", "disciplina-falar", "Vamos conversar");
    contato.href = "https://wa.me/" + whatsapp + "?text=" +
      encodeURIComponent("Olá! Quero conversar com Herslander Jorge sobre " + servico.nome + ".");
    contato.target = "_blank";
    contato.rel = "noopener noreferrer";
    contato.addEventListener("click", () => tocar("toque"));
    acoes.append(contato);

    if (mostrarTrabalho.has(i)) {
      const trabalhos = criar("a", "disciplina-projetos", "Ver projetos →");
      trabalhos.href = "#projetos";
      trabalhos.addEventListener("click", (evento) => {
        evento.preventDefault();
        tocar("toque");
        history.replaceState(null, "", origem + "#projetos");
        dialogo.close();
        requestAnimationFrame(() => {
          document.querySelector("#projetos")?.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
          });
        });
      });
      acoes.append(trabalhos);
    }
    article.append(top, titulo, descricao, entregas, acoes);
    return article;
  });
  raizCartoes.append(...cards);

  function atualizarEndereco(i) {
    if (!dialogo.open || indiceAtual === i) return;
    indiceAtual = i;
    const state = history.state && history.state.__herslanderDisciplina
      ? { ...history.state, index: i }
      : history.state;
    history.replaceState(state, "", endereco(i));
  }
  function mostrar(index, opts = {}) {
    const i = Math.min(servicos.length - 1, Math.max(0, index));
    if (!dialogo.open) {
      focoAnterior = document.activeElement;
      dialogo.showModal();
      document.body.classList.add("disciplinas-abertas");
    }
    scrollHabilitado = false;
    /* A posição inicial é aplicada sem animação: reduz o atraso ao tocar na roleta. */
    cards[i].scrollIntoView({ behavior: "instant", block: "start" });
    indiceAtual = i;
    if (opts.push) {
      history.pushState({ __herslanderDisciplina: true, index: i }, "", endereco(i));
    }
    fechar.focus({ preventScroll: true });
    if (opts.sound !== false) tocar("detalhe");
    requestAnimationFrame(() => { scrollHabilitado = true; });
  }
  function voltar() {
    if (!dialogo.open) return;
    if (history.state?.__herslanderDisciplina) history.back();
    else {
      history.replaceState(null, "", origem);
      dialogo.close();
    }
  }
  function aoFechar() {
    document.body.classList.remove("disciplinas-abertas");
    tocar("voltar");
    if (focoAnterior?.isConnected && typeof focoAnterior.focus === "function") {
      focoAnterior.focus({ preventScroll: true });
    }
    focoAnterior = null;
    indiceAtual = -1;
    scrollHabilitado = false;
  }

  /* Roda: clique, toque e teclado abrem a ficha correspondente na lista contínua. */
  Array.from(lista.children).forEach((elemento, i) => {
    if (!servicos[i]) return;
    elemento.setAttribute("role", "button");
    elemento.setAttribute("aria-controls", "detalhe-disciplina");
    elemento.setAttribute("aria-label", "Conhecer " + servicos[i].nome);
    elemento.tabIndex = 0;
    const acionar = () => mostrar(i, { push: true });
    elemento.addEventListener("click", acionar);
    elemento.addEventListener("keydown", evento => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        acionar();
      }
    });
  });

  fechar.addEventListener("click", voltar);
  dialogo.addEventListener("cancel", evento => {
    if (history.state?.__herslanderDisciplina) {
      evento.preventDefault();
      history.back();
    }
  });
  dialogo.addEventListener("close", aoFechar);
  window.addEventListener("popstate", evento => {
    if (evento.state?.__herslanderDisciplina) {
      mostrar(Number(evento.state.index) || 0, { push: false, sound: false });
    } else if (dialogo.open) dialogo.close();
  });
  window.addEventListener("hashchange", () => {
    if (history.state?.__herslanderDisciplina) return;
    const i = indiceDoHash();
    if (i >= 0 && !dialogo.open) mostrar(i, { sound: false });
  });

  /* Ao percorrer cartões, atualiza apenas o fragmento da disciplina visível. */
  dialogo.addEventListener("scroll", () => {
    if (agendadoScroll || !scrollHabilitado) return;
    agendadoScroll = true;
    requestAnimationFrame(() => {
      agendadoScroll = false;
      if (!dialogo.open || !scrollHabilitado) return;
      const linha = dialogo.getBoundingClientRect().top + 165;
      let maisPerto = 0;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].getBoundingClientRect().top <= linha) maisPerto = i;
        else break;
      }
      atualizarEndereco(maisPerto);
    });
  }, { passive: true });

  /* Permite abrir diretamente #disciplina-16 a partir de um link compartilhado. */
  const inicial = indiceDoHash();
  if (inicial >= 0) requestAnimationFrame(() => mostrar(inicial, { sound: false }));

  const menuMobile = document.querySelector("#menu-mobile");
  const navPrincipal = document.querySelector("#nav-principal");
  const fecharMenu = () => {
    document.body.classList.remove("menu-aberto");
    menuMobile?.setAttribute("aria-expanded", "false");
    if (menuMobile) menuMobile.textContent = "Menu";
  };
  menuMobile?.addEventListener("click", () => {
    const abrir = !document.body.classList.contains("menu-aberto");
    document.body.classList.toggle("menu-aberto", abrir);
    menuMobile.setAttribute("aria-expanded", String(abrir));
    menuMobile.textContent = abrir ? "Fechar" : "Menu";
    tocar("toque");
    // Foco automático apenas para teclado; em toque mobile não exibimos moldura inesperada.
    if (abrir && menuMobile.matches(":focus-visible")) navPrincipal?.querySelector("a")?.focus({preventScroll:true});
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
