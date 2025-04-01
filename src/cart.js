// Exemplo de dados de produtos
const produtos = [
    { id: 1, nome: 'Produto 1', preco: 20.00 },
    { id: 2, nome: 'Produto 2', preco: 35.00 },
    { id: 3, nome: 'Produto 3', preco: 50.00 }
  ];
  
  // Carrinho de compras
  let carrinho = [];
  
  // Função para adicionar item ao carrinho
  function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
      carrinho.push(produto);
      atualizarCarrinho();
    }
  }
  
  // Função para atualizar a exibição do carrinho
  function atualizarCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    carrinhoElement.innerHTML = '';
  
    let total = 0;
  
    carrinho.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('item-carrinho');
      itemElement.innerHTML = `
        <span>${item.nome}</span>
        <span>R$ ${item.preco.toFixed(2)}</span>
      `;
      carrinhoElement.appendChild(itemElement);
      total += item.preco;
    });
  
    document.getElementById('total').innerText = total.toFixed(2);
  }
  
  // Função para finalizar compra
  document.getElementById('finalizar').addEventListener('click', () => {
    if (carrinho.length > 0) {
      alert(`Compra finalizada! Total: R$ ${document.getElementById('total').innerText}`);
      carrinho = []; // Limpar o carrinho após finalizar
      atualizarCarrinho(); // Atualizar visualmente o carrinho
    } else {
      alert('O carrinho está vazio!');
    }
  });
  
  // Exemplo de adicionar produtos ao carrinho
  adicionarAoCarrinho(1);
  adicionarAoCarrinho(2);
  adicionarAoCarrinho(3);
  