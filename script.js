const start = document.querySelector('#start'),
  numquestion = document.querySelector('#numquestion'),
  difficulty = document.querySelector('#difficulty'),
  category = document.querySelector('#category'),
  time = document.querySelector('#time');

let questions = [];

const question = document.getElementById('question');
const choices = document.getElementsByClassName('choice-text');

let score = 0;

const num = numquestion.value;
const dif = difficulty.value;
const cat = category.value;


fetch ( 'https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}&type=multiple')

  .then (res => {
    return res.json();
  })
then((data) => {
        questions = data.results.map((data) => {
            const current_question = {
                question: data.question,
            };

            const anschoices = [...data.incorrect_answers];
            current_question.answer = math.floor(math.random() * 3) + 1;
            anschoices.splice(
                current_question.answer - 1,
                0,
                data.correct_answer
            );
        
          anschoices.forEach((choice, index) => {
                current_question['choice' + (index + 1)] = choice;
          });

          return current_question;

        });

        gamestart();
    })
    .catch((err) => {
        console.error(err);
    });