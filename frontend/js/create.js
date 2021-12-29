const nameInput = document.getElementById("name");
const imageInput = document.getElementById("image");
const scoreInput = document.getElementById("score");
const genderInput = document.getElementById("gender");
const directorInput = document.getElementById("director");
const isWatchedInput = document.getElementById("isWatched");
const apiUrl = "http://localhost:3000/movies";

const createMovies = async () => {
  if (
    nameInput.value &&
    imageInput.value &&
    scoreInput.value &&
    genderInput.value &&
    directorInput.value
  ) {
    const response = await fetch(`${apiUrl}/add`, {
      method: "POST",
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
