/* Conteúdo de serviços e navegação do portfólio Herslander Jorge — pt-BR. */
(() => {
  "use strict";

  const servicos = [
    {
      nome: "Direção Criativa",
      descricao: "Transformo um objetivo de negócio em um conceito criativo coerente. Da ideia à publicação, cada peça conversa com a mesma estratégia.",
      entregas: ["Conceito e narrativa", "Briefing e referências", "Direção de campanhas", "Revisão criativa"]
    },
    {
      nome: "Estratégia de Marca",
      descricao: "Organizo posicionamento, público, mensagem e canais para que a comunicação tenha clareza e intenção.",
      entregas: ["Diagnóstico de posicionamento", "Público e proposta de valor", "Tom de voz", "Plano de comunicação"]
    },
    {
      nome: "Direção de Marca",
      descricao: "Alinho identidade, linguagem e presença digital para que uma marca seja reconhecível em cada ponto de contato.",
      entregas: ["Arquitetura de marca", "Diretrizes visuais", "Consistência de comunicação", "Aplicações digitais"]
    },
    {
      nome: "Direção de Arte",
      descricao: "Crio a linguagem visual que conecta fotografia, vídeo, design e campanhas sem perder a identidade de cada projeto.",
      entregas: ["Conceito visual", "Referências e moodboard", "Direção de peças", "Tratamento de imagens"]
    },
    {
      nome: "Conteúdo e Copy",
      descricao: "Planejo mensagens e narrativas para apresentar ideias com clareza, seja em uma campanha, vídeo, site ou rede social.",
      entregas: ["Roteiros e legendas", "Textos para campanhas", "Calendário editorial", "Páginas e apresentações"]
    },
    {
      nome: "Design Gráfico",
      descricao: "Desenvolvo peças visuais para campanhas e marcas, adaptando o mesmo conceito aos formatos digitais e impressos.",
      entregas: ["Posts e carrosséis", "Identidade de campanhas", "Apresentações", "Materiais de divulgação"]
    },
    {
      nome: "Motion Design",
      descricao: "Uso animação, tipografia e ritmo para tornar mensagens mais expressivas em vídeos, publicidade e ambientes digitais.",
      entregas: ["Animações de marca", "Vídeos de lançamento", "Peças animadas", "Elementos para redes sociais"]
    },
    {
      nome: "Edição de Vídeo",
      descricao: "Estruturo vídeos com ritmo, cortes e linguagem adequados à mensagem e à plataforma em que serão publicados.",
      entregas: ["Montagem e finalização", "Vídeos curtos e reels", "Legendas e grafismos", "Adaptação de formatos"]
    },
    {
      nome: "Filmmaker",
      descricao: "Planejo a narrativa audiovisual de um projeto e conecto captação, direção e pós-produção em um fluxo criativo.",
      entregas: ["Conceito audiovisual", "Roteiro e decupagem", "Produção de conteúdo", "Pós-produção"]
    },
    {
      nome: "Social Media",
      descricao: "Estruturo uma presença digital consistente com pautas, criativos e acompanhamento de desempenho.",
      entregas: ["Planejamento editorial", "Criação de conteúdo", "Organização de publicações", "Leitura de métricas"]
    },
    {
      nome: "Tráfego Pago",
      descricao: "Planejo campanhas digitais alinhando criativos, públicos e objetivos, com espaço para medir e ajustar as ações.",
      entregas: ["Planejamento de campanhas", "Criativos e anúncios", "Testes de comunicação", "Acompanhamento de resultados"]
    },
    {
      nome: "Web Design e Desenvolvimento",
      descricao: "Crio experiências digitais responsivas que apresentam a marca, facilitam a navegação e aproximam visitantes de clientes.",
      entregas: ["Sites institucionais", "Landing pages", "Interfaces responsivas", "Integração com contatos e formulários"]
    },
    {
      nome: "Aplicativos Sob Medida",
      descricao: "Estruturo soluções web para necessidades específicas, conectando interface, dados e fluxos operacionais.",
      entregas: ["Sistemas de gestão", "Aplicativos e painéis", "Agendamentos e CRM", "Integrações com serviços"]
    },
    {
      nome: "Automações com IA",
      descricao: "Desenho processos que reduzem tarefas repetitivas e conectam ferramentas, sempre com regras claras e supervisão.",
      entregas: ["Fluxos automatizados", "Integração de ferramentas", "Atendimento por mensagens", "Validação de ações"]
    },
    {
      nome: "Consultoria Digital",
      descricao: "Ajudo a identificar oportunidades de melhoria na presença online e nos processos digitais, priorizando soluções viáveis para cada fase do negócio.",
      entregas: ["Diagnóstico digital", "Priorização de melhorias", "Escolha de ferramentas", "Plano de implementação"]
    },
    {
      nome: "Agentes de IA",
      descricao: "Projeto assistentes digitais orientados por contexto e limites definidos, para auxiliar equipes e clientes em tarefas reais.",
      entregas: ["Assistentes para sites", "Atendimento no WhatsApp", "Consulta de informações", "Integração com sistemas"]
    }
  ];

  const dialogo = document.querySelector("#detalhe-disciplina");
  const lista = document.querySelector("#lista");
  if (!dialogo || !lista) return;

  const whatsapp = "5579998181983";
  const tocar = (efeito) => {
    if (typeof sons !== "undefined" && typeof sons[efeito] === "function") sons[efeito]();
  };
  const numero = document.querySelector("#detalhe-numero");
  const titulo = document.querySelector("#detalhe-titulo");
  const descricao = document.querySelector("#detalhe-descricao");
  const entregas = document.querySelector("#detalhe-entregas");
  const acao = document.querySelector("#detalhe-acao");
  const fechar = document.querySelector("#fechar-detalhe");

  function abrirDetalhe(indice) {
    const servico = servicos[indice];
    if (!servico) return;
    numero.textContent = "ÁREA " + String(indice + 1).padStart(2, "0") + " / " + String(servicos.length).padStart(2, "0");
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
    if (!dialogo.open) { dialogo.showModal(); tocar("detalhe"); }
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
  dialogo.addEventListener("close", () => tocar("voltar"));
  dialogo.addEventListener("click", (evento) => {
    if (evento.target === dialogo) {
      const area = dialogo.getBoundingClientRect();
      if (evento.clientX < area.left || evento.clientX > area.right ||
          evento.clientY < area.top || evento.clientY > area.bottom) {
        dialogo.close();
      }
    }
  });

  document.querySelectorAll(".navegacao a").forEach((link) => {
    link.addEventListener("click", () => {
      tocar("toque");
      if (dialogo.open) dialogo.close();
    });
  });
})();
