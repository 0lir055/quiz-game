const Progression = document.querySelector('.progression-bar'),
  Progressiontext = document.querySelector('.progression-text');

const progress = (value) => {
  const percent = (value / time) * 100;
  Progression.style.width = `${percent}%`;
  Progressiontext.innerHTML = `${value}`;
};

let questions = [],
  Time = 30,
  score = 0,
  Currentq,
  timer;

const startGame = async () => {
  const num = sessionStorage.getItem("num");
  const cat = sessionStorage.getItem("cat");
  const diff = sessionStorage.getItem("diff");
  const response = await fetch(`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`);
  const data = await response.json();
  questions = data.results;
  setTimeout(() => {
    Currentq = 1;
    displayQuestion(questions[0]);
  }, 1000);
};

startGame();

const displayQuestion = (question) => {
  const questiontxt = document.querySelector('.question-text'),
    optioncontainer = document.querySelector('.option-container');
  questionnum = document.querySelector('.question-num');

  questiontxt.innerHTML = question.question;

  const answers = question.incorrect_answers.concat([question.correct_answer.toString()]);

  optioncontainer.innerHTML = '';
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    optioncontainer.innerHTML += `
      <div class = 'answer-options'>
          <span class = 'answer-text'>${answer}</span>
          <span class = 'text-box'>
            <span class = 'checkmark'>x</span>
          </span>
        </div>
      `;
  });

  questionnum.innerHTML = `Question <span class = 'current-question'>${questions.indexOf(question) + 1}</span>
    <span class = 'total-questions'>${questions.length}</span>`;
};