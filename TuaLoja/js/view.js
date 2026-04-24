// ============================================================
//  VIEW — renderização da interface
//  Conceitos: getElementById, innerHTML, innerText,
//  createElement, appendChild, style (Aulas 10-11)
//  Nunca altera dados. Só apresenta.
// ============================================================

/**
 * Renderiza a lista de produtos disponíveis no DOM
 * @param {Array} produtos - Array de objetos produto com {id, nome, preco}
 * 
 * Cria elementos dinamicamente para cada produto:
 * - Nome e preço formatado
 * - Botão "Carrinho" com data-id para identificar o produto
 * Trata caso especial: lista vazia mostra mensagem informativa
 */
function renderizarProdutos(produtos) {
  // Obtém referência da lista e limpa conteúdo anterior
  let lista = document.getElementById("lista-produtos");
  lista.innerHTML = "";

  // Caso não existam produtos cadastrados
  if (produtos.length === 0) {
    let li = document.createElement("li");
    li.innerText = "Nenhum produto cadastrado ainda.";
    li.className = "item-vazio";
    lista.appendChild(li);
    return; // Sai da função para evitar processamento desnecessário
  }

  // Itera sobre cada produto para criar elementos DOM
  for (let i = 0; i < produtos.length; i++) {
    let p = produtos[i];

    // Cria o item da lista (container principal)
    let li = document.createElement("li");
    li.className = "produto-item";

    // Container para informações do produto (nome + preço)
    let divInfo = document.createElement("div");
    divInfo.className = "produto-info";

    // Elemento do nome do produto
    let spanNome = document.createElement("span");
    spanNome.innerText = p.nome;
    spanNome.className = "produto-nome";

    // Elemento do preço formatado para 2 casas decimais
    let spanPreco = document.createElement("span");
    spanPreco.innerText = "MT " + p.preco.toFixed(2);
    spanPreco.className = "produto-preco";

    // Monta a estrutura: divInfo contém nome e preço
    divInfo.appendChild(spanNome);
    divInfo.appendChild(spanPreco);

    // Botão para adicionar ao carrinho
    let btn = document.createElement("button");
    btn.innerText = "+ Carrinho";
    btn.className = "btn-add";
    btn.setAttribute("data-id", p.id); // Identificador para o evento de clique

    // Adiciona tudo ao item da lista
    li.appendChild(divInfo);
    li.appendChild(btn);
    
    // Adiciona o item completo à lista no DOM
    lista.appendChild(li);
  }
}

/**
 * Renderiza o carrinho de compras e atualiza os totais
 * @param {Array} carrinho - Array de objetos {produto, quantidade}
 * 
 * Para cada item no carrinho:
 * - Mostra nome do produto, quantidade e subtotal
 * - Botão de remover com data-id do produto
 * Após renderizar, atualiza automaticamente os totais na interface
 */
function renderizarCarrinho(carrinho) {
  let lista = document.getElementById("lista-carrinho");
  lista.innerHTML = ""; // Limpa renderização anterior

  // Verifica se o carrinho está vazio
  if (carrinho.length === 0) {
    let li = document.createElement("li");
    li.innerText = "O carrinho está vazio.";
    li.className = "item-vazio";
    lista.appendChild(li);
  } else {
    // Processa cada item do carrinho
    for (let i = 0; i < carrinho.length; i++) {
      let item = carrinho[i];

      // Container principal do item no carrinho
      let li = document.createElement("li");
      li.className = "carrinho-item";

      // Container para informações textuais (nome + quantidade)
      let divInfo = document.createElement("div");
      divInfo.className = "carrinho-info";

      // Nome do produto no carrinho
      let spanNome = document.createElement("span");
      spanNome.innerText = item.produto.nome;
      spanNome.className = "carrinho-nome";

      // Quantidade do produto no carrinho
      let spanQtd = document.createElement("span");
      spanQtd.innerText = "Qtd: " + item.quantidade;
      spanQtd.className = "carrinho-qtd";

      // Monta informações do produto
      divInfo.appendChild(spanNome);
      divInfo.appendChild(spanQtd);

      // Calcula e exibe o subtotal (preço × quantidade)
      let spanSub = document.createElement("span");
      let subtotal = item.produto.preco * item.quantidade;
      spanSub.innerText = "MT " + subtotal.toFixed(2);
      spanSub.className = "carrinho-subtotal";

      // Botão para remover item do carrinho
      let btnRemover = document.createElement("button");
      btnRemover.innerText = "✕";
      btnRemover.className = "btn-remover";
      btnRemover.setAttribute("data-id", item.produto.id); // Identificador para evento de remoção

      // Adiciona todos os elementos ao item do carrinho
      li.appendChild(divInfo);
      li.appendChild(spanSub);
      li.appendChild(btnRemover);
      
      // Adiciona o item à lista do carrinho
      lista.appendChild(li);
    }
  }

  // Atualiza os totais na interface após renderizar o carrinho
  document.getElementById("total-qtd").innerText = totalQuantidade();
  document.getElementById("total-valor").innerText = "MT " + totalValor().toFixed(2);
}

/**
 * Exibe mensagem de erro para um campo específico
 * @param {string} campoId - ID do campo de input (ex: "input-nome")
 * @param {string} mensagem - Texto do erro a ser exibido
 * 
 * Modifica visualmente o campo:
 * - Texto de erro em vermelho abaixo do input
 * - Borda do input fica vermelha para indicar erro
 */
function mostrarErro(campoId, mensagem) {
  let erro = document.getElementById(campoId + "-erro");
  erro.innerText = mensagem;
  erro.style.color = "red";
  document.getElementById(campoId).style.borderColor = "red";
}

/**
 * Limpa o estado de erro de um campo específico
 * @param {string} campoId - ID do campo de input
 * 
 * Remove a mensagem de erro e muda a borda para verde (válido)
 */
function limparErro(campoId) {
  let erro = document.getElementById(campoId + "-erro");
  erro.innerText = ""; // Remove texto de erro
  document.getElementById(campoId).style.borderColor = "green";
}

/**
 * Exibe uma mensagem global temporária na interface
 * @param {string} texto - Mensagem a ser exibida
 * @param {string} tipo - Tipo da mensagem: "sucesso" (verde) ou outro (vermelho)
 * 
 * A mensagem aparece por 3 segundos e depois desaparece automaticamente
 */
function mostrarMensagem(texto, tipo) {
  let msg = document.getElementById("mensagem-global");
  msg.innerText = texto;
  
  // Define cor baseada no tipo de mensagem
  msg.style.color = tipo === "sucesso" ? "green" : "red";
  msg.style.display = "block";
  
  // Temporizador para esconder a mensagem após 3 segundos
  setTimeout(function() {
    msg.style.display = "none";
  }, 3000);
}

/**
 * Limpa todos os campos do formulário de cadastro
 * 
 * Restaura:
 * - Valores dos inputs para vazio
 * - Cores das bordas para o padrão (cinza)
 * - Mensagens de erro são removidas
 */
function limparFormulario() {
  // Limpa valores dos campos
  document.getElementById("input-nome").value = "";
  document.getElementById("input-preco").value = "";
  
  // Restaura estilo padrão das bordas
  document.getElementById("input-nome").style.borderColor = "#ccc";
  document.getElementById("input-preco").style.borderColor = "#ccc";
  
  // Remove mensagens de erro
  document.getElementById("input-nome-erro").innerText = "";
  document.getElementById("input-preco-erro").innerText = "";
}