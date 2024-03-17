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

const url = `https://opentdb.com/api.php?amount=${num}&category=9&difficulty=${diff}&type=multiple`;
  // Log the parameter values
  console.log('Parameters:', num, cat, diff);


  // Log the URL
  console.log('URL:', url);

  try {
    const response = await fetch(url);
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
  const questionTxt = document.querySelector('.question-text'),
        optionContainer = document.querySelector('.option-container');
  let currentQuestionIndex = questions.indexOf(question); // Assuming you have a way to track the current question index
  
  questionTxt.innerHTML = question.question;
  
  // Clear previous options
  optionContainer.innerHTML = '';

  // Mix the answers
  const answers = [...question.incorrect_answers];
  const correctAnswerIndex = Math.floor(Math.random() * (answers.length + 1));
  answers.splice(correctAnswerIndex, 0, question.correct_answer);
  
  // Display answers
  answers.forEach((answer, index) => {
    const optionHTML = document.createElement('div');
    optionHTML.classList.add('answer-options');
    optionHTML.innerHTML = `
      <span class='answer-text'>${answer}</span>
      <span class='text-box'>
        <span class='checkmark'>✓</span>
      </span>
    `;
    optionHTML.addEventListener('click', () => selectAnswer(answer, question.correct_answer, currentQuestionIndex));
    optionContainer.appendChild(optionHTML);
  });
};

const selectAnswer = (selectedAnswer, correctAnswer, questionIndex) => {
  if(selectedAnswer === correctAnswer) {
    score++;
    document.getElementById('score').textContent = score;
  }
  
  if(questionIndex + 1 < questions.length) {
    displayQuestion(questions[questionIndex + 1]);
  } else {
    endGame();
  }
};

const endGame = () => {
  window.location.href = 'end-screen.html';
};
