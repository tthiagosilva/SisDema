// auth.js - Corrigido com IDs corretos

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const erro = document.getElementById("erro-login");

  // Limpa mensagens de erro anteriores
  erro.textContent = "";

  firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(() => {
      erro.textContent = "";
      window.location.href = "index.html"; // Redireciona para o painel
    })
    .catch((err) => {
      erro.textContent = "Erro no login: " + traduzirErro(err.code);
    });
});

function traduzirErro(codigo) {
  switch (codigo) {
    case "auth/user-not-found": return "Usuário não encontrado.";
    case "auth/wrong-password": return "Senha incorreta.";
    case "auth/invalid-email": return "E-mail inválido.";
    case "auth/too-many-requests": return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/user-disabled": return "Usuário desabilitado.";
    default: return "Erro desconhecido: " + codigo;
  }
}

