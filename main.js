const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");
const grid = document.getElementById("comicGrid");
const searchInput = document.getElementById("searchInput"); // pode ser undefined se não houver input

// Controle do menu hambúrguer
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Buscar e renderizar cards
fetch("comics.json")
  .then(res => res.json())
  .then(comics => {
    renderCards(comics);

    
    if(searchInput){
      searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        const filtered = comics.filter(c => c.titulo.toLowerCase().includes(value));
        renderCards(filtered);
      });
    }
    
  })
  .catch(err => console.error("Erro ao carregar JSON:", err));

// Função para renderizar os cards na grid
function renderCards(list) {
  grid.innerHTML = "";
  list.forEach(c => {
    const card = document.createElement("div"); // div para melhor controle do botão
    card.className = "card";
    card.innerHTML = `
      <img src="${c.capa}" alt="${c.titulo} capa" />
      <div class="card-overlay">
        <h3>${c.titulo}</h3>
        <button class="btn-read" onclick="window.location.href='detalhes.html?id=${c.id}'">Ler agora</button>
      </div>
    `;
    grid.appendChild(card);
  });
}