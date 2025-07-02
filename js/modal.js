
const modal = document.getElementById("modal-excluir");
const btnConfirmar = document.getElementById("btn-confirmar-exclusao");
const btnCancelar = document.getElementById("btn-cancelar-exclusao");

btnConfirmar.addEventListener("click", () => {
  if (demandaParaExcluir && cardParaExcluir) {
    database.ref("demandas/" + demandaParaExcluir).remove();
    cardParaExcluir.remove();
  }
  demandaParaExcluir = null;
  cardParaExcluir = null;
  modal.style.display = "none";
});

btnCancelar.addEventListener("click", () => {
  demandaParaExcluir = null;
  cardParaExcluir = null;
  modal.style.display = "none";
});

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  setTimeout(() => {
    toast.classList.remove("visivel");
  }, 2000);
}
