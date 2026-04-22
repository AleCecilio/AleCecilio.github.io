const PROJECTS = [
  {
    id: 'books',
    emoji: '📚',
    area: 'Literatura & Marketing',
    title: 'Livros & Estratégia de Marketing',
    desc: 'Análise exploratória de preço, formato, avaliações e gênero literário para identificar padrões de desempenho comercial em mais de 11.000 livros.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/AleCecilio',
    intro: 'Este projeto investiga como fatores como formato (físico vs. digital), gênero literário, número de páginas e avaliações dos leitores se relacionam com o preço e o desempenho comercial de livros.',
    questions: ['Livros mais bem avaliados são mais caros?', 'Qual formato (e-book vs. físico) tem melhor custo-benefício em avaliações?', 'Existe correlação entre número de páginas e avaliação média?', 'Quais gêneros têm maior dispersão de preços?'],
    source: 'Kaggle — Books Dataset (Goodreads). Aproximadamente 11.000 livros com avaliações, preços, formatos e gêneros literários.',
    methodology: 'Limpeza e tratamento de dados com Pandas, análise exploratória com estatísticas descritivas, correlação de Pearson entre variáveis numéricas e segmentação por gênero e formato com visualizações em Seaborn e Matplotlib.',
    insights: ['Livros de autoajuda têm os maiores preços médios, enquanto clássicos literários têm os menores.', 'E-books têm avaliação média aproximadamente 0,3 pontos menor que físicos na mesma categoria.', 'Existe correlação fraca (r = 0,12) entre número de páginas e avaliação média.', 'Livros entre 300 e 400 páginas concentram as melhores avaliações médias.'],
  },
  {
    id: 'economia',
    emoji: '📈',
    area: 'Economia Brasileira',
    title: 'Inflação & Poder de Compra no Brasil',
    desc: 'Evolução do IPCA, salário mínimo e poder de compra real do trabalhador entre 2000 e 2024, com dados públicos do Banco Central e IBGE.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'API Bacen'],
    github: 'https://github.com/AleCecilio',
    intro: 'Investigação da relação entre inflação acumulada (IPCA) e reajuste do salário mínimo para entender se o poder de compra do trabalhador brasileiro cresceu ou encolheu nas últimas duas décadas.',
    questions: ['O salário mínimo cresceu acima da inflação nos últimos 24 anos?', 'Quais períodos registraram maior perda de poder de compra?', 'Como a inflação impactou diferentes categorias de consumo?', 'Qual o valor do salário mínimo de 2000 em reais de 2024?'],
    source: 'API do Banco Central do Brasil (SGS), IBGE — séries históricas do IPCA, dados de salário mínimo do Ministério do Trabalho e Emprego.',
    methodology: 'Coleta via APIs públicas, deflacionamento de séries históricas, cálculo de índice de poder de compra real e visualizações de séries temporais com anotações de eventos históricos relevantes.',
    insights: ['O salário mínimo real cresceu cerca de 120% entre 2003 e 2015, o maior ganho da história recente.', 'Entre 2016 e 2024, o ganho real foi de apenas 8%, com períodos de perda efetiva.', 'A inflação de 2021–2022 (IPCA ~10%) consumiu parte dos reajustes do período anterior.', 'Alimentos e energia são os grupos que mais pressionam o orçamento das famílias de baixa renda.'],
  },
  {
    id: 'f1',
    emoji: '🏎️',
    area: 'Esportes & Estratégia',
    title: 'Fórmula 1 — Estratégia de Pit Stop',
    desc: 'Análise de pit stops, estratégias de pneus e performance em corridas de F1 (2018–2023) para identificar padrões de vitória e tomadas de decisão estratégica.',
    tags: ['Python', 'Pandas', 'FastF1', 'Seaborn'],
    github: 'https://github.com/AleCecilio',
    intro: 'Usando a biblioteca FastF1 com dados oficiais de telemetria, este projeto analisa como as equipes utilizam estratégia de pit stops para obter vantagem competitiva em corridas.',
    questions: ['Equipes com menos pit stops vencem mais corridas?', 'Qual o tempo médio de pit stop por equipe nos últimos 5 anos?', 'Estratégia de 1 stop vs. 2 stops: quando cada uma é mais eficiente?', 'Existe correlação entre posição no grid e número de pit stops realizados?'],
    source: 'FastF1 API (dados oficiais da F1), Ergast API — resultados históricos de corridas, dados de compostos de pneus (Pirelli).',
    methodology: 'Extração de dados via FastF1, limpeza e normalização de tempos de pit stop, análise comparativa por equipe e circuito, segmentação por tipo de estratégia e visualizações com Seaborn.',
    insights: ['Mercedes e Red Bull têm os tempos médios de pit stop mais consistentes, abaixo de 2,4 segundos.', 'Circuitos de rua (Monaco, Baku) favorecem estratégias de 1 stop pela dificuldade de ultrapassagem.', 'A correlação entre posição no grid e número de paradas é significativa (r = 0,67).', 'Em 68% das corridas analisadas, o vencedor realizou o pit stop mais cedo que os principais rivais.'],
  },
  {
    id: 'cinema',
    emoji: '🎬',
    area: 'Cinema & Cultura',
    title: 'Cinema — Crítica vs. Público',
    desc: 'Comparação entre avaliações de críticos especializados e do público geral, mapeando divergências por gênero, década e orçamento.',
    tags: ['Python', 'Pandas', 'Seaborn', 'Matplotlib'],
    github: 'https://github.com/AleCecilio',
    intro: 'Cinema é arte subjetiva — mas os dados revelam padrões objetivos. Este projeto analisa a divergência entre crítica especializada e opinião do público, identificando onde esse gap é mais pronunciado.',
    questions: ['Filmes premiados (Oscar) têm avaliação do público proporcional à crítica?', 'Quais gêneros têm maior divergência entre crítica e público?', 'A avaliação do público se afastou da crítica nas últimas décadas?', 'Filmes de nicho têm maior divergência que blockbusters?'],
    source: 'Kaggle — IMDb Dataset (1M+ filmes), scores do Rotten Tomatoes e Metacritic.',
    methodology: 'Merge de múltiplas fontes, cálculo de índice de divergência crítica/público, análise por gênero, década e orçamento, e heatmaps de correlação com Seaborn.',
    insights: ['Filmes de terror têm a maior divergência: o público avalia, em média, 18 pontos acima da crítica.', 'Dramas históricos e filmes de arte têm crítica muito acima do público (+22 pontos em média).', 'A divergência cresceu cerca de 30% entre 2000 e 2023, indicando polarização de gosto.', 'Filmes com orçamento acima de US$ 100 milhões têm avaliação de público maior que a crítica em 73% dos casos.'],
  },
];

function renderCard(p) {
  return `
    <div class="project-card" onclick="openProject('${p.id}')">
      <span class="card-emoji">${p.emoji}</span>
      <div class="card-area">${p.area}</div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-tags">
        ${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
      </div>
      <span class="card-cta">Ver projeto <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>
    </div>
  `;
}

function renderProjects() {
  const home = document.getElementById('homeProjectsGrid');
  const all  = document.getElementById('allProjectsGrid');
  if (home) home.innerHTML = PROJECTS.slice(0, 2).map(renderCard).join('');
  if (all)  all.innerHTML  = PROJECTS.map(renderCard).join('');
}

function openProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-hero">
      <span class="detail-emoji">${p.emoji}</span>
      <div class="detail-area">${p.area}</div>
      <h1 class="detail-title">${p.title}</h1>
      <div class="card-tags">${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>
    </div>

    <div class="detail-body">
      <div class="detail-content">
        <div class="detail-block">
          <h3>📋 Introdução</h3>
          <p>${p.intro}</p>
        </div>
        <div class="detail-block">
          <h3>❓ Perguntas de Negócio</h3>
          <ul>${p.questions.map(q => `<li>${q}</li>`).join('')}</ul>
        </div>
        <div class="detail-block">
          <h3>🗄 Fonte dos Dados</h3>
          <p>${p.source}</p>
        </div>
        <div class="detail-block">
          <h3>⚙️ Metodologia</h3>
          <p>${p.methodology}</p>
        </div>
        <div class="viz-placeholder">
          <div class="vp-icon">📊</div>
          <p><strong>Visualizações / Dashboard</strong>Em desenvolvimento — será adicionado ao repositório em breve.</p>
        </div>
        <div class="detail-block">
          <h3>💡 Principais Insights</h3>
          ${p.insights.map(i => `<div class="insight-item">${i}</div>`).join('')}
        </div>
      </div>

      <div class="detail-sidebar">
        <div class="sidebar-block">
          <h4>Ferramentas utilizadas</h4>
          <div class="sidebar-tags">${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>
        </div>
        <div class="sidebar-block">
          <h4>Repositório</h4>
          <a href="${p.github}" target="_blank" class="btn btn-green" style="width:100%;justify-content:center;display:flex">
            Ver no GitHub →
          </a>
        </div>
        <div class="sidebar-block">
          <h4>Status</h4>
          <div class="status-badge"><span class="status-dot"></span>Em desenvolvimento</div>
        </div>
      </div>
    </div>
  `;
  go('detail');
}