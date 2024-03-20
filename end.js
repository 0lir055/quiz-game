score = sessionStorage.getItem("score");
num = sessionStorage.getItem("num");

document.querySelector('.finalscorenumber').innerHTML = `${score}`;
document.querySelector('.totalscorenumber').innerHTML = `${num}`;