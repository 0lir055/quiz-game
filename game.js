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
      <div class = 'answeroptions'>
          <span class = 'answer-text'>${answer}</span>
          <span class = 'text-box'>
            <span class = 'checkmark'>x</span>
          </span>
        </div>
      `;
  });
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
    } else{
      checkanswer()
    }
  }, 1000); // Run every second
};

const submit = document.querySelector('.submit-q'),
  next = document.querySelector('.next-q');
submit.addEventListener("Click", () =>{
  checkanswer();
});