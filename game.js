const Progression = document.querySelector('.progression-bar'),
  Progressiontext = document.querySelector('.progression-text');

const progress = (value) => {
  const percent = (value / time) * 100;
  Progression.style.width = `${percent}%`;
  Progressiontext.innerHTML = `${value}`;
};

const start = document.querySelector('.start-button'),
  numquestion = document.querySelector('#Number-of-Questions'),
  category = document.querySelector('#Category'),
  difficulty = document.querySelector('#Difficulty'),
  time = document.querySelector('#Time');

let questions = [],
  Time = 30,
  score = 0,
  Currentq,
  timer;

const startGame = () => {
  const num = numquestion.value,
    cat = category.value,
    diff = difficulty.value;
  fetch(`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`)
    .then((res) => res.json())
    .then((data) => {
      questions = data.results;
      setTimeout(() => {
        Currentq = 1;
        displayQuestion(questions[0]);
      }, 1000);
    });
};

start.addEventListener('click', startGame);

const displayQuestion = (question) => {
  const questiontxt = document.querySelector('question-text'),
    optioncontainer = docuement.querySelector('.option-container');
  question = document.querySelector('.question-num');

};