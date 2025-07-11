const input = document.querySelector('.login__input')
const button = document.querySelector('.login__button')
const form = document.querySelector('.login-form')

const carregarTop5 = () => {
  fetch("https://api.sheetbest.com/sheets/2701b9da-c13d-4ab3-a99b-a3202f29c6fa")
    .then(res => res.json())
    .then(data => {
      
      const top5 = data
        .filter(entry => entry.nome && entry.tempo) 
        .sort((a, b) => Number(a.tempo) - Number(b.tempo))
        .slice(0, 5); 

      
      const ul = document.querySelector("#melhores-colocados");
      ul.innerHTML = ""; 

      top5.forEach((jogador, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${jogador.nome} - ${jogador.tempo}`;
        ul.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar Top 5:", err);
      document.querySelector("#melhores-colocados").innerHTML = "<li>Erro ao carregar ranking.</li>";
    });
}


const validaInput = ({target}) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled')
        return
    }

    button.setAttribute('disabled', '')
}

const gravaNome = (event) => {
    event.preventDefault()
    localStorage.setItem('player', input.value)
    window.location = 'pages/game.html'

}

input.addEventListener('input', validaInput)
form.addEventListener('submit', gravaNome)

window.onload = () => {
    carregarTop5();
}