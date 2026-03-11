// ===================================================
// HELPERS — DATA/TEMPO
// ===================================================
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getDifficulty(streak) {
  if (streak >= 21) return { label: 'Difícil', xp: 15, color: '#ff6b6b' };
  if (streak >= 7)  return { label: 'Médio',   xp: 10, color: '#f59e0b' };
  return               { label: 'Fácil',   xp: 5,  color: '#38bdf8' };
}

// ===================================================
// STATE
// ===================================================
let state = {
  user: { name: 'Atleta', avatar: '🦁' },
  streak: 0,
  xp: 0,
  habits: [
    { id: 1, name: 'Meditar',    icon: '🧘', color: '#d4ff47', streak: 0, goal: '10 minutos', lastDone: null },
    { id: 2, name: 'Exercitar',  icon: '🏋️', color: '#8b5cf6', streak: 0, goal: '30 minutos', lastDone: null },
    { id: 3, name: 'Ler',        icon: '📚', color: '#38bdf8', streak: 0, goal: '20 páginas',  lastDone: null },
    { id: 4, name: 'Beber água', icon: '💧', color: '#f59e0b', streak: 0, goal: '2 litros',    lastDone: null },
  ],
  challenges: [
    { id: 1, name: 'Meditação 7 Dias',      desc: 'Medite todos os dias por uma semana',         icon: '🧘', days: 7,  doneDays: Array(7).fill(false),  lastAdvanced: null, color: '#8b5cf6', colorDim: 'rgba(139,92,246,0.15)', joined: false, habitId: null },
    { id: 2, name: 'Hábito de 21 Dias',     desc: 'O ciclo completo para formar um novo hábito', icon: '🔄', days: 21, doneDays: Array(21).fill(false), lastAdvanced: null, color: '#38bdf8', colorDim: 'rgba(56,189,248,0.15)',  joined: false, habitId: null },
    { id: 3, name: 'Transformação 30 Dias', desc: 'Mude sua vida em um mês com consistência',    icon: '🚀', days: 30, doneDays: Array(30).fill(false), lastAdvanced: null, color: '#f59e0b', colorDim: 'rgba(245,158,11,0.15)',  joined: false, habitId: null },
    { id: 4, name: 'Guerreiro do Sono',     desc: 'Durma 8 horas por 7 dias seguidos',           icon: '😴', days: 7,  doneDays: Array(7).fill(false),  lastAdvanced: null, color: '#ff6b6b', colorDim: 'rgba(255,107,107,0.15)', joined: false, habitId: null },
    { id: 5, name: 'Hidratação Total',      desc: '2L de água por dia durante 21 dias',          icon: '💧', days: 21, doneDays: Array(21).fill(false), lastAdvanced: null, color: '#d4ff47', colorDim: 'rgba(212,255,71,0.12)',  joined: false, habitId: null },
  ],
  badges: [
    // 🔥 STREAK
    { id:1,   cat:'streak',  icon:'🌱', name:'Primeiro Passo',   desc:'1º hábito completo',        unlocked:false, isNew:false },
    { id:2,   cat:'streak',  icon:'🔥', name:'Em Chamas',         desc:'3 dias seguidos',           unlocked:false, isNew:false },
    { id:3,   cat:'streak',  icon:'⚡', name:'Imparável',          desc:'7 dias seguidos',           unlocked:false, isNew:false },
    { id:4,   cat:'streak',  icon:'💎', name:'Diamante',           desc:'21 dias de streak',         unlocked:false, isNew:false },
    { id:5,   cat:'streak',  icon:'👑', name:'Campeão',            desc:'30 dias de streak',         unlocked:false, isNew:false },
    { id:6,   cat:'streak',  icon:'🌙', name:'Mês Completo',       desc:'30 dias sem falhar',        unlocked:false, isNew:false },
    { id:7,   cat:'streak',  icon:'🌟', name:'Dois Meses',         desc:'60 dias seguidos',          unlocked:false, isNew:false },
    { id:8,   cat:'streak',  icon:'☀️', name:'Trimestre',          desc:'90 dias de streak',         unlocked:false, isNew:false },
    { id:9,   cat:'streak',  icon:'🏔️', name:'Meio Ano',           desc:'180 dias de streak',        unlocked:false, isNew:false },
    { id:10,  cat:'streak',  icon:'🎆', name:'Um Ano!',            desc:'365 dias de streak',        unlocked:false, isNew:false },
    { id:11,  cat:'streak',  icon:'🔑', name:'Consistente',        desc:'14 dias seguidos',          unlocked:false, isNew:false },
    { id:12,  cat:'streak',  icon:'🛡️', name:'Inabalável',         desc:'45 dias de streak',         unlocked:false, isNew:false },

    // ✅ HÁBITOS COMPLETOS
    { id:13,  cat:'habitos', icon:'✅', name:'Dedicado',           desc:'10 hábitos no total',       unlocked:false, isNew:false },
    { id:14,  cat:'habitos', icon:'💯', name:'Cem por Cento',      desc:'50 hábitos completos',      unlocked:false, isNew:false },
    { id:15,  cat:'habitos', icon:'🎯', name:'Focado',             desc:'100 hábitos completos',     unlocked:false, isNew:false },
    { id:16,  cat:'habitos', icon:'🏅', name:'Veterano',           desc:'250 hábitos completos',     unlocked:false, isNew:false },
    { id:17,  cat:'habitos', icon:'🥇', name:'Ouro',               desc:'500 hábitos completos',     unlocked:false, isNew:false },
    { id:18,  cat:'habitos', icon:'🏆', name:'Lendário',           desc:'1000 hábitos completos',    unlocked:false, isNew:false },
    { id:19,  cat:'habitos', icon:'🌈', name:'Arco-Íris',          desc:'Complete todos os hábitos', unlocked:false, isNew:false },
    { id:20,  cat:'habitos', icon:'🎖️', name:'Elite',              desc:'Perfeito por 7 dias',       unlocked:false, isNew:false },
    { id:21,  cat:'habitos', icon:'🌊', name:'Fluxo',              desc:'Perfeito por 14 dias',      unlocked:false, isNew:false },
    { id:22,  cat:'habitos', icon:'🔮', name:'Mestre',             desc:'Perfeito por 30 dias',      unlocked:false, isNew:false },
    { id:23,  cat:'habitos', icon:'🕊️', name:'Zen',                desc:'30 dias sem pular',         unlocked:false, isNew:false },
    { id:24,  cat:'habitos', icon:'⚙️', name:'Máquina',            desc:'Hábito completado 50x',     unlocked:false, isNew:false },

    // 🎯 DESAFIOS
    { id:25,  cat:'desafios',icon:'🎪', name:'Primeiro Desafio',   desc:'Participe de 1 desafio',    unlocked:false, isNew:false },
    { id:26,  cat:'desafios',icon:'🥈', name:'Prata',              desc:'Complete 1 desafio',        unlocked:false, isNew:false },
    { id:27,  cat:'desafios',icon:'🥇', name:'Ouro Puro',          desc:'Complete 3 desafios',       unlocked:false, isNew:false },
    { id:28,  cat:'desafios',icon:'💪', name:'Determinado',        desc:'Complete 5 desafios',       unlocked:false, isNew:false },
    { id:29,  cat:'desafios',icon:'🚀', name:'Decolar',            desc:'Transformação 30 dias',     unlocked:false, isNew:false },
    { id:30,  cat:'desafios',icon:'🧗', name:'Escalada',           desc:'Complete desafio 21 dias',  unlocked:false, isNew:false },
    { id:31,  cat:'desafios',icon:'🌺', name:'Floresceu',          desc:'Complete desafio 7 dias',   unlocked:false, isNew:false },
    { id:32,  cat:'desafios',icon:'🔱', name:'Tridente',           desc:'3 desafios simultâneos',    unlocked:false, isNew:false },
    { id:33,  cat:'desafios',icon:'🎗️', name:'Dedicação',          desc:'10 desafios completos',     unlocked:false, isNew:false },

    // ⚡ XP & NÍVEL
    { id:34,  cat:'xp',      icon:'⚡', name:'Faísca',             desc:'Alcance 100 XP',            unlocked:false, isNew:false },
    { id:35,  cat:'xp',      icon:'🔋', name:'Carregado',          desc:'Alcance 500 XP',            unlocked:false, isNew:false },
    { id:36,  cat:'xp',      icon:'💡', name:'Iluminado',          desc:'Alcance 1000 XP',           unlocked:false, isNew:false },
    { id:37,  cat:'xp',      icon:'🌠', name:'Estrela Cadente',    desc:'Alcance 2500 XP',           unlocked:false, isNew:false },
    { id:38,  cat:'xp',      icon:'🌞', name:'Supernova',          desc:'Alcance 5000 XP',           unlocked:false, isNew:false },
    { id:39,  cat:'xp',      icon:'🪐', name:'Planetário',         desc:'Alcance 10000 XP',          unlocked:false, isNew:false },
    { id:40,  cat:'xp',      icon:'🎓', name:'Aprendiz',           desc:'Chegue ao Nível 2',         unlocked:false, isNew:false },
    { id:41,  cat:'xp',      icon:'📜', name:'Estudioso',          desc:'Chegue ao Nível 5',         unlocked:false, isNew:false },
    { id:42,  cat:'xp',      icon:'🧙', name:'Sábio',              desc:'Chegue ao Nível 10',        unlocked:false, isNew:false },

    // 🌅 MANHÃ / HORÁRIO
    { id:43,  cat:'horario', icon:'🌅', name:'Madrugador',         desc:'Complete hábito antes 8h',  unlocked:false, isNew:false },
    { id:44,  cat:'horario', icon:'☕', name:'Café da Manhã',       desc:'5 dias marcando antes 9h',  unlocked:false, isNew:false },
    { id:45,  cat:'horario', icon:'🌇', name:'Noturno',             desc:'Complete hábito após 21h',  unlocked:false, isNew:false },
    { id:46,  cat:'horario', icon:'🕛', name:'Meia-Noite',          desc:'Marcou às 23h59',           unlocked:false, isNew:false },
    { id:47,  cat:'horario', icon:'🌤️', name:'Rotina Matinal',      desc:'7 dias antes das 8h',       unlocked:false, isNew:false },
    { id:48,  cat:'horario', icon:'🦉', name:'Coruja',              desc:'7 dias após 22h',           unlocked:false, isNew:false },

    // 🏃 MOVIMENTO / EXERCÍCIO
    { id:49,  cat:'move',    icon:'🏃', name:'Corredor',            desc:'Hábito exercício 5x',       unlocked:false, isNew:false },
    { id:50,  cat:'move',    icon:'🚴', name:'Ciclista',            desc:'Hábito exercício 10x',      unlocked:false, isNew:false },
    { id:51,  cat:'move',    icon:'🤸', name:'Flexível',            desc:'Hábito exercício 20x',      unlocked:false, isNew:false },
    { id:52,  cat:'move',    icon:'🏋️', name:'Musculoso',           desc:'Hábito exercício 50x',      unlocked:false, isNew:false },
    { id:53,  cat:'move',    icon:'🥊', name:'Lutador',             desc:'Hábito exercício 100x',     unlocked:false, isNew:false },
    { id:54,  cat:'move',    icon:'🧘', name:'Meditador',           desc:'Hábito meditação 10x',      unlocked:false, isNew:false },
    { id:55,  cat:'move',    icon:'🧠', name:'Mente Zen',           desc:'Hábito meditação 30x',      unlocked:false, isNew:false },
    { id:56,  cat:'move',    icon:'🏊', name:'Nadador',             desc:'30 dias de movimento',      unlocked:false, isNew:false },

    // 📚 LEITURA / MENTE
    { id:57,  cat:'mente',   icon:'📖', name:'Leitor',              desc:'Hábito leitura 5x',         unlocked:false, isNew:false },
    { id:58,  cat:'mente',   icon:'📚', name:'Bibliófilo',          desc:'Hábito leitura 20x',        unlocked:false, isNew:false },
    { id:59,  cat:'mente',   icon:'🧩', name:'Curioso',             desc:'Hábito leitura 50x',        unlocked:false, isNew:false },
    { id:60,  cat:'mente',   icon:'✍️', name:'Escritor',            desc:'Hábito escrita 10x',        unlocked:false, isNew:false },
    { id:61,  cat:'mente',   icon:'🎵', name:'Músico',              desc:'Hábito música 10x',         unlocked:false, isNew:false },
    { id:62,  cat:'mente',   icon:'🎨', name:'Artista',             desc:'Hábito criativo 10x',       unlocked:false, isNew:false },
    { id:63,  cat:'mente',   icon:'🔬', name:'Cientista',           desc:'Hábito aprendizado 30x',    unlocked:false, isNew:false },

    // 💧 SAÚDE
    { id:64,  cat:'saude',   icon:'💧', name:'Hidratado',           desc:'Água 7 dias seguidos',      unlocked:false, isNew:false },
    { id:65,  cat:'saude',   icon:'🥗', name:'Saudável',            desc:'Hábito nutrição 10x',       unlocked:false, isNew:false },
    { id:66,  cat:'saude',   icon:'😴', name:'Dorminhoco',          desc:'Hábito sono 7x',            unlocked:false, isNew:false },
    { id:67,  cat:'saude',   icon:'🫀', name:'Coração Saudável',    desc:'30 dias de saúde',          unlocked:false, isNew:false },
    { id:68,  cat:'saude',   icon:'🌿', name:'Natureza',            desc:'Hábito ao ar livre 10x',    unlocked:false, isNew:false },
    { id:69,  cat:'saude',   icon:'🍎', name:'Maçã por Dia',        desc:'Nutrição 30 dias seguidos', unlocked:false, isNew:false },
    { id:70,  cat:'saude',   icon:'🧬', name:'DNA de Ferro',        desc:'90 dias sem falhar saúde',  unlocked:false, isNew:false },

    // 🌱 CRESCIMENTO PESSOAL
    { id:71,  cat:'grow',    icon:'🌱', name:'Brotou',              desc:'Crie seu 1º hábito',        unlocked:false, isNew:false },
    { id:72,  cat:'grow',    icon:'🌿', name:'Crescendo',           desc:'Crie 3 hábitos',            unlocked:false, isNew:false },
    { id:73,  cat:'grow',    icon:'🌳', name:'Árvore Forte',        desc:'Crie 5 hábitos',            unlocked:false, isNew:false },
    { id:74,  cat:'grow',    icon:'🌲', name:'Floresta',            desc:'Crie 10 hábitos',           unlocked:false, isNew:false },
    { id:75,  cat:'grow',    icon:'🪴', name:'Jardineiro',          desc:'Edite um hábito',           unlocked:false, isNew:false },
    { id:76,  cat:'grow',    icon:'💼', name:'Profissional',        desc:'Hábito produtividade 20x',  unlocked:false, isNew:false },
    { id:77,  cat:'grow',    icon:'🎯', name:'Sniper',              desc:'Meta atingida 10 vezes',    unlocked:false, isNew:false },
    { id:78,  cat:'grow',    icon:'🏗️', name:'Construtor',          desc:'21 dias construindo hábito',unlocked:false, isNew:false },
    { id:79,  cat:'grow',    icon:'🦋', name:'Metamorfose',         desc:'30 dias de transformação',  unlocked:false, isNew:false },
    { id:80,  cat:'grow',    icon:'🪄', name:'Mágico',              desc:'Hábito virou rotina',       unlocked:false, isNew:false },

    // 📅 DIAS DA SEMANA
    { id:81,  cat:'semana',  icon:'🔵', name:'Guerreiro de Seg',    desc:'10x na segunda-feira',      unlocked:false, isNew:false },
    { id:82,  cat:'semana',  icon:'🟢', name:'Terça Invicta',       desc:'10x na terça-feira',        unlocked:false, isNew:false },
    { id:83,  cat:'semana',  icon:'🟡', name:'Quarta de Ouro',      desc:'10x na quarta-feira',       unlocked:false, isNew:false },
    { id:84,  cat:'semana',  icon:'🟠', name:'Quinta do Trovão',    desc:'10x na quinta-feira',       unlocked:false, isNew:false },
    { id:85,  cat:'semana',  icon:'🔴', name:'Sexta Feroz',         desc:'10x na sexta-feira',        unlocked:false, isNew:false },
    { id:86,  cat:'semana',  icon:'🟣', name:'Sábado Guerreiro',    desc:'10x no sábado',             unlocked:false, isNew:false },
    { id:87,  cat:'semana',  icon:'⚪', name:'Domingo Sagrado',      desc:'10x no domingo',            unlocked:false, isNew:false },
    { id:88,  cat:'semana',  icon:'📅', name:'Semana Completa',     desc:'Todos os dias da semana',   unlocked:false, isNew:false },
    { id:89,  cat:'semana',  icon:'🗓️', name:'Mês Impecável',       desc:'Sem falhar em 1 mês',       unlocked:false, isNew:false },

    // 🏅 ESPECIAIS
    { id:90,  cat:'special', icon:'🎂', name:'Aniversário',         desc:'1 ano usando o app',        unlocked:false, isNew:false },
    { id:91,  cat:'special', icon:'🎁', name:'Surpresa',            desc:'Complete hábito inesperado',unlocked:false, isNew:false },
    { id:92,  cat:'special', icon:'🌍', name:'Global',              desc:'Hábito em 3 fusos horários',unlocked:false, isNew:false },
    { id:93,  cat:'special', icon:'🤝', name:'Social',              desc:'Compartilhe seu progresso', unlocked:false, isNew:false },
    { id:94,  cat:'special', icon:'💌', name:'Motivado',            desc:'Leia 10 frases motivacionais',unlocked:false,isNew:false },
    { id:95,  cat:'special', icon:'🛸', name:'Alienígena',          desc:'Faça algo impossível',      unlocked:false, isNew:false },
    { id:96,  cat:'special', icon:'🎭', name:'Ator',                desc:'Complete hábito com estilo',unlocked:false, isNew:false },
    { id:97,  cat:'special', icon:'🃏', name:'Coringa',             desc:'Complete em dia de chuva',  unlocked:false, isNew:false },
    { id:98,  cat:'special', icon:'🔭', name:'Astrônomo',           desc:'Complete à meia-noite',     unlocked:false, isNew:false },
    { id:99,  cat:'special', icon:'🎪', name:'Showman',             desc:'Confetti 50 vezes',         unlocked:false, isNew:false },
    { id:100, cat:'special', icon:'💯', name:'Perfeição',           desc:'100 dias sem falhar',       unlocked:false, isNew:false },

    // 🔢 NÚMEROS
    { id:101, cat:'numeros', icon:'1️⃣', name:'Um',                  desc:'1º dia completo',           unlocked:false, isNew:false },
    { id:102, cat:'numeros', icon:'5️⃣', name:'Cinco',               desc:'5 dias completos',          unlocked:false, isNew:false },
    { id:103, cat:'numeros', icon:'🔟', name:'Dez',                 desc:'10 dias completos',         unlocked:false, isNew:false },
    { id:104, cat:'numeros', icon:'💫', name:'Vinte e Um',          desc:'21 dias completos',         unlocked:false, isNew:false },
    { id:105, cat:'numeros', icon:'📊', name:'Cinquenta',           desc:'50 dias completos',         unlocked:false, isNew:false },
    { id:106, cat:'numeros', icon:'🏁', name:'Cem',                 desc:'100 dias completos',        unlocked:false, isNew:false },
    { id:107, cat:'numeros', icon:'🔢', name:'Duzentos',            desc:'200 dias completos',        unlocked:false, isNew:false },
    { id:108, cat:'numeros', icon:'♾️', name:'Infinito',            desc:'365 dias completos',        unlocked:false, isNew:false },

    // 🌦️ CLIMA / ESTAÇÕES
    { id:109, cat:'estacao', icon:'❄️', name:'Inverno',             desc:'Hábito nos 3 meses frios',  unlocked:false, isNew:false },
    { id:110, cat:'estacao', icon:'🌸', name:'Primavera',           desc:'Hábito 3 meses florescendo',unlocked:false, isNew:false },
    { id:111, cat:'estacao', icon:'☀️', name:'Verão',               desc:'Hábito nos 3 meses quentes',unlocked:false, isNew:false },
    { id:112, cat:'estacao', icon:'🍂', name:'Outono',              desc:'Hábito 3 meses de colheita',unlocked:false, isNew:false },
    { id:113, cat:'estacao', icon:'🌀', name:'Ciclone',             desc:'Hábito em dia de tempestade',unlocked:false,isNew:false },
    { id:114, cat:'estacao', icon:'🌈', name:'Arco-Íris',           desc:'Complete após dias difíceis',unlocked:false,isNew:false },

    // 🤯 DESAFIOS EXTREMOS
    { id:115, cat:'extremo', icon:'🧊', name:'Gelo Vivo',           desc:'Complete mesmo doente',     unlocked:false, isNew:false },
    { id:116, cat:'extremo', icon:'🔥', name:'Inferno de Ferro',    desc:'Streak 50 dias hábito difícil',unlocked:false,isNew:false },
    { id:117, cat:'extremo', icon:'⛰️', name:'Everest',             desc:'Suba ao nível máximo',      unlocked:false, isNew:false },
    { id:118, cat:'extremo', icon:'🌋', name:'Vulcão',              desc:'10 hábitos num dia',        unlocked:false, isNew:false },
    { id:119, cat:'extremo', icon:'🦁', name:'Leão',                desc:'Nunca quebrou um streak',   unlocked:false, isNew:false },
    { id:120, cat:'extremo', icon:'🐉', name:'Dragão',              desc:'500 dias no total',         unlocked:false, isNew:false },
    { id:121, cat:'extremo', icon:'⚔️', name:'Guerreiro',           desc:'Retorne após 7 dias parado',unlocked:false, isNew:false },
    { id:122, cat:'extremo', icon:'🛡️', name:'Blindado',            desc:'Nunca abandonou desafio',   unlocked:false, isNew:false },

    // 🎮 GAMER
    { id:123, cat:'gamer',   icon:'🎮', name:'Player 1',            desc:'Abra o app 10 vezes',       unlocked:false, isNew:false },
    { id:124, cat:'gamer',   icon:'🕹️', name:'Gamer',               desc:'Abra o app 50 vezes',       unlocked:false, isNew:false },
    { id:125, cat:'gamer',   icon:'👾', name:'Arcade',              desc:'Complete 3 hábitos num dia',unlocked:false, isNew:false },
    { id:126, cat:'gamer',   icon:'🎲', name:'Dado',                desc:'Surpresa aleatória',        unlocked:false, isNew:false },
    { id:127, cat:'gamer',   icon:'🏆', name:'High Score',          desc:'Maior XP do app',           unlocked:false, isNew:false },
    { id:128, cat:'gamer',   icon:'🔓', name:'Desbloqueou Tudo',    desc:'Todos os hábitos ativos',   unlocked:false, isNew:false },
    { id:129, cat:'gamer',   icon:'🎯', name:'Headshot',            desc:'Perfeito por 3 dias',       unlocked:false, isNew:false },
    { id:130, cat:'gamer',   icon:'🌐', name:'Online',              desc:'Use o app todo dia por 1 semana',unlocked:false,isNew:false},

    // 💰 RIQUEZA / PRODUTIVIDADE
    { id:131, cat:'prod',    icon:'💰', name:'Rico em Hábitos',     desc:'10 hábitos criados',        unlocked:false, isNew:false },
    { id:132, cat:'prod',    icon:'📈', name:'Crescimento',         desc:'XP aumentou 100% na semana',unlocked:false, isNew:false },
    { id:133, cat:'prod',    icon:'🗂️', name:'Organizado',          desc:'Organize seus hábitos',     unlocked:false, isNew:false },
    { id:134, cat:'prod',    icon:'⏰', name:'Pontual',             desc:'7 dias no mesmo horário',   unlocked:false, isNew:false },
    { id:135, cat:'prod',    icon:'📋', name:'Planejador',          desc:'Use o app de manhã 7x',     unlocked:false, isNew:false },
    { id:136, cat:'prod',    icon:'🗓️', name:'Agenda Cheia',        desc:'Todos hábitos definidos',   unlocked:false, isNew:false },

    // 🤝 SOCIAL
    { id:137, cat:'social',  icon:'🤝', name:'Parceiro',            desc:'Convide um amigo',          unlocked:false, isNew:false },
    { id:138, cat:'social',  icon:'💬', name:'Comunicador',         desc:'Compartilhe 3 conquistas',  unlocked:false, isNew:false },
    { id:139, cat:'social',  icon:'📣', name:'Influenciador',       desc:'Compartilhe 10 conquistas', unlocked:false, isNew:false },
    { id:140, cat:'social',  icon:'👥', name:'Comunidade',          desc:'Participe de grupo',        unlocked:false, isNew:false },
    { id:141, cat:'social',  icon:'🌟', name:'Inspiração',          desc:'Motive alguém',             unlocked:false, isNew:false },

    // 🧬 DNA / CIÊNCIA
    { id:142, cat:'ciencia', icon:'🧬', name:'DNA de Ouro',         desc:'Hábito por 66 dias (ciência)',unlocked:false,isNew:false },
    { id:143, cat:'ciencia', icon:'🔭', name:'Explorador',          desc:'Explore todas as telas',    unlocked:false, isNew:false },
    { id:144, cat:'ciencia', icon:'🧪', name:'Experimento',         desc:'Teste 5 tipos de hábito',   unlocked:false, isNew:false },
    { id:145, cat:'ciencia', icon:'⚗️', name:'Alquimista',          desc:'Transforme 3 hábitos ruins',unlocked:false, isNew:false },
    { id:146, cat:'ciencia', icon:'🔬', name:'Microscópio',         desc:'Analise seu progresso',     unlocked:false, isNew:false },

    // ✨ SECRETOS
    { id:147, cat:'secreto', icon:'❓', name:'???',                 desc:'Conquista secreta',         unlocked:false, isNew:false },
    { id:148, cat:'secreto', icon:'❓', name:'???',                 desc:'Conquista secreta',         unlocked:false, isNew:false },
    { id:149, cat:'secreto', icon:'❓', name:'???',                 desc:'Conquista secreta',         unlocked:false, isNew:false },
    { id:150, cat:'secreto', icon:'🌌', name:'Universo',            desc:'Conquiste tudo',            unlocked:false, isNew:false },
  ],
  selectedEmoji: '🧘',
  selectedColor: '#d4ff47',
};

const EMOJIS = ['🧘','🏋️','📚','💧','🥗','🎯','✍️','🎵','🌿','😴','🧠','🏃','🎨','💪','🌅'];
const COLORS  = ['#d4ff47','#8b5cf6','#ff6b6b','#38bdf8','#f59e0b','#ff6b35'];

// ===================================================
// ONBOARDING
// ===================================================
document.getElementById('ob-avatars').addEventListener('click', e => {
  const av = e.target.closest('.av-opt');
  if (!av) return;
  document.querySelectorAll('.av-opt').forEach(x => x.classList.remove('sel'));
  av.classList.add('sel');
  state.user.avatar = av.dataset.av;
});

function startApp() {
  const name = document.getElementById('ob-name').value.trim();
  if (name) state.user.name = name;
  launchApp();
}
function startAppQuick() { launchApp(); }

function launchApp() {
  document.getElementById('page-onboard').classList.add('done');
  document.getElementById('bottom-nav').style.display = 'flex';
  goPage('home');
  updateGreeting();
  renderAll();
}

function resetApp() {
  document.getElementById('page-onboard').classList.remove('done');
  document.getElementById('bottom-nav').style.display = 'none';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
}

// ===================================================
// NAVIGATION
// ===================================================
function goPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.page === id);
  });
  if (id === 'achieve')    renderAchieve();
  if (id === 'profile')    renderProfile();
  if (id === 'challenges') renderChallenges();
  if (id === 'home')       renderHome();
}

// ===================================================
// RENDER ALL
// ===================================================
function renderAll() {
  renderHome();
  buildEmojiSel();
  buildColorSel();
  buildDateStrip();
}

// ===================================================
// HOME
// ===================================================
function updateGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Bom dia! 🌅' : h < 18 ? 'Boa tarde! ☀️' : 'Boa noite! 🌙';
  document.getElementById('hh-greeting').textContent = g;
  document.getElementById('hh-name').textContent     = state.user.name;
  document.getElementById('home-avatar').textContent = state.user.avatar;
  document.getElementById('streak-num').textContent  = state.streak;
}

function renderHome() {
  updateGreeting();
  renderHabits();
  updateProgress();
  updateActiveChallenge();
}

function buildDateStrip() {
  const strip = document.getElementById('date-strip');
  const days  = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const today = new Date();
  strip.innerHTML = '';
  for (let i = -3; i <= 3; i++) {
    const d    = new Date(today);
    d.setDate(today.getDate() + i);
    const pill = document.createElement('div');
    const isToday  = i === 0;
    const hasDone  = i < 0 && Math.random() > 0.3;
    pill.className = 'd-pill' + (isToday ? ' today' : '') + (hasDone ? ' has-done' : '');
    pill.innerHTML = `
      <span class="d-dow">${days[d.getDay()]}</span>
      <span class="d-num">${d.getDate()}</span>
      <span class="d-dot"></span>
    `;
    strip.appendChild(pill);
  }
}

// ===================================================
// HABITS
// ===================================================
function isDoneToday(habit) {
  return habit.lastDone === todayStr();
}

function renderHabits() {
  const list = document.getElementById('habits-list');
  list.innerHTML = '';
  state.habits.forEach((h, i) => {
    const done = isDoneToday(h);
    const diff = getDifficulty(h.streak);
    const el   = document.createElement('div');
    el.className = 'h-card' + (done ? ' done' : '');
    el.style.setProperty('--hc', h.color);
    el.style.animationDelay = (i * 0.05) + 's';
    el.innerHTML = `
      <div class="h-icon">${h.icon}</div>
      <div class="h-info">
        <div class="h-name">${h.name}</div>
        <div class="h-meta">
          <span>🔥 ${h.streak} dias</span>
          ${h.goal ? `<span>·</span><span>${h.goal}</span>` : ''}
        </div>
        <div class="h-diff-badge" style="background:${diff.color}22;color:${diff.color};border:1px solid ${diff.color}44">
          ${diff.label} · +${diff.xp} XP
        </div>
      </div>
      <div class="h-check ${done ? 'locked' : ''}">${done ? '✓' : ''}</div>
    `;
    el.onclick = done
      ? () => showToast('✅ Já concluído hoje! Volte amanhã.')
      : () => completeHabit(h.id);
    if (done) el.style.cursor = 'default';
    list.appendChild(el);
  });
}

function completeHabit(id) {
  const today = todayStr();
  const h     = state.habits.find(x => x.id === id);
  if (h.lastDone === today) { showToast('✅ Já concluído hoje! Volte amanhã.'); return; }

  const diff   = getDifficulty(h.streak);
  h.lastDone   = today;
  h.streak++;
  state.xp    += diff.xp;

  fireConfetti();
  checkBadges();
  advanceChallengesForHabit(id);
  renderHabits();
  updateProgress();
  showToast(`+${diff.xp} XP — Nível ${diff.label}! 🔥`);
}

function updateProgress() {
  const today = todayStr();
  const done  = state.habits.filter(h => h.lastDone === today).length;
  const total = state.habits.length;
  const pct   = total ? Math.round(done / total * 100) : 0;
  const circ  = 2 * Math.PI * 38;

  document.getElementById('ring-prog').style.strokeDasharray  = circ;
  document.getElementById('ring-prog').style.strokeDashoffset = circ - (pct / 100) * circ;
  document.getElementById('ring-pct').textContent = pct + '%';
  document.getElementById('ring-of').textContent  = done + '/' + total;
  document.getElementById('mini-bar').style.width = pct + '%';
  document.getElementById('prog-sub').textContent =
    done === total && total > 0 ? '🎉 Tudo feito! Você arrasou!' :
    done === 0 ? 'Complete seus hábitos!' :
    `${done} de ${total} concluídos`;
}

// ===================================================
// CHALLENGES
// ===================================================
function advanceChallengesForHabit(habitId) {
  const today = todayStr();
  state.challenges.forEach(c => {
    if (!c.joined) return;
    // Só avança se o hábito vinculado foi o completado (ou se não tem vínculo específico)
    if (c.habitId !== null && c.habitId !== habitId) return;
    // Só 1 avanço por dia
    if (c.lastAdvanced === today) return;

    const nextIdx = c.doneDays.findIndex(d => !d);
    if (nextIdx === -1) return; // já concluído

    c.doneDays[nextIdx] = true;
    c.lastAdvanced      = today;
    state.xp           += 15;

    const doneCount = c.doneDays.filter(Boolean).length;
    if (doneCount === c.days) {
      unlockBadge(5);
      checkAllChallengesBadge();
      showToast(`🎉 Desafio "${c.name}" concluído!`);
      fireConfetti();
    }
  });
  updateActiveChallenge();
}

function updateActiveChallenge() {
  const active = state.challenges.find(c => c.joined);
  if (active) {
    const current = active.doneDays.filter(Boolean).length;
    document.getElementById('active-chall-name').textContent = active.name;
    document.getElementById('active-chall-sub').textContent  = `${current} de ${active.days} dias completos`;
    document.getElementById('active-chall-bar').style.width  = (current / active.days * 100) + '%';
  }
}

function renderChallenges() {
  const list      = document.getElementById('challenges-list');
  list.innerHTML  = '';
  const joined    = state.challenges.filter(c => c.joined);
  const available = state.challenges.filter(c => !c.joined);

  if (joined.length) {
    const t = document.createElement('div');
    t.className = 'chall-section-title'; t.textContent = 'Em andamento';
    list.appendChild(t);
    joined.forEach(c => list.appendChild(buildChallengeCard(c)));
  }
  const t2 = document.createElement('div');
  t2.className = 'chall-section-title'; t2.textContent = 'Disponíveis';
  list.appendChild(t2);
  available.forEach(c => list.appendChild(buildChallengeCard(c)));
}

function buildChallengeCard(c) {
  const current     = c.doneDays.filter(Boolean).length;
  const pct         = Math.round(current / c.days * 100);
  const today       = todayStr();
  const doneToday   = c.lastAdvanced === today;
  const complete    = current === c.days;
  const linkedHabit = c.habitId ? state.habits.find(h => h.id === c.habitId) : null;

  const dotsHTML = c.joined ? `
    <div class="cc-days-wrap">
      <div class="cc-days-label">
        <span>Progresso dos dias</span>
        <span>${current}/${c.days} dias</span>
      </div>
      <div class="cc-days-grid">
        ${c.doneDays.map((done, i) => {
          const isNext = !done && i === current;
          const cls    = done ? 'done' : isNext ? 'today' : '';
          return `<div class="cc-day-dot ${cls}" style="--dot-color:${c.color}" title="Dia ${i+1}">${done ? '✓' : i+1}</div>`;
        }).join('')}
      </div>
    </div>
  ` : '';

  const el = document.createElement('div');
  el.className = 'chall-card' + (c.joined ? ' joined' : '');
  el.innerHTML = `
    <div class="cc-top">
      <div class="cc-icon" style="background:${c.colorDim}">${c.icon}</div>
      <div class="cc-info">
        <div class="cc-name">${c.name}</div>
        <div class="cc-desc">${c.desc}</div>
      </div>
    </div>
    <div class="cc-pills">
      <div class="cc-pill hi">⏱ ${c.days} dias</div>
      ${c.joined
        ? `<div class="cc-pill">${complete ? '🎉 Completo!' : doneToday ? '✅ Feito hoje' : '⏳ Pendente hoje'}</div>`
        : `<div class="cc-pill">🏅 Badge exclusivo</div>`}
      ${c.joined && !complete ? `<div class="cc-pill hi">Em andamento</div>` : ''}
      ${complete ? `<div class="cc-pill hi" style="background:rgba(212,255,71,0.15);color:var(--lime)">🏆 Concluído!</div>` : ''}
    </div>
    ${c.joined ? `
      <div class="cc-progress">
        <div class="cc-prog-row"><span>Progresso geral</span><span>${pct}%</span></div>
        <div class="cc-prog-bar"><div class="cc-prog-fill" style="width:${pct}%;background:${c.color}"></div></div>
      </div>
      ${dotsHTML}
    ` : ''}
    ${c.joined && !complete ? `
      <div class="cc-how">
        <div class="cc-how-icon">💡</div>
        <div class="cc-how-text">
          ${linkedHabit
            ? `Complete o hábito <strong>${linkedHabit.icon} ${linkedHabit.name}</strong> hoje para avançar.`
            : `Complete qualquer hábito hoje para avançar este desafio.`}
          ${doneToday ? '<br><span style="color:var(--lime)">✅ Já avançou hoje!</span>' : ''}
        </div>
      </div>
    ` : ''}
    <button class="join-btn ${c.joined ? 'leave' : 'join'}" onclick="toggleChallenge(${c.id}, event)">
      ${c.joined ? (complete ? 'Reiniciar desafio' : 'Abandonar desafio') : '+ Participar do desafio'}
    </button>
  `;
  return el;
}

function toggleChallenge(id, e) {
  e.stopPropagation();
  const c = state.challenges.find(x => x.id === id);
  if (c.joined) {
    c.doneDays     = Array(c.days).fill(false);
    c.lastAdvanced = null;
    c.joined       = false;
  } else {
    c.joined = true;
    autoLinkHabit(c);
    state.xp += 50;
    fireConfetti();
    showToast('🎯 Desafio iniciado! Complete seu hábito diário para avançar.');
  }
  document.getElementById('chall-dot').classList.toggle('show', state.challenges.some(c => c.joined));
  renderChallenges();
  updateActiveChallenge();
}

function autoLinkHabit(challenge) {
  if (!state.habits.length) { challenge.habitId = null; return; }
  const match = state.habits.find(h => h.icon === challenge.icon);
  challenge.habitId = match ? match.id : state.habits[0].id;
}

// ===================================================
// ACHIEVEMENTS
// ===================================================
const BADGE_CATEGORIES = {
  streak:  { label: '🔥 Streak & Consistência' },
  habitos: { label: '✅ Hábitos Completos' },
  desafios:{ label: '🎯 Desafios' },
  xp:      { label: '⚡ XP & Nível' },
  horario: { label: '⏰ Horário' },
  move:    { label: '🏃 Movimento & Meditação' },
  mente:   { label: '📚 Mente & Criatividade' },
  saude:   { label: '💧 Saúde' },
  grow:    { label: '🌱 Crescimento Pessoal' },
  semana:  { label: '📅 Dias da Semana' },
  special: { label: '🏅 Especiais' },
  numeros: { label: '🔢 Marcos Numéricos' },
  estacao: { label: '🌦️ Clima & Estações' },
  extremo: { label: '🤯 Desafios Extremos' },
  gamer:   { label: '🎮 Gamer' },
  prod:    { label: '💼 Produtividade' },
  social:  { label: '🤝 Social' },
  ciencia: { label: '🧬 Ciência' },
  secreto: { label: '✨ Conquistas Secretas' },
};

function renderAchieve() {
  const today    = todayStr();
  const done     = state.habits.filter(h => h.lastDone === today).length;
  const unlocked = state.badges.filter(b => b.unlocked).length;

  document.getElementById('achieve-stats').innerHTML = `
    <div class="ast-card lime"><div class="ast-val">${state.streak}</div><div class="ast-lbl">🔥 Streak atual</div></div>
    <div class="ast-card"><div class="ast-val">${unlocked}/150</div><div class="ast-lbl">🏅 Badges ganhos</div></div>
    <div class="ast-card"><div class="ast-val">${state.xp}</div><div class="ast-lbl">⚡ XP total</div></div>
    <div class="ast-card"><div class="ast-val">${done}</div><div class="ast-lbl">✅ Hoje completos</div></div>
  `;

  const container = document.getElementById('badges-container');
  container.innerHTML = '';

  // Agrupa badges por categoria
  const grouped = {};
  state.badges.forEach(b => {
    if (!grouped[b.cat]) grouped[b.cat] = [];
    grouped[b.cat].push(b);
  });

  let globalIdx = 0;

  Object.entries(BADGE_CATEGORIES).forEach(([catKey, catInfo]) => {
    const badges = grouped[catKey];
    if (!badges) return;

    // Título da categoria
    const title = document.createElement('div');
    title.className = 'badge-category-title';
    title.textContent = catInfo.label;
    container.appendChild(title);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'badges-grid';

    badges.forEach(b => {
      const el  = document.createElement('div');
      const idx = globalIdx++;
      el.className = 'badge-item' + (b.unlocked ? ' unlocked' : '');
      el.innerHTML = `
        ${b.isNew && b.unlocked ? '<div class="badge-new">Novo!</div>' : ''}
        ${!b.unlocked ? '<div class="badge-locked-icon">🔒</div>' : ''}
        <div class="badge-icon">${b.unlocked || b.cat !== 'secreto' ? b.icon : '❓'}</div>
        <div class="badge-name">${b.unlocked || b.cat !== 'secreto' ? b.name : '???'}</div>
        <div class="badge-desc">${b.unlocked || b.cat !== 'secreto' ? b.desc : 'Conquista secreta'}</div>
      `;
      grid.appendChild(el);

      // Stagger animado com IntersectionObserver
      setTimeout(() => {
        el.classList.add('animate-in');
        el.style.animationDelay = ((idx % 9) * 0.055) + 's';
      }, 10);
    });

    container.appendChild(grid);
  });

  // Marca badges novos como vistos
  document.getElementById('badge-dot').classList.remove('show');
  state.badges.forEach(b => b.isNew = false);
}

function unlockBadge(idx) {
  if (state.badges[idx] && !state.badges[idx].unlocked) {
    state.badges[idx].unlocked = true;
    state.badges[idx].isNew    = true;
    document.getElementById('badge-dot').classList.add('show');
  }
}

function checkBadges() {
  const today = todayStr();
  const done  = state.habits.filter(h => h.lastDone === today).length;
  if (done >= 1)          unlockBadge(0);
  if (state.streak >= 3)  unlockBadge(1);
  if (state.streak >= 7)  unlockBadge(2);
  if (state.streak >= 21) unlockBadge(3);
  if (state.streak >= 30) unlockBadge(4);
  if (state.habits.length >= 5) unlockBadge(7);
}

function checkAllChallengesBadge() {
  const done = state.challenges.filter(c => c.doneDays.filter(Boolean).length === c.days).length;
  if (done >= 1) unlockBadge(5);
  if (done >= 3) unlockBadge(6);
  if (state.challenges.find(c => c.days === 30 && c.doneDays.filter(Boolean).length === 30)) unlockBadge(8);
}

// ===================================================
// PROFILE
// ===================================================
function renderProfile() {
  document.getElementById('profile-av').textContent   = state.user.avatar;
  document.getElementById('profile-name').textContent = state.user.name;
  const level  = Math.floor(state.xp / 300) + 1;
  const levels = ['Iniciante','Aprendiz','Construtor de Hábitos','Mestre','Lendário'];
  document.getElementById('profile-level').textContent =
    `⚡ Nível ${level} — ${levels[Math.min(level-1, levels.length-1)]}`;
  const xpInLevel = state.xp % 300;
  document.getElementById('xp-bar').style.width = (xpInLevel / 300 * 100) + '%';
  const joined = state.challenges.filter(c => c.joined).length;
  document.getElementById('profile-stats').innerHTML = `
    <div class="ps-item"><div class="ps-val">${state.streak}</div><div class="ps-lbl">Streak</div></div>
    <div class="ps-item"><div class="ps-val">${state.xp}</div><div class="ps-lbl">XP Total</div></div>
    <div class="ps-item"><div class="ps-val">${joined}</div><div class="ps-lbl">Desafios</div></div>
  `;
}

// ===================================================
// ADD HABIT
// ===================================================
function buildEmojiSel() {
  const el = document.getElementById('emoji-sel');
  el.innerHTML = '';
  EMOJIS.forEach(e => {
    const d = document.createElement('div');
    d.className = 'em-opt' + (e === state.selectedEmoji ? ' sel' : '');
    d.textContent = e;
    d.onclick = () => {
      document.querySelectorAll('.em-opt').forEach(x => x.classList.remove('sel'));
      d.classList.add('sel'); state.selectedEmoji = e;
    };
    el.appendChild(d);
  });
}

function buildColorSel() {
  const el = document.getElementById('color-sel');
  el.innerHTML = '';
  COLORS.forEach(c => {
    const d = document.createElement('div');
    d.className = 'col-opt' + (c === state.selectedColor ? ' sel' : '');
    d.style.background = c; d.dataset.color = c;
    d.onclick = () => {
      document.querySelectorAll('.col-opt').forEach(x => x.classList.remove('sel'));
      d.classList.add('sel'); state.selectedColor = c;
    };
    el.appendChild(d);
  });
}

function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
  setTimeout(() => document.getElementById('new-name').focus(), 300);
}

function closeModalBg(e) {
  if (e.target === document.getElementById('modal-overlay'))
    document.getElementById('modal-overlay').classList.remove('open');
}

function addHabit() {
  const name = document.getElementById('new-name').value.trim();
  if (!name) { document.getElementById('new-name').style.borderColor = 'var(--coral)'; return; }
  const goal = document.getElementById('new-goal').value.trim();
  state.habits.push({ id: Date.now(), name, icon: state.selectedEmoji, color: state.selectedColor, streak: 0, goal, lastDone: null });
  state.xp += 10;
  checkBadges();
  document.getElementById('new-name').value = '';
  document.getElementById('new-goal').value = '';
  document.getElementById('modal-overlay').classList.remove('open');
  renderHabits();
  updateProgress();
}

// ===================================================
// TOAST
// ===================================================
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
      background:var(--surface);border:1px solid var(--border2);
      color:var(--text);font-family:'Bricolage Grotesque',sans-serif;
      font-weight:600;font-size:0.88rem;padding:12px 20px;
      border-radius:100px;z-index:9997;white-space:nowrap;
      box-shadow:0 8px 32px rgba(0,0,0,0.4);transition:opacity 0.3s;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2200);
}

// ===================================================
// CONFETTI
// ===================================================
function fireConfetti() {
  const wrap   = document.getElementById('confetti');
  const colors = ['#d4ff47','#8b5cf6','#ff6b6b','#38bdf8','#f59e0b','#ffffff'];
  const shapes = ['50%','3px','0'];
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('div');
    const size = 6 + Math.random() * 8;
    p.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${shapes[Math.floor(Math.random()*shapes.length)]};
      left:${10+Math.random()*80}%;top:10%;
      animation:confettiFall ${0.9+Math.random()*0.8}s ease-in ${Math.random()*0.25}s both;
    `;
    wrap.appendChild(p);
    setTimeout(() => p.remove(), 1600);
  }
}

// ===================================================
// CSS extra para novos elementos (injetado dinamicamente)
// ===================================================
const extraCSS = document.createElement('style');
extraCSS.textContent = `
  .h-diff-badge {
    display:inline-flex;align-items:center;gap:4px;
    font-size:0.68rem;font-weight:600;
    padding:3px 8px;border-radius:100px;
    margin-top:5px;
  }
  .h-check.locked { cursor:not-allowed; }
  .cc-how {
    display:flex;align-items:flex-start;gap:10px;
    background:var(--surface2);border:1px solid var(--border);
    border-radius:12px;padding:12px 14px;margin-top:12px;
    font-size:0.8rem;color:var(--muted2);line-height:1.5;
  }
  .cc-how-icon { font-size:1rem;flex-shrink:0;margin-top:1px; }
  .cc-how-text strong { color:var(--text); }
`;
document.head.appendChild(extraCSS);

// ===================================================
// INIT
// ===================================================

// Verifica se o usuário perdeu dias — quebra streak de hábitos e desafios
function checkMissedDays() {
  const today = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;

  state.habits.forEach(h => {
    // Se o último registro não é hoje nem ontem, streak zera
    if (h.lastDone && h.lastDone !== today && h.lastDone !== yesterdayStr) {
      h.streak = 0;
    }
  });

  // Desafios: se não avançou ontem, perde o dia (não avança, mas não remove progresso)
  // O avanço simplesmente não acontece — a lógica de advanceChallengesForHabit já controla isso
}

document.getElementById('bottom-nav').style.display = 'none';
checkMissedDays();
