document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("comicGrid");
  const pagination = document.getElementById("pagination");
  const categoryTitle = document.getElementById("categoryTitle");

  if (!grid || !pagination) return;

  const itemsPerPage = 10;
  let currentPage = 1;
  let comicsList = [];

  const params = new URLSearchParams(window.location.search);
  const categoriaURL = (params.get("cat") || "").toLowerCase().trim();

  function renderCards(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = "<p>Nenhum comic encontrado.</p>";
      return;
    }

    list.forEach(c => {
      const card = document.createElement("a");
      card.className = "card";
      card.href = `detalhes.html?id=${c.id}`;
      card.innerHTML = `
        <img src="${c.capa}" alt="${c.titulo}">
        <div class="card-overlay">
          <h3>${c.titulo}</h3>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function renderPagination(totalItems) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return;

    const prev = document.createElement("button");
    prev.textContent = "Anterior";
    prev.disabled = currentPage === 1;
    prev.onclick = () => {
      currentPage--;
      updatePage();
    };
    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.toggle("active", i === currentPage);
      btn.disabled = i === currentPage;
      btn.onclick = () => {
        currentPage = i;
        updatePage();
      };
      pagination.appendChild(btn);
    }

    const next = document.createElement("button");
    next.textContent = "Próximo";
    next.disabled = currentPage === totalPages;
    next.onclick = () => {
      currentPage++;
      updatePage();
    };
    pagination.appendChild(next);
  }

  function updatePage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    renderCards(comicsList.slice(start, end));
    renderPagination(comicsList.length);
  }

  fetch("data/comics.json")
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) return;

      comicsList = categoriaURL
        ? data.filter(c => c.categoria.toLowerCase().trim() === categoriaURL)
        : data;

      if (categoryTitle) {
        categoryTitle.textContent = categoriaURL
          ? categoriaURL.toUpperCase()
          : "TODAS AS CATEGORIAS";
      }

      currentPage = 1;
      updatePage();
    })
    .catch(err => console.error("Erro ao carregar comics:", err));
});