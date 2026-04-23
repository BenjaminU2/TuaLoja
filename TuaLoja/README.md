# TG1 — Carrinho de Compras (Loja de Comércio Electrónico)

**Disciplina:** Aplicações e Serviços de Internet (ASI)  
**Docente:** Ivan Ruby  
**Instituição:** ISUTC — 2026  
**Padrão:** MVC (Modelo-Visão-Controlador)

---

## Descrição

Aplicação web para gestão de carrinho de compras, desenvolvida com HTML, CSS e JavaScript puro, seguindo o padrão MVC conforme ensinado nas aulas.

## Funcionalidades

- Adicionar produtos (Nome e Preço) com validação de campos
- Visualizar lista de produtos disponíveis
- Adicionar produtos ao carrinho (acumula quantidade)
- Ver total de itens e somatório do valor no carrinho
- Remover produtos do carrinho individualmente
- Botão "Encerrar Compra" que reinicia o carrinho

## Estrutura MVC

```
index.html          — estrutura HTML da interface
js/
  model.js          — MODELO: dados e lógica (produtos, carrinho, totais)
  view.js           — VISÃO: renderização DOM (createElement, appendChild, innerText)
  controller.js     — CONTROLADOR: eventos (addEventListener, event.preventDefault)
```

## Conceitos das Aulas Aplicados

| Conceito | Aula | Onde é usado |
|---|---|---|
| Variáveis (`let`, `const`) | Aula 9 | model.js — produtos, carrinho |
| Funções | Aula 9 | Todas as funções do model e view |
| Arrays e loops `for` | Aula 9 | Iteração sobre produtos e carrinho |
| `getElementById`, `innerHTML`, `innerText` | Aula 10 | view.js |
| `createElement`, `appendChild` | Aula 10 | view.js — renderização de listas |
| `addEventListener` | Aula 10 | controller.js — todos os eventos |
| `event.preventDefault()` | Aula 11 | controller.js — formulário |
| Validação de formulário | Aula 11 | controller.js + view.js |
| Feedback visual (borda verde/vermelha) | Aula 11 | view.js — mostrarErro / limparErro |

## Como executar localmente

Abrir o ficheiro `index.html` directamente no browser.

## Link GitHub Pages

> Após configurar o repositório, o link estará disponível em:  
> `https://<utilizador>.github.io/<repositorio>/`
