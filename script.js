const STORAGE_KEY = 'govno_pyramid_levels';

function loadLevels() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      console.warn('Не удалось распарсить уровни');
    }
  }
  return [
    { level: 1, percent: 5, threshold: 100 },
    { level: 2, percent: 3, threshold: 200 },
    { level: 3, percent: 1, threshold: 500 },
  ];
}

function renderLevels(levels) {
  const container = document.getElementById('levels-container');
  container.innerHTML = '';
  levels.forEach(({ level, percent, threshold }) => {
    const div = document.createElement('div');
    div.className = 'level';
    div.textContent = `🥇 Уровень ${level}: ${percent}% при входе от ${threshold} GOVNO`;
    container.append(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const levels = loadLevels();
  renderLevels(levels);

  document.getElementById('get-ref').onclick = () => {
    const addr = prompt('Введите ваш TON адрес');
    if (addr) {
      const link = `${location.origin}${location.pathname}?ref=${addr}`;
      alert('Ваша реф-ссылка: ' + link);
    }
  };

  document.getElementById('logout').onclick = () => {
    localStorage.removeItem('walletAddress');
    location.reload();
  };
});