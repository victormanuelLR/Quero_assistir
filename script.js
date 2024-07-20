const searchButtonElement = document.getElementById("search-button");
const overlayElement = document.getElementById("modal-overlay");
const movieNameElement = document.getElementById("movie-name");
const movieYearElement = document.getElementById("movie-year");
const movieListlement = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

// if (movieList === null) {
//   movieList = [];
// } else {
//
//   }
//}

async function overlayClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Error) {
      throw new Error("O filme não foi encontrado");
    }

    console.log("data:", data);
    createModal(data);

    movieNameElement.value = "";
    movieYearElement.value = "";
    overlayElement.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message, time: 1 });
  }
}

function movieNameParameterGenerator() {
  if (movieNameElement.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieNameElement.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (movieYearElement.value === "") {
    return "";
  }
  if (
    movieYearElement.value.length !== 4 ||
    Number.isNaN(Number(movieYearElement.value))
  ) {
    throw new Error("Ano do filme inválido");
  }
  return `&y=${movieYearElement.value}`;
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function isMovieAlredyOnList(id) {
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function updateUI(movieObject) {
  movieListlement.innerHTML += `<article id="movie-card-${movieObject.imdbID}">
    <img src="${movieObject.Poster}" alt="Poster de ${movieObject.Title}">
    <button class="remove-button" onclick="{removeFilmFromList('${movieObject.imdbID}')}"><i class="bi bi-trash"></i>Remover</button>
  </article>`;
}

function removeFilmFromList(id) {
  notie.confirm({
    text: "Deseja remover o filme da sua lista ?",
    submitText: "Sim",
    cancelText: "Não",
    position: "top",
    submitCallback: function remove() {
      movieList = movieList.filter((movie) => movie.imdbID !== id);
      document.getElementById(`movie-card-${id}`).remove();
      updateLocalStorage();
    },
  });
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUI(movieInfo);
}

searchButtonElement.addEventListener("click", overlayClickHandler);
