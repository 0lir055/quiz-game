const start = document.querySelector('#start'),
  numquestion = document.querySelector('#numquestion'),
  difficulty = document.querySelector('#difficulty'),
  category = document.querySelector('#category'),
  time = document.querySelector('#time');

let questions = [];

const num = numquestion.value;
const dif = difficulty.value;
const cat = category.value;


fetch ( 'https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}&type=multiple')

.then (res => res.json())
.then (data => {
  questions = data.results;
  console.log(questions);
})
.catch (err => console.log(err));

