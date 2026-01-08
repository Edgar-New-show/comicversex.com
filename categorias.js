const comicGrid = document.getElementById("comicGrid");
const categoryTitle = document.getElementById("categoryTitle");

const params = new URLSearchParams(window.location.search);
const categoriaURL = (params.get("cat") || "").toLowerCase().trim();

fetch("comics.json")
  .then(res => res.json())
  .then(comics => {

    if (!Array.isArray(comics)) {
      console.error("O JSON não é um array");
      return;
    }

    if (categoriaURL) {
      categoryTitle.textContent = categoriaURL.toUpperCase();

      const filtrados = comics.filter(c =>
        c.categoria.toLowerCase().trim() === categoriaURL
      );

      renderCards(filtrados);
    } else {
      categoryTitle.textContent = "TODAS AS CATEGORIAS";
      renderCards(comics);
    }
  })
  .catch(err => console.error("Erro ao carregar comics:", err));

function renderCards(lista) {
  comicGrid.innerHTML = "";

  if (lista.length === 0) {
    comicGrid.innerHTML = "<p>Nenhum comic encontrado.</p>";
    return;
  }

  lista.forEach(c => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = `detalhes.html?id=${c.id}`;

    card.innerHTML = `
      <img src="${c.capa}" alt="${c.titulo}">
      <div class="card-overlay">
        <h3>${c.titulo}</h3>
      </div>
    `;

    comicGrid.appendChild(card);
  });
}