const Progression = document.querySelector('.progression-bar');
const Progressiontext = document.querySelector('.progression-text');

  const progress = (value) => {
  const percent = (value / time) * 100;
  Progression.style.width = `${percent}%`;
  Progressiontext.innerHTML = `${value}`;
};

let questions = [],
  Currentq,
  timer;

let time;

const startGame = async () => {
  const num = sessionStorage.getItem("num");
  const cat = sessionStorage.getItem("cat");
  const diff = sessionStorage.getItem("diff");
  time = sessionStorage.getItem("time");

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
  document.querySelector('.totalquestions').innerHTML = `${num}`;
};

let score = 0;

startGame();
const displayQuestion = (question) => {
  const questiontxt = document.querySelector('.question-text');
  const optioncontainer = document.querySelector('.option-container'),
  questionnum = document.querySelector('.questionquestion');

  questiontxt.innerHTML = question.question;

  const answers = [...question.incorrect_answers, question.correct_answer.toString()];

optioncontainer.innerHTML = '';
answers.sort(() => Math.random() - 0.5);

answers.forEach((answer) => {
  const answerOption = document.createElement('div');
  answerOption.className = 'answeroptions';

  const answerText = document.createElement('span');
  answerText.className = 'answer-text';
  answerText.textContent = answer;

  const textBox = document.createElement('span');
  textBox.className = 'text-box';

  const checkmark = document.createElement('span');
  checkmark.className = 'checkmark';
  checkmark.textContent = 'x';

  textBox.appendChild(checkmark);
  answerOption.append(answerText, textBox);
  optioncontainer.appendChild(answerOption);
});
  
questionnum.innerHTML = `${Currentq} `;

  const optionsdiv = document.querySelectorAll('.answeroptions')
  optionsdiv.forEach((answeroptions) => {
    answeroptions.addEventListener("click", () => {
      console.log('clicked');
      if (!answeroptions.classList.contains("checked")) {
        optionsdiv.forEach((answeroptions) => {
          answeroptions.classList.remove("selected");
        });
        answeroptions.classList.add("selected");
      };
    });
    console.log('added event listener');
  });

  let timeValue = parseInt(time)
  startTimer(timeValue)
};

const startTimer = (timeValue) => {
  timer = setInterval(() => {
    if (timeValue >= 0) {
      console.log('Current time:', timeValue); // Log the current time
      progress(timeValue);
      timeValue--;
    } else {
      clearInterval(timer); // Clear the interval
      checkanswer();
    }
  }, 1000); // Run every second
};

const submit = document.querySelector('.submit-q'),
  next = document.querySelector('.next-q');
submit.addEventListener("click", () => {
  checkanswer();
});

next.addEventListener("click", () => {
  nextquestion();
  submit.style.display = "block";
  next.style.display = "none";
});

const highlightCorrectAnswer = () => {
  document.querySelectorAll('.answeroptions').forEach((option) => {
    if (option.querySelector('.answer-text').textContent === questions[Currentq - 1].correct_answer) {
      option.classList.add("correct");
    }
  });
};

const checkanswer = () => {
  clearInterval(timer);
  const selectedanswer = document.querySelector('.answeroptions.selected');
  if (selectedanswer) {
    const answer = selectedanswer.querySelector('.answer-text').textContent;
    console.log(Currentq);
    if (answer === questions[Currentq - 1].correct_answer) {
      score++;
      selectedanswer.classList.add("correct");
    } else {
      selectedanswer.classList.add("incorrect");
      highlightCorrectAnswer();
    }
  } else {
    highlightCorrectAnswer();
  }

  // Show the next button and hide the submit button
  next.style.display = 'block';
  submit.style.display = 'none';
};

const nextquestion = () => {
  if (Currentq < questions.length) {
    displayQuestion(questions[Currentq]);
    Currentq++;
  } else {
    console.log('Game over');
    sessionStorage.setItem("score", score);
    location.href = "end-screen.html";
  }
};