



const carregarRanking = () => {
  fetch("https://api.sheetbest.com/sheets/2701b9da-c13d-4ab3-a99b-a3202f29c6fa")
    .then(res => res.json())
    .then(data => {
      
      const rankingOrdenado = data
        .filter(entry => entry.nome && entry.tempo)
        .sort((a, b) => Number(a.pontos) - Number(b.tempo))
        .slice(0, 10); // top 10

      console.log(rankingOrdenado)

     
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