function deposit() {
  const amt = document.getElementById('amount').value;
  alert('Транзакция на вложение ' + amt + ' GOVNO отправлена (эмуляция)');
}
function claim() {
  alert('Вы запросили вывод прибыли (эмуляция)');
}
function copyRef() {
  const addr = "kQA0te5_NXqym-CZam9cHHDF1k-gI1dv_FUokrRsjsbuvHll";
  const ref = `${location.origin}${location.pathname}?ref=${addr}`;
  navigator.clipboard.writeText(ref);
  alert('Скопировано: ' + ref);
}