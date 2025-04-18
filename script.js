// Данные уровней: загружаем из localStorage или используем дефолт
const defaultLevels = [
  {level: 1, pct: 10, threshold: 100},
  {level: 2, pct: 5, threshold: 200},
  {level: 3, pct: 2, threshold: 300}
];
let levels = JSON.parse(localStorage.getItem('pyramidLevels')) || defaultLevels;

function renderLevels() {
  const container = document.getElementById('levels');
  container.innerHTML = '';
  levels.forEach(l => {
    const div = document.createElement('div');
    div.className = 'level';
    div.textContent = `Уровень ${l.level}: ${l.pct}% от порога ${l.threshold}`;
    container.appendChild(div);
  });
}

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('walletAddress');
  alert('Вы вышли');
});

document.getElementById('getRef').addEventListener('click', () => {
  const addr = localStorage.getItem('walletAddress') || 'адрес_пользователя';
  const url = `${location.origin}${location.pathname}?ref=${addr}`;
  prompt('Ваша реф-ссылка', url);
});

renderLevels();
