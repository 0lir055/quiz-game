const StartButton = document.queryselector('.start'),
  numquestions = document.queryselector('#amount'),
  category = document.queryselector('#category'),
  difficulty = document.queryselector('#difficulty'),
  timeperqeustion = document.queryselector('#time');

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('answer-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

  let current_question ={};
  let acceptingasnwers = false;
  let score = 0;
  let questioncounter = 0;
  let availablequestions = [];

  let questions = [];


const startQuiz = () => {
  const num = numquestions.value;
  const cat = category.value;
  const dif = difficulty.value;
}

      fetch('https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}&type=multiple')
        .then((res) => {
          return res.json();
        })
        .then((loadedQuestions) => {
          questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
              question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
              formattedQuestion.answer - 1,
              0,
              loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
              formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
          });
          startGame();
        })
        .catch((err) => {
          console.error(err);
        });


