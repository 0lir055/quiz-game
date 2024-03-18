const Startbtn = document.querySelector('.start-button'),
  numquestion = document.querySelector('#Number-of-Questions'),
  category = document.querySelector('#Category'),
  difficulty = document.querySelector('#Difficulty'),
  timer = document.querySelector('#time');

function startGame() {
  const num = numquestion.value,
    cat = category.value,
    diff = difficulty.value,
    timeVal = time.value;

  sessionStorage.setItem("num", num);
  sessionStorage.setItem("cat", cat);
  sessionStorage.setItem("diff", diff);
  sessionStorage.setItem("time", timeVal);

  window.location.replace("game.html");
}

Startbtn.addEventListener("click", startGame)
