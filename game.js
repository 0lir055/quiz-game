document.addEventListener('DOMContentLoaded', (event) => {
  const Progression = document.querySelector('.progression-bar'),
    Progressiontext = document.querySelector('.progression-text');

  const progress = (value) => {
    const percent = (value / time) * 100;
    Progression.style.width = `${percent}%`;
    Progressiontext.innerHTML = `${value}`;
  };

  const Start = document.querySelector('.start-button'),
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

  if(Start) {
    Start.addEventListener("click", startGame);
  } else {
    console.error("Start button not found in the DOM");
  }

  const displayQuestion = (question) => {
    const questiontxt = document.querySelector('question-text'),
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
});