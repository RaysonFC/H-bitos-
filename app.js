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
  streak: 5,
  xp: 680,
  habits: [
    { id: 1, name: 'Meditar',    icon: '🧘', color: '#d4ff47', streak: 5,  goal: '10 minutos', lastDone: null },
    { id: 2, name: 'Exercitar',  icon: '🏋️', color: '#8b5cf6', streak: 8,  goal: '30 minutos', lastDone: null },
    { id: 3, name: 'Ler',        icon: '📚', color: '#38bdf8', streak: 22, goal: '20 páginas',  lastDone: null },
    { id: 4, name: 'Beber água', icon: '💧', color: '#f59e0b', streak: 3,  goal: '2 litros',    lastDone: null },
  ],
  challenges: [
    { id: 1, name: 'Meditação 7 Dias',     desc: 'Medite todos os dias por uma semana',           icon: '🧘', days: 7,  doneDays: [true,true,true,false,false,false,false], lastAdvanced: null, color: '#8b5cf6', colorDim: 'rgba(139,92,246,0.15)', joined: true,  habitId: 1 },
    { id: 2, name: 'Hábito de 21 Dias',    desc: 'O ciclo completo para formar um novo hábito',   icon: '🔄', days: 21, doneDays: Array(21).fill(false),                   lastAdvanced: null, color: '#38bdf8', colorDim: 'rgba(56,189,248,0.15)',  joined: false, habitId: null },
    { id: 3, name: 'Transformação 30 Dias',desc: 'Mude sua vida em um mês com consistência',      icon: '🚀', days: 30, doneDays: Array(30).fill(false),                   lastAdvanced: null, color: '#f59e0b', colorDim: 'rgba(245,158,11,0.15)',  joined: false, habitId: null },
    { id: 4, name: 'Guerreiro do Sono',    desc: 'Durma 8 horas por 7 dias seguidos',             icon: '😴', days: 7,  doneDays: Array(7).fill(false),                    lastAdvanced: null, color: '#ff6b6b', colorDim: 'rgba(255,107,107,0.15)', joined: false, habitId: null },
    { id: 5, name: 'Hidratação Total',     desc: '2L de água por dia durante 21 dias',            icon: '💧', days: 21, doneDays: Array(21).fill(false),                   lastAdvanced: null, color: '#d4ff47', colorDim: 'rgba(212,255,71,0.12)',  joined: false, habitId: null },
  ],
  badges: [
    { id:1, icon:'🌱', name:'Primeiro Passo', desc:'Complete 1 hábito',       unlocked:true,  isNew:false },
    { id:2, icon:'🔥', name:'Em Chamas',      desc:'3 dias de streak',        unlocked:true,  isNew:false },
    { id:3, icon:'⚡', name:'Imparável',       desc:'7 dias seguidos',         unlocked:true,  isNew:true  },
    { id:4, icon:'💎', name:'Diamante',        desc:'21 dias de streak',       unlocked:false, isNew:false },
    { id:5, icon:'👑', name:'Campeão',         desc:'30 dias de streak',       unlocked:false, isNew:false },
    { id:6, icon:'🎯', name:'Focado',          desc:'Complete um desafio',     unlocked:false, isNew:false },
    { id:7, icon:'🏆', name:'Lendário',        desc:'3 desafios completos',    unlocked:false, isNew:false },
    { id:8, icon:'🌟', name:'Inspiração',      desc:'Crie 5 hábitos',          unlocked:false, isNew:false },
    { id:9, icon:'🚀', name:'Decolar',         desc:'Transformação 30 dias',   unlocked:false, isNew:false },
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
function renderAchieve() {
  const today   = todayStr();
  const done    = state.habits.filter(h => h.lastDone === today).length;
  const unlocked = state.badges.filter(b => b.unlocked).length;

  document.getElementById('achieve-stats').innerHTML = `
    <div class="ast-card lime"><div class="ast-val">${state.streak}</div><div class="ast-lbl">🔥 Streak atual</div></div>
    <div class="ast-card"><div class="ast-val">${unlocked}</div><div class="ast-lbl">🏅 Badges ganhos</div></div>
    <div class="ast-card"><div class="ast-val">${state.xp}</div><div class="ast-lbl">⚡ XP total</div></div>
    <div class="ast-card"><div class="ast-val">${done}</div><div class="ast-lbl">✅ Hoje completos</div></div>
  `;

  const grid = document.getElementById('badges-grid');
  grid.innerHTML = '';
  state.badges.forEach(b => {
    const el = document.createElement('div');
    el.className = 'badge-item' + (b.unlocked ? ' unlocked' : '');
    el.innerHTML = `
      ${b.isNew && b.unlocked ? '<div class="badge-new">Novo!</div>' : ''}
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
    `;
    if (b.unlocked) el.style.animation = 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both';
    grid.appendChild(el);
  });

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
document.getElementById('bottom-nav').style.display = 'none';
