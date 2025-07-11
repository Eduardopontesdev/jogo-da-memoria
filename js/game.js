const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timerSpan = document.querySelector(".timer");

const characters = [
  "jerry",
  "jessica",
  "meeseeks",
  "morty",
  "beth",
  "rick",
  "scroopy",
  "summer",
  "pessoa-passaro",
  "pickle-rick",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;

  return element;
};



function salvarPontuacao(nome, tempo) {
 fetch('https://api.sheetbest.com/sheets/2701b9da-c13d-4ab3-a99b-a3202f29c6fa', {
    method: 'POST',
    body: JSON.stringify({
      nome,
      tempo,
      data: new Date().toLocaleString()
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(msg => console.log('Pontuação salva com sucesso:', msg))
  .catch(err => console.error('Erro ao salvar:', err));
}

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disbaledCards = document.querySelectorAll(".disabled-card");

  if (disbaledCards.length === 20) {
    const nome = localStorage.getItem("player");
    const tempo = timerSpan.innerHTML;
    salvarPontuacao(nome, tempo);
    clearInterval(this.loop);
    setTimeout(() => {
      alert(`Fim do jogo! Parabens ${nome} você conseguiu terminar como tempo ${tempo}`);
    }, 500);
  }
};

const checkCard = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";

    checkEndGame();
    return;
  }

  setTimeout(() => {
    firstCard.classList.remove("reveal-card");
    secondCard.classList.remove("reveal-card");

    firstCard = "";
    secondCard = "";
  }, 500);
};

const revelCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }
  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;
    checkCard();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");
  front.style.backgroundImage = `url(../images/${character}.png)`;
  card.appendChild(front);
  card.appendChild(back);
  card.setAttribute("data-character", character);
  card.addEventListener("click", revelCard);
  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffleArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTime = () => {
  this.loop = setInterval(() => {
    const currentTime = +timerSpan.innerHTML;
    timerSpan.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  const playerName = localStorage.getItem("player");
  spanPlayer.innerHTML = playerName;
  loadGame();
  startTime();
};
