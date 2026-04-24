// ============================================================
//  CONTROLLER — liga o Model ao View, trata eventos
//  Conceitos: addEventListener, event.preventDefault (Aulas 10-11)
// ============================================================

function actualizarVista() {
  renderizarProdutos(getProdutos());
  renderizarCarrinho(getCarrinho());
}

function inicializar() {

  // ── Evento: submeter formulário de produto ────────────────
  let form = document.getElementById("form-produto");
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("input-nome").value;
    let preco = document.getElementById("input-preco").value;

    // Validação (Aula 11 — Passo 3 e 4)
    let valido = true;

    if (nome === "") {
      mostrarErro("input-nome", "O nome do produto não pode estar vazio.");
      valido = false;
    } else {
      limparErro("input-nome");
    }

    if (preco === "" || isNaN(preco) || parseFloat(preco) <= 0) {
      mostrarErro("input-preco", "Insira um preço válido e maior que zero.");
      valido = false;
    } else {
      limparErro("input-preco");
    }

    if (!valido) return;

    adicionarProduto(nome, preco);
    limparFormulario();
    actualizarVista();
    mostrarMensagem("Produto adicionado e guardado com sucesso!", "sucesso");
  });

  // ── Evento: clique em "+ Carrinho" (delegação de eventos) ─
  let listaProdutos = document.getElementById("lista-produtos");
  listaProdutos.addEventListener("click", function(event) {
    if (event.target.className === "btn-add") {
      let id = parseInt(event.target.getAttribute("data-id"));
      adicionarAoCarrinho(id);
      actualizarVista();
    }
  });

  // ── Evento: clique em "✕" para remover do carrinho ────────
  let listaCarrinho = document.getElementById("lista-carrinho");
  listaCarrinho.addEventListener("click", function(event) {
    if (event.target.className === "btn-remover") {
      let id = parseInt(event.target.getAttribute("data-id"));
      removerDoCarrinho(id);
      actualizarVista();
    }
  });

  // ── Evento: botão "Encerrar Compra" ───────────────────────
  let btnEncerrar = document.getElementById("btn-encerrar");
  btnEncerrar.addEventListener("click", function() {
    if (totalQuantidade() === 0) {
      mostrarMensagem("O carrinho já está vazio.", "erro");
      return;
    }
    encerrarCompra();
    actualizarVista();
    mostrarMensagem("Compra encerrada! Carrinho reiniciado.", "sucesso");
  });

  // Renderizar estado inicial (dados vindos do localStorage)
  actualizarVista();
}

// Inicializar quando a página carregar
window.addEventListener("load", inicializar);
