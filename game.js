const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Você acorda em um lugar estranho e vê um pote de gosma azul perto de você',
    options: [
      {
        text: 'Pegar o pote de gosma azul',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Ignorar o pote',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Você se aventura em busca de respostas para onde você está quando se depara com um comerciante',
    options: [
      {
        text: 'Troque a gosma por uma espada',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Troque a gosma por um escudo',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignorar o mercador',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Depois de deixar o comerciante, você começa a se sentir cansado e se depara com uma pequena cidade ao lado de um castelo de aparência perigosa.',
    options: [
      {
        text: 'Explorar o castelo',
        nextText: 4
      },
      {
        text: 'Procurar um quarto para dormir na cidade',
        nextText: 5
      },
      {
        text: 'encontre um pouco de feno em um estábulo para dormir',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Você está tão cansado que adormece enquanto explora o castelo e é morto por algum monstro terrível durante o sono.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Sem dinheiro para comprar um quarto, você invade a pousada mais próxima e adormece. Depois de algumas horas de sono, o dono da pousada o encontra e manda o guarda da cidade trancá-lo em uma cela.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Você acorda bem descansado e cheio de energia pronto para explorar o castelo próximo.',
    options: [
      {
        text: 'Explorar o castelo',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Ao explorar o castelo, você se depara com um monstro horrível em seu caminho.',
    options: [
      {
        text: 'Tentar fugir',
        nextText: 8
      },
      {
        text: 'Atacar com sua espada',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Se esconder atrás de seu escudo',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Jogar o jarro de gosma azul no monstro',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Suas tentativas de correr são em vão e o monstro pega facilmente.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Você tolamente pensou que este monstro poderia ser morto com uma única espada.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'O monstro riu quando você se escondeu atrás de seu escudo e comeu você.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Você jogou seu pote de gosma no monstro e ele explodiu. Depois que a poeira baixou, você viu que o monstro foi destruído. Vendo sua vitória, você decide reivindicar este castelo como seu e viver o resto de seus dias lá.',
    options: [
      {
        text: 'Parabéns. Jogar de novo.',
        nextText: -1
      }
    ]
  }
]

startGame()