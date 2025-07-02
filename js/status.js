const seletorFiltro = document.getElementById('filtro-status');

seletorFiltro.addEventListener('change', () => {
  const filtro = seletorFiltro.value;
  const cards = document.querySelectorAll('.demanda');

  cards.forEach(card => {
    const status = card.querySelector('.status-topo strong')?.textContent;
    card.style.display = (filtro === 'Todos' || status === filtro) ? 'block' : 'none';
  });
});
