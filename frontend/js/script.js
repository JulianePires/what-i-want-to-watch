const apiUrl = "http://localhost:3000/movies";
let editId = "";
let view = "all";

const cardsSection = document.getElementById("cards");
const editSection = document.getElementById("edit");
const nameInput = document.getElementById("name");
const imageInput = document.getElementById("image");
const scoreInput = document.getElementById("score");
const genderInput = document.getElementById("gender");
const directorInput = document.getElementById("director");
const isWatchedInput = document.getElementById("isWatched");

const getMovies = async () => {
  const response = await fetch(`${apiUrl}/list`);
  const movies = await response.json();

  movies.map((movie) => {
    cardsSection.insertAdjacentHTML(
      "beforeend",
      `<div class="card" key=${movie._id}>
        <img src="${movie.image}" alt="${movie.name}" class="card-banner">
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
            <button class="icon-button" onclick="renderEditSection(${movie._id})"><img src="./assets/pen-solid.svg" alt="edit"></button>
            <button class="icon-button" onclick="deleteMovie(${movie._id})"><img src="./assets/trash-solid.svg" alt="trash"></button>
          </span>
          <span class="check">
            <input 
                type="checkbox" 
                name="watched" 
                id="watched-${movie._id}" 
                placeholder="watched" 
                value=${movie.isWatched}
                onclick="updateIsWatchedStatus(${movie._id})"
            >
            <label for="watched">watched?</label>
          </span>
        </div>
      </div>
      `
    );
  });
};

const renderEditSection = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`);
  const movie = await response.json();

  editSection.style.display = "flex";

  editSection.insertAdjacentHTML(
    "beforeend",
    `
  <span class="hstack">
    <label for="name">Name:</label>
    <input type="text" value="${
      movie.name
    }" name="name" id="name" placeholder="Movie name" required>
  </span>

  <span class="hstack">
    <label for="image">Image:</label>
    <input type="url" value="${
      movie.image
    }" name="image" id="image" placeholder="Movie image url" required>
  </span>

  <span class="hstack">
    <label for="score">Score:</label>
    <input type="number" value=${Number(
      movie.score
    )} step=".01" name="score" id="score" placeholder="Movie score" required>
  </span>

  <span class="hstack">
    <label for="gender">Gender:</label>
    <input type="text" value="${
      movie.gender
    }" name="gender" id="gender" placeholder="Movie gender" required>
  </span>

  <span class="hstack">
    <label for="director">Director:</label>
    <input type="text" value="${
      movie.director
    }" name="director" id="director" placeholder="Movie director" required>
  </span>

  <span class="hstack">
    <label for="isWatched">Is watched?</label>
    <input type="checkbox" name="isWatched" id="isWatched" checked=${
      movie.isWatched
    }>
  </span>

  <button onclick="console.log(${movie._id})">Save</button>
  `
  );
};

const deleteMovie = async (id) => {
  const response = await fetch(`${apiUrl}/delete/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  alert(result.message);
  cardsSection.innerHTML = "";
  getMovies();
};

const updateIsWatchedStatus = async (id, status) => {
  const response = await fetch(`${apiUrl}/watched/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isWatched: status,
    }),
  });
  const data = await response.json();
  alert(data.message);
  cardsSection.innerHTML = "";
  getMovies();
};

const editMovie = async (id) => {
  if (
    nameInput.value &&
    imageInput.value &&
    scoreInput.value &&
    genderInput.value &&
    directorInput.value
  ) {
    const response = await fetch(`${apiUrl}/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        image: imageInput.value,
        score: scoreInput.value,
        gender: genderInput.value,
        director: directorInput.value,
        isWatched: isWatchedInput.value === "on" ? false : true,
      }),
    });
    const data = await response.json();
    alert(data.message);
  } else {
    alert("The fields cannot be empty");
  }
};

getMovies();
