const start = document.querySelector('#start'),
  numquestion = document.querySelector('#numquestion'),
  difficulty = document.querySelector('#difficulty'),
  category = document.querySelector('#category'),
  time = document.querySelector('#time');

let questions = [];

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
            const currentquestion = {
                question: data.question,
            };

            const anschoices = [...data.incorrect_answers];
            currentquestion.answer = math.floor(math.random() * 3) + 1;
            anschoices.splice(
                currentquestion.answer - 1,
                0,
                data.correct_answer
            );
        
          anschoices.forEach((choice, index) => {
                currentquestion['choice' + (index + 1)] = choice;
          });

          return currentquestion;

        });

        gamestart();
    })
    .catch((err) => {
        console.error(err);
    });

    console.log(currentquestion)