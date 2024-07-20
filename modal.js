const backgroundElement = document.getElementById("modal-background");
const modalContainerElement = document.getElementById("modal-container");

let currentMovie = {};

function closeModal() {
  overlayElement.classList.remove("open");
}

function addCurentMovieToList() {
  if (isMovieAlredyOnList(currentMovie.imdbID)) {
    notie.alert({
      type: "error",
      text: "Filme já está na sua lista!",
      time: 1,
    });
    return;
  }

  updateUI(currentMovie);
  addToList(currentMovie);
  updateLocalStorage()
  closeModal();
}

function createModal(data) {
  currentMovie = data;

  modalContainerElement.innerHTML = `<h3 id="movie-title">${data.Title} - ${data.Year}</h3>
    <section id="modal-body">
    <img src=${data.Poster}" alt="poster do filme." id="movie-poster">
    <div id="movie-info">
    <h3 id="movie-plot">${data.Plot}</h3>
    
    <div id="movie-cast">
    <h4>Elenco</h4>
    <h5>${data.Actors}</h5>
    </div>
    
    <div id="movie-genre">
    <h4>Gênero:</h4>
    <h5>${data.Genre}</h5>
    </div>
    </div>
    </section>
    <section id="modal-footer">
    <button id="add-to-list" onclick="{addCurentMovieToList()}">Adicionar à lista</button>
    </section>`;
}

backgroundElement.addEventListener("click", closeModal);
