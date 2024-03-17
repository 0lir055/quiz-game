const Startbtn = document.querySelector('.start-button'),
  numquestion = document.querySelector('#Number-of-Questions'),
  category = document.querySelector('#Category'),
  difficulty = document.querySelector('#Difficulty'),
  time = document.querySelector('#Time');

function startGame() {
  const num = numquestion.value,
    cat = category.value,
    diff = difficulty.value;

  sessionStorage.setItem("num", num)
  sessionStorage.setItem("cat", cat)
  sessionStorage.setItem("diff", diff)

  window.location.replace("game.html")
}

Startbtn.addEventListener("click", startGame)
