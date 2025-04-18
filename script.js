const STORAGE_KEY = 'govno_pyramid_levels';

function loadLevels() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      console.warn('Не удалось распарсить уровни, сбрасываем в дефолт.');
    }
  }
  // дефолтные уровни, если ничего нет в хранилище
  return [
    { level: 1, percent: 5, threshold: 100 },
    { level: 2, percent: 3, threshold: 200 },
    { level: 3, percent: 1, threshold: 500 },
  ];
}

function saveLevels(levels) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
}

function renderLevels(levels) {
  const container = document.getElementById('levels-container');
  container.innerHTML = '';
  levels.forEach(({ level, percent, threshold }) => {
    const div = document.createElement('div');
    div.textContent = `Уровень ${level}: ${percent}% при входе от ${threshold}`;
    container.append(div);
  });
}

// при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const levels = loadLevels();
  renderLevels(levels);
  
  document.getElementById('get-ref').addEventListener('click', () => {
    const addr = prompt('Ваш TON-адрес:');
    if (addr) {
      const ref = `${location.origin}${location.pathname}?ref=${encodeURIComponent(addr)}`;
      alert('Ваша реф-ссылка:\n' + ref);
    }
  });

  document.getElementById('logout').addEventListener('click', () => {
    // просто для примера — перезагрузить страницу без ref-параметра
    location.href = location.origin + location.pathname;
  });
});