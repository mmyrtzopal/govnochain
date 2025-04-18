const defaultLevels = [
  {level: 1, pct: 10, threshold: 100},
  {level: 2, pct: 5, threshold: 200},
  {level: 3, pct: 2, threshold: 300}
];
let levels = JSON.parse(localStorage.getItem('pyramidLevels')) || defaultLevels;

const form = document.getElementById('levelsForm');
function renderForm() {
  form.innerHTML = '';
  levels.forEach((l, i) => {
    const container = document.createElement('div');
    container.className = 'level';
    container.innerHTML = `
      <label>Уровень ${l.level}:<br>
        Процент: <input type="number" data-index="${i}" class="pct" value="${l.pct}"><br>
        Порог: <input type="number" data-index="${i}" class="thr" value="${l.threshold}">
      </label>
    `;
    form.appendChild(container);
  });
}
document.getElementById('save').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.pct').forEach(el => {
    levels[el.dataset.index].pct = +el.value;
  });
  document.querySelectorAll('.thr').forEach(el => {
    levels[el.dataset.index].threshold = +el.value;
  });
  localStorage.setItem('pyramidLevels', JSON.stringify(levels));
  alert('Сохранено');
});
document.getElementById('logoutAdmin').addEventListener('click', () => {
  localStorage.removeItem('walletAddress');
  alert('Вышли из админки');
});
renderForm();
