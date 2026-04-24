// ============================================================
//  MODEL — gestão dos dados (produtos e carrinho)
//  Conceitos: variáveis, funções, arrays, loops (Aula 9)
//  localStorage: guardar e recuperar dados persistentes
//  Não acede ao DOM. Só lógica e dados.
// ============================================================

// Carregar dados do localStorage ao iniciar
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ── Guardar no localStorage ───────────────────────────────
function guardarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function guardarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ── Produtos ──────────────────────────────────────────────
function adicionarProduto(nome, preco) {
  let produto = {
    id: Date.now(),
    nome: nome,
    preco: parseFloat(preco)
  };
  produtos.push(produto);
  guardarProdutos();
  return produto;
}

function getProdutos() {
  return produtos;
}

// ── Carrinho ──────────────────────────────────────────────
function adicionarAoCarrinho(id) {
  let produto = null;
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].id === id) {
      produto = produtos[i];
    }
  }
  if (produto === null) return;

  let encontrado = false;
  for (let i = 0; i < carrinho.length; i++) {
    if (carrinho[i].produto.id === id) {
      carrinho[i].quantidade = carrinho[i].quantidade + 1;
      encontrado = true;
    }
  }
  if (!encontrado) {
    carrinho.push({ produto: produto, quantidade: 1 });
  }
  guardarCarrinho();
}

function removerDoCarrinho(id) {
  let novoCarrinho = [];
  for (let i = 0; i < carrinho.length; i++) {
    if (carrinho[i].produto.id !== id) {
      novoCarrinho.push(carrinho[i]);
    }
  }
  carrinho = novoCarrinho;
  guardarCarrinho();
}

function totalQuantidade() {
  let total = 0;
  for (let i = 0; i < carrinho.length; i++) {
    total = total + carrinho[i].quantidade;
  }
  return total;
}

function totalValor() {
  let total = 0;
  for (let i = 0; i < carrinho.length; i++) {
    total = total + (carrinho[i].produto.preco * carrinho[i].quantidade);
  }
  return total;
}

function encerrarCompra() {
  carrinho = [];
  guardarCarrinho();
}

function getCarrinho() {
  return carrinho;
}
