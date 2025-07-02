const linksAbas = document.querySelectorAll('.aba');
const abasConteudo = document.querySelectorAll('.aba-conteudo');

linksAbas.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const abaSelecionada = link.dataset.aba;

    linksAbas.forEach(l => l.classList.remove('ativo'));
    link.classList.add('ativo');

    abasConteudo.forEach(secao => {
      secao.style.display = secao.id === `aba-${abaSelecionada}` ? 'block' : 'none';
    });
  });
});
