// ============================================================
//  VIEW — renderização da interface
//  Conceitos: getElementById, innerHTML, innerText,
//  createElement, appendChild, style (Aulas 10-11)
//  Nunca altera dados. Só apresenta.
// ============================================================

function renderizarProdutos(produtos) {
  let lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  if (produtos.length === 0) {
    let li = document.createElement("li");
    li.innerText = "Nenhum produto cadastrado ainda.";
    li.className = "item-vazio";
    lista.appendChild(li);
    return;
  }

  for (let i = 0; i < produtos.length; i++) {
    let p = produtos[i];

    let li = document.createElement("li");
    li.className = "produto-item";

    let divInfo = document.createElement("div");
    divInfo.className = "produto-info";

    let spanNome = document.createElement("span");
    spanNome.innerText = p.nome;
    spanNome.className = "produto-nome";

    let spanPreco = document.createElement("span");
    spanPreco.innerText = "MT " + p.preco.toFixed(2);
    spanPreco.className = "produto-preco";

    divInfo.appendChild(spanNome);
    divInfo.appendChild(spanPreco);

    let btn = document.createElement("button");
    btn.innerText = "+ Carrinho";
    btn.className = "btn-add";
    btn.setAttribute("data-id", p.id);

    li.appendChild(divInfo);
    li.appendChild(btn);
    lista.appendChild(li);
  }
}

function renderizarCarrinho(carrinho) {
  let lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    let li = document.createElement("li");
    li.innerText = "O carrinho está vazio.";
    li.className = "item-vazio";
    lista.appendChild(li);
  } else {
    for (let i = 0; i < carrinho.length; i++) {
      let item = carrinho[i];

      let li = document.createElement("li");
      li.className = "carrinho-item";

      let divInfo = document.createElement("div");
      divInfo.className = "carrinho-info";

      let spanNome = document.createElement("span");
      spanNome.innerText = item.produto.nome;
      spanNome.className = "carrinho-nome";

      let spanQtd = document.createElement("span");
      spanQtd.innerText = "Qtd: " + item.quantidade;
      spanQtd.className = "carrinho-qtd";

      divInfo.appendChild(spanNome);
      divInfo.appendChild(spanQtd);

      let spanSub = document.createElement("span");
      let subtotal = item.produto.preco * item.quantidade;
      spanSub.innerText = "MT " + subtotal.toFixed(2);
      spanSub.className = "carrinho-subtotal";

      let btnRemover = document.createElement("button");
      btnRemover.innerText = "✕";
      btnRemover.className = "btn-remover";
      btnRemover.setAttribute("data-id", item.produto.id);

      li.appendChild(divInfo);
      li.appendChild(spanSub);
      li.appendChild(btnRemover);
      lista.appendChild(li);
    }
  }

  // Actualizar totais
  document.getElementById("total-qtd").innerText = totalQuantidade();
  document.getElementById("total-valor").innerText = "MT " + totalValor().toFixed(2);
}

function mostrarErro(campoId, mensagem) {
  let erro = document.getElementById(campoId + "-erro");
  erro.innerText = mensagem;
  erro.style.color = "red";
  document.getElementById(campoId).style.borderColor = "red";
}

function limparErro(campoId) {
  let erro = document.getElementById(campoId + "-erro");
  erro.innerText = "";
  document.getElementById(campoId).style.borderColor = "green";
}

function mostrarMensagem(texto, tipo) {
  let msg = document.getElementById("mensagem-global");
  msg.innerText = texto;
  msg.style.color = tipo === "sucesso" ? "green" : "red";
  msg.style.display = "block";
  setTimeout(function() {
    msg.style.display = "none";
  }, 3000);
}

function limparFormulario() {
  document.getElementById("input-nome").value = "";
  document.getElementById("input-preco").value = "";
  document.getElementById("input-nome").style.borderColor = "#ccc";
  document.getElementById("input-preco").style.borderColor = "#ccc";
  document.getElementById("input-nome-erro").innerText = "";
  document.getElementById("input-preco-erro").innerText = "";
}
