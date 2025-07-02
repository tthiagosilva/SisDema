// js/registro.js (adaptado para Firestore)

const form = document.getElementById("form-demanda");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const ramal = document.getElementById("ramal").value.trim();
  const usuarioId = firebase.auth().currentUser.uid;

  if (nome && titulo && descricao && ramal) {
    const novaDemanda = {
      nome,
      titulo,
      descricao,
      ramal,
      status: "Pendente",
      data: new Date().toISOString(),
      solicitanteId: usuarioId
    };

    db.collection("demandas")
      .add(novaDemanda)
      .then(() => {
        form.reset();
        const toast = document.getElementById("toast");
        toast.classList.add("visivel");
        setTimeout(() => {
          toast.classList.remove("visivel");
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao registrar demanda:", error);
      });
  }
});
