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
  const number = sessionStorage.getItem("num");
  const category = sessionStorage.getItem("cat");
  const difficulty = sessionStorage.getItem("diff");
  console.log(number, category, difficulty)
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`);
    const data = await response.json();
    if (data.response_code !== 0) {
  console.error('API returned an error:', data);
  if (data.response_code === 1) {
    alert('Not enough questions in the selected category. Please select a different category or reduce the number of questions.');
  }
  return;
}
    questions = data.results;
    if (questions[0]) {
      setTimeout(() => {
        Currentq = 1;
        displayQuestion(questions[0]);
      }, 1000);
    } else {
      console.error('No questions were fetched');
    }
  } catch (error) {
    console.error('Failed to fetch questions:', error);
  }
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

};