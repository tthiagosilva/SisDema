// js/protecao.js

// Verifica se o usuário está logado
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // Não logado: redireciona para login
    window.location.href = "login.html";
  } else {
    const tipo = localStorage.getItem("usuarioTipo");

    // Mostrar ou ocultar funcionalidades
    if (tipo !== "admin") {
      // Usuário comum: esconde área de visualização
      const visualizacao = document.getElementById("aba-visualizar");
      const botaoVisualizar = document.querySelector('[data-aba="visualizar"]');
      if (visualizacao) visualizacao.remove();
      if (botaoVisualizar) botaoVisualizar.remove();
    }

    // Adiciona botão de logout
    const header = document.querySelector("header");
    const btnLogout = document.createElement("button");
    btnLogout.textContent = "Sair";
    btnLogout.className = "btn-logout";
    btnLogout.addEventListener("click", () => {
      firebase.auth().signOut().then(() => {
        localStorage.clear();
        window.location.href = "login.html";
      });
    });
    header.appendChild(btnLogout);
  }
});
