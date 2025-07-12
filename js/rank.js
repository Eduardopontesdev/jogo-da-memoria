



const carregarRanking = () => {
  fetch("https://api.sheetbest.com/sheets/2701b9da-c13d-4ab3-a99b-a3202f29c6fa")
    .then(res => res.json())
    .then(data => {
      
      const rankingOrdenado = data
        .filter(entry => entry.nome && entry.tempo)
        .sort((a, b) => Number(a.tempo) - Number(b.tempo))
        .slice(0, 1000); // top 10

        const spanJogada = document.querySelector('.spanJogadas')
      spanJogada.innerHTML = rankingOrdenado.length

     
      const lista = document.querySelector("#ranking");
      lista.innerHTML = "";

      rankingOrdenado.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${item.nome} - ${item.tempo} segundos`;
        lista.appendChild(li);
      });
    })
    .catch(err => console.error("Erro ao carregar ranking:", err));
}


window.onload = () => { 
  carregarRanking();
};