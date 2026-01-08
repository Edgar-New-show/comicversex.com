// Função para pegar o parâmetro da URL (?id=1)
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const comicId = getQueryParam('id');
const readerContainer = document.getElementById('readerContainer');
const comicTitle = document.getElementById('comicTitle');

if (!comicId) {
  readerContainer.innerHTML = '<p>ID da banda desenhada não especificado.</p>';
} else {
  fetch('comics.json')
    .then(res => res.json())
    .then(comics => {

      // Procurar a BD pelo ID
      const comic = comics.find(c => c.id === Number(comicId));

      if (!comic) {
        readerContainer.innerHTML = '<p>Banda desenhada não encontrada.</p>';
        return;
      }

      // Título da BD
      comicTitle.textContent = comic.titulo;

      // Limpar container (segurança)
      readerContainer.innerHTML = '';

      // 🔥 CARREGAR AS PÁGINAS DA HISTÓRIA
      comic.paginas.forEach((pagina, index) => {
        const img = document.createElement('img');
        img.src = pagina;
        img.alt = `${comic.titulo} - Página ${index + 1}`;
        img.className = 'comic-image';
        readerContainer.appendChild(img);
      });

    })
    .catch(err => {
      console.error(err);
      readerContainer.innerHTML = '<p>Erro ao carregar dados da banda desenhada.</p>';
    });
}