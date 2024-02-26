document.addEventListener('DOMContentLoaded', () => {
  // Opções de cartas com seus nomes e imagens
  const cards = [
    {
      name: 'coelho',
      img: 'images/coelho.jpg'
    },
    {
      name: 'dog',
      img: 'images/dog.png'
    },
    {
      name: 'gato',
      img: 'images/gato.jpg'
    },
    {
      name: 'girafa',
      img: 'images/girafa.jpg'
    },
    {
      name: 'macaco',
      img: 'images/macaco.png'
    },
    {
      name: 'urso',
      img: 'images/urso.jpg'
    },
    {
      name: 'coelho',
      img: 'images/coelho.jpg'
    },
    {
      name: 'dog',
      img: 'images/dog.png'
    },
    {
      name: 'gato',
      img: 'images/gato.jpg'
    },
    {
      name: 'girafa',
      img: 'images/girafa.jpg'
    },
    {
      name: 'macaco',
      img: 'images/macaco.png'
    },
    {
      name: 'urso',
      img: 'images/urso.jpg'
    },
  ];

  // Embaralhar todas as cartas
  cards.sort(() => 0.5 - Math.random());

  // Recuperar elementos do DOM
  const board = document.querySelector('.board'); // o quadro de jogo
  const resultView = document.querySelector('#result'); // a visão do resultado
  const playButton = document.getElementById('playButton'); // o botão "Jogar!"
  const reloadButton = document.getElementById('reloadButton'); // o botão "Jogar Novamente !"
  let cardsChosen = []; // Armazena as cartas escolhidas
  let cardsChosenId = []; // Armazena os IDs das cartas escolhidas para identificação
  let cardsWon = []; // Armazena as cartas combinadas

  // Criar o quadro de cartas
  function createBoard() {
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/interroga.jpg'); // Todas as cartas começam com a face para baixo
      card.setAttribute('data-id', i); // Definir o ID da carta
      card.addEventListener('click', flipCard); // Adicionar evento de clique para virar a carta
      board.appendChild(card); // Adicionar a carta ao quadro de jogo
    }
  }

  // Checar se as cartas escolhidas formam um par
  function checkForMatch() {
    const cards = document.querySelectorAll('img'); // Selecionar todas as cartas
    const optionOneId = cardsChosenId[0]; // ID da primeira carta escolhida
    const optionTwoId = cardsChosenId[1]; // ID da segunda carta escolhida
    
    // Verificar se o mesmo cartão foi clicado duas vezes
    if(optionOneId === optionTwoId) {
      // Reverter as cartas selecionadas de volta para a face para baixo
      cards[optionOneId].setAttribute('src', 'images/interroga.jpg');
      cards[optionTwoId].setAttribute('src', 'images/interroga.jpg');
      alert('Você clicou na mesma imagem');
    }
    // Verificar se as imagens das duas cartas selecionadas são iguais
    else if (cardsChosen[0] === cardsChosen[1]) {
      // Se as imagens forem iguais, indicar uma combinação
      alert('Você encontrou uma combinação');
      // Alterar a imagem das cartas para mostrar a combinação
      cards[optionOneId].setAttribute('src', 'images/check.png');
      cards[optionTwoId].setAttribute('src', 'images/check.png');
      // Remover o evento de clique das cartas combinadas
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      // Adicionar o par de cartas combinadas à lista de cartas ganhas
      cardsWon.push(cardsChosen);
    } else {
      // Se as imagens forem diferentes, reverter as cartas de volta para a face para baixo
      cards[optionOneId].setAttribute('src', 'images/interroga.jpg');
      cards[optionTwoId].setAttribute('src', 'images/interroga.jpg');
      alert('Errou, tente novamente');
    }
    // Limpar as listas de cartas escolhidas e IDs
    cardsChosen = [];
    cardsChosenId = [];
    // Atualizar o placar mostrando quantos pares foram encontrados
    resultView.textContent = 'Pares Encontrados: ' + cardsWon.length;
    // Verificar se todas as cartas foram combinadas
    if  (cardsWon.length === cards.length / 2) {
      // Se todas as cartas foram combinadas, exibir uma mensagem de parabéns
      resultView.textContent = 'Parabéns! Você conseguiu encontrar todas as cartas';
      reloadButton.style.display = 'block'; // Exibir o botão "Jogar Novamente !" quando o jogo é concluído
    }
  }

  // Virar as cartas
  function flipCard() {
    let cardId = this.getAttribute('data-id'); // Obter o ID da carta clicada
    cardsChosen.push(cards[cardId].name); // Adicionar o nome da carta às cartas escolhidas
    cardsChosenId.push(cardId); // Adicionar o ID da carta às IDs das cartas escolhidas
    this.setAttribute('src', cards[cardId].img); // Mudar a imagem da carta para mostrar seu conteúdo
    if (cardsChosen.length === 2) {
      // Se duas cartas foram escolhidas, verificar se elas formam um par depois de um breve intervalo
      setTimeout(() => {
        checkForMatch();
      }, 500);
    }
  }

  // Adicionar evento de clique ao botão "Jogar!"
  playButton.addEventListener('click', () => {
    playButton.style.display = 'none'; // Esconder o botão após ser clicado

    // Mostrar imagens por 1 segundo ao clicar no botão "Jogar!"
    document.querySelectorAll('img').forEach(card => {
      card.setAttribute('src', cards[card.getAttribute('data-id')].img);
    });
    setTimeout(() => {
      // Esconder as cartas após 1 segundo
      document.querySelectorAll('img').forEach(card => {
        card.setAttribute('src', 'images/interroga.jpg');
      });
    }, 1000);
  });

  // Adicionar evento de clique ao botão "Jogar Novamente!"
  reloadButton.addEventListener('click', () => {
    location.reload(); // Recarregar a página para reiniciar o jogo
  });

  // Iniciar o jogo criando o quadro de cartas
  createBoard();
});
