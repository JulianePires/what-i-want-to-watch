apiUrl = 'http://localhost:3000/movies';


const cardsSection = document.getElementById("cards");

const getMovies = async () => {
    const response = await fetch(`${apiUrl}/list`);
    const movies = await response.json();

    movies.map(movie => {
        cardsSection.insertAdjacentHTML("beforeend",
        `<div class="card" key=${movie._id}>
        <img src=${movie.image} alt=${movie.name} class="card-banner">
        <div class="hstack">
          <h4 class="movie-title">${movie.name}</h4>
          <p class="movie-score">${movie.score}</p>
        </div>
        <div class="hstack">
          <p class="movie-gender">${movie.gender}</p>
          <p class="movie-director">${movie.director}</p>
        </div>
        <div class="hstack">
          <span class="icons">
            <button><img src="./assets/pen-solid.svg" alt="edit"></button>
            <button><img src="./assets/trash-solid.svg" alt="trash"></button>
          </span>
          <span class="check">
            <input 
                type="checkbox" 
                name="watched" 
                id="watched" 
                placeholder="watched" 
                ${movie.isWatched ? "checked" : ""}
            >
            <label for="watched">watched?</label>
          </span>
        </div>
      </div>
      `
        )
    })
}

getMovies();