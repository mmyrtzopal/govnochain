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
  return [
    { level: 1, percent: 5, threshold: 100 },
    { level: 2, percent: 3, threshold: 200 },
    { level: 3, percent: 1, threshold: 500 },
  ];
}

function saveLevels(levels) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(levels));
}

function renderAdmin(levels) {
  const tbl = document.getElementById('levels-table');
  tbl.innerHTML = '';
  levels.forEach((l, i) => {
    const row = tbl.insertRow();
    row.insertCell().textContent = l.level;
    const pct = row.insertCell();
    const th  = row.insertCell();
    pct.innerHTML = `<input type="number" value="\${l.percent}" data-index="\${i}" class="pct">`;
    th.innerHTML  = `<input type="number" value="\${l.threshold}" data-index="\${i}" class="thr">`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let levels = loadLevels();
  renderAdmin(levels);

  // переписываем объект при изменении полей
  document.getElementById('levels-table').addEventListener('input', e => {
    const idx = +e.target.dataset.index;
    if (e.target.classList.contains('pct')) {
      levels[idx].percent = +e.target.value;
    }
    if (e.target.classList.contains('thr')) {
      levels[idx].threshold = +e.target.value;
    }
  });

  document.getElementById('save-btn').addEventListener('click', () => {
    saveLevels(levels);
    alert('Уровни сохранены!');
  });

  document.getElementById('logout').addEventListener('click', () => {
    location.href = 'index.html';
  });
});