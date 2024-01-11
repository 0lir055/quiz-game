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
  .then (loadedQuestions => {
    console.log(loadedQuestions);
  } )

  .catch (err => {
    console.error(err);
  } );
