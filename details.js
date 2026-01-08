// Função para obter parâmetro da URL
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const detailsContainer = document.getElementById("detailsContainer");
const comicId = getQueryParam("id");

if (!comicId) {
  detailsContainer.innerHTML = "<p>ID da banda desenhada não especificado.</p>";
} else {
  fetch("comics.json")
    .then(res => res.json())
    .then(comics => {
      const comic = comics.find(c => c.id === Number(comicId));
      if (!comic) {
        detailsContainer.innerHTML = "<p>Banda desenhada não encontrada.</p>";
        return;
      }

      detailsContainer.innerHTML = `
        <img src="${comic.capa}" alt="${comic.titulo} capa" class="details-cover" />
        <h1 class="details-title">${comic.titulo}</h1>
        <div class="details-chapters">Capítulos: ${comic.capitulos}</div>
        <p class="details-description">
          ${comic.titulo}
        </p>
        <button class="btn-read" id="btnRead">Ler agora</button>
      `;

      // Adiciona o evento ao botão para redirecionar para ler.html?id=ID
      const btnRead = document.getElementById("btnRead");
      btnRead.addEventListener("click", () => {
        window.location.href = `ler.html?id=${comic.id}`;
      });
    })
    .catch(() => {
      detailsContainer.innerHTML = "<p>Erro ao carregar dados.</p>";
    });
}