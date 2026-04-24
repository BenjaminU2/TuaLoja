// ============================================================
//  CONTROLLER — liga o Model ao View, trata eventos
//  Conceitos: addEventListener, event.preventDefault (Aulas 10-11)
//  Melhorias: modal de detalhes, sidebar melhorado
// ============================================================

function actualizarVista() {
  renderizarProdutos(getProdutos());
  renderizarCarrinho(getCarrinho());
}

function inicializar() {

  // ── Abrir/fechar carrinho sidebar ───────────────────────
  let btnCarrinho = document.getElementById("btn-carrinho");
  let sidebar = document.getElementById("carrinho-sidebar");
  let overlayCarrinho = document.getElementById("overlay-carrinho");

  btnCarrinho.addEventListener("click", function() {
    sidebar.classList.toggle("aberto");
    if (sidebar.classList.contains("aberto")) {
      overlayCarrinho.removeAttribute("hidden");
    } else {
      overlayCarrinho.setAttribute("hidden", "");
    }
  });

  let btnFechar = document.getElementById("fechar-carrinho");
  btnFechar.addEventListener("click", function() {
    sidebar.classList.remove("aberto");
    overlayCarrinho.setAttribute("hidden", "");
  });
  
  // Fechar sidebar clicando no overlay
  overlayCarrinho.addEventListener("click", function() {
    sidebar.classList.remove("aberto");
    overlayCarrinho.setAttribute("hidden", "");
  });

  // ── Modal de detalhes do produto ────────────────────────
  let modalProduto = document.getElementById("modal-produto");
  let overlayModal = document.getElementById("overlay-modal");
  let fecharModalProduto = document.getElementById("fechar-modal-produto");

  fecharModalProduto.addEventListener("click", function() {
    modalProduto.setAttribute("hidden", "");
    overlayModal.setAttribute("hidden", "");
  });
  
  overlayModal.addEventListener("click", function() {
    modalProduto.setAttribute("hidden", "");
    overlayModal.setAttribute("hidden", "");
  });

  // ── Evento: submeter formulário de produto ────────────────
  let form = document.getElementById("form-produto");
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("input-nome").value;
    let preco = document.getElementById("input-preco").value;

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

  // ── Evento: clique nos produtos (delegação de eventos) ────
  let listaProdutos = document.getElementById("lista-produtos");
  listaProdutos.addEventListener("click", function(event) {
    // Se clicar no botão "+ Carrinho"
    if (event.target.className === "btn-add") {
      let id = parseInt(event.target.getAttribute("data-id"));
      adicionarAoCarrinho(id);
      actualizarVista();
      return;
    }
    
    // Se clicar no nome do produto (abrir modal)
    if (event.target.className === "produto-nome" || event.target.className === "produto-nome-link") {
      let id = parseInt(event.target.closest("li").querySelector(".btn-add").getAttribute("data-id"));
      let produtos = getProdutos();
      let produtoSelecionado = null;
      
      // Encontrar o produto pelo ID
      for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === id) {
          produtoSelecionado = produtos[i];
          break;
        }
      }
      
      if (produtoSelecionado) {
        renderizarModalProduto(produtoSelecionado);
      }
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

  // Renderizar estado inicial
  actualizarVista();
}

// ── Função para adicionar produto diretamente do modal ────────
function adicionarProdutoDoModal(id) {
  adicionarAoCarrinho(id);
  actualizarVista();
  mostrarMensagem("Produto adicionado ao carrinho!", "sucesso");
  
  // Fechar o modal
  document.getElementById("modal-produto").setAttribute("hidden", "");
  document.getElementById("overlay-modal").setAttribute("hidden", "");
}

// Inicializar quando a página carregar
window.addEventListener("load", inicializar);