// js/visualizacao.js (Firestore)

const lista = document.getElementById("lista-demandas");
const seletorFiltro = document.getElementById("filtro-status");

function formatarData(dataString) {
  const data = new Date(dataString);
  return data.toLocaleDateString("pt-BR") + " " + data.toLocaleTimeString("pt-BR");
}

function renderizarDemanda(doc) {
  const demanda = doc.data();
  const key = doc.id;

  let statusClasse = "";
  let iconeStatus = "";

  switch (demanda.status) {
    case "Pendente":
      statusClasse = "status-pendente";
      iconeStatus = "📌";
      break;
    case "Em andamento":
      statusClasse = "status-em-andamento";
      iconeStatus = "🔧";
      break;
    case "Resolvida":
      statusClasse = "status-resolvida";
      iconeStatus = "✅";
      break;
    default:
      statusClasse = "status-pendente";
      iconeStatus = "📌";
  }

  const card = document.createElement("div");
  card.className = `demanda ${statusClasse}`;
  card.innerHTML = `
    <div class="status-topo" id="status-topo-${key}">
      ${iconeStatus} <strong>${demanda.status}</strong>
    </div>
    <h3>${demanda.titulo}</h3>
    <p><strong>Descrição:</strong> ${demanda.descricao}</p>
    <p><strong>Solicitante:</strong> ${demanda.nome}</p>
    <p><strong>Ramal:</strong> ${demanda.ramal}</p>
    <p><strong>Data:</strong> ${formatarData(demanda.data)}</p>

    <label for="status-${key}"><strong>Status:</strong></label>
    <select id="status-${key}" data-id="${key}" class="select-status">
      <option value="Pendente" ${demanda.status === "Pendente" ? "selected" : ""}>📌 Pendente</option>
      <option value="Em andamento" ${demanda.status === "Em andamento" ? "selected" : ""}>🔧 Em andamento</option>
      <option value="Resolvida" ${demanda.status === "Resolvida" ? "selected" : ""}>✅ Resolvida</option>
    </select>

    <button class="btn-excluir" data-id="${key}">Excluir</button>
  `;

  lista.appendChild(card);

  // Atualizar status
  card.querySelector(".select-status").addEventListener("change", (e) => {
    const novoStatus = e.target.value;
    db.collection("demandas").doc(key).update({ status: novoStatus });
    card.className = `demanda status-${novoStatus.toLowerCase().replace(" ", "-")}`;
    document.getElementById(`status-topo-${key}`).innerHTML = `${iconeStatus} <strong>${novoStatus}</strong>`;
  });

  // Excluir demanda
  card.querySelector(".btn-excluir").addEventListener("click", () => {
    const confirmar = confirm("❗ Tem certeza que deseja excluir esta demanda?");
    if (confirmar) {
      db.collection("demandas").doc(key).delete();
      card.remove();
    }
  });
}

// Carregar todas as demandas em tempo real
function carregarDemandas(filtro = "Todos") {
  lista.innerHTML = "";

  db.collection("demandas").orderBy("data", "desc").onSnapshot((snapshot) => {
    lista.innerHTML = "";
    snapshot.forEach((doc) => {
      const status = doc.data().status;
      if (filtro === "Todos" || filtro === status) {
        renderizarDemanda(doc);
      }
    });
  });
}

seletorFiltro.addEventListener("change", () => {
  carregarDemandas(seletorFiltro.value);
});

// Inicialização
carregarDemandas();
