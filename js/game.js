const body = document.getElementsByTagName('body')[0];
const startGameButton = document.getElementById('startGameButton');
//gameContainer:
const gameContainer = document.createElement('div');
const inputContainer = document.createElement('inputContainer');
const inputText = document.createElement('input');
const submitButton = document.createElement('button');

//footer
const footer = document.createElement('footer');
const highScoreContainer = document.createElement('div');
const highScoreText = document.createElement('p');
const highScoreOut = document.createElement('p');

const scoreContainer = document.createElement('div');
const solutionText = document.createElement('h3');
const scoreText = document.createElement('h3');
const againButton = document.createElement('button');

const loginForm = document.getElementById('loginForm');
const startButtonContainer = document.getElementById('startButtonContainer');

let randomColorString;
let rndR, rndG, rndB;
let userR, userG, userB;
let scoreAsPercentage;
let scores = [];
let highScore = 0;


startGameButton.onclick = runGame;

//Receive input:
submitButton.onclick = submitButtonFunction;
//run submit function on enter event from text field
inputText.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    submitButtonFunction();
  }
});


//Main function:
function runGame() {
  startGameButton.remove();
  loginForm.remove();
  startButtonContainer.remove();

  //gamecontainer
  gameContainer.id = 'gameContainer';
  gameContainer.style.animation = 'fadeIn 500ms ease-in forwards';
  inputContainer.classList.add('input-container');
  inputText.type = 'text';
  inputText.placeholder = 'enter guess separated by spaces';
  inputText.id = 'inputText';
  submitButton.id = 'submitButton';
  submitButton.textContent = 'Submit'

  inputContainer.appendChild(inputText);
  inputContainer.appendChild(submitButton);
  gameContainer.appendChild(inputContainer);
  body.appendChild(gameContainer);

  //footer-section:
  footer.style.animation = 'fadeIn 500ms ease-in forwards';
  highScoreOut.id = 'highScoreOut';
  highScoreContainer.classList.add('highscore-container');
  highScoreText.textContent = 'Highscore: ';
  highScoreOut.textContent = highScore;

  body.appendChild(footer);
  footer.appendChild(highScoreContainer);
  highScoreContainer.appendChild(highScoreText);
  highScoreContainer.appendChild(highScoreOut);

  getRandomColor();
  setColor(rndR, rndG, rndB);
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

//Functions used by main function
function getRandomColor() {
  //Updates rndR, rndG, rndB
  for (let i = 0; i < 3; i++) {
    const randomColor = Math.floor(Math.random() * 256);
    switch (i) {
      case 0: rndR = randomColor; break;
      case 1: rndG = randomColor; break;
      case 2: rndB = randomColor; break;
    }
  }

  //update randomColorString
  randomColorString = `${rndR}, ${rndG}, ${rndB}`;
}

function setColor(R, G, B) {
  gameContainer.style.backgroundColor = `rgba(${R}, ${G}, ${B})`;
}

function submitButtonFunction() {
  let userGuess = [];
  let userGuessString = inputText.value.trim();
  //kjøre funksjon som returnerer true kun hvis input er riktig, ellers alert error
  userGuess = userGuessString.split(' ');
  userR = userGuess[0];
  userG = userGuess[1];
  userB = userGuess[2];
  checkScore();
}

function checkScore() {
  let rScore, gScore, bScore;
  let scoreAsLowestBest;
  let scoreAsHighestBest;
  if (userR > rndR) {
    rScore = userR - rndR;
  }
  else if (userR < rndR) {
    rScore = rndR - userR;
  } else {
    rScore = 0;
  }
  if (userG > rndG) {
    gScore = userG - rndG;
  }
  else if (userG < rndG) {
    gScore = rndG - userG;
  } else {
    gScore = 0;
  }
  if (userB > rndB) {
    bScore = userB - rndB;
  }
  else if (userB < rndB) {
    bScore = rndB - userB;
  } else {
    bScore = 0;
  }
  scoreAsLowestBest = rScore + gScore + bScore;
  if (scoreAsLowestBest > 0) {
    scoreAsHighestBest = 765 - scoreAsLowestBest;
  } else {
    scoreAsHighestBest = 765;
  }

  scoreAsPercentage = (scoreAsHighestBest / 765) * 100;
  scores.push(scoreAsPercentage);
  scoreAsPercentage = scoreAsPercentage.toFixed(2) + '%';

  showScore();
  updateHighscore();
}

function showScore() {
  scoreContainer.classList.add('score-container');
  solutionText.textContent = "Solution: rgb(" + randomColorString + ")";
  scoreText.textContent = "Your score: " + scoreAsPercentage;
  againButton.textContent = "Again?";

  gameContainer.appendChild(scoreContainer);
  scoreContainer.appendChild(solutionText);
  scoreContainer.appendChild(scoreText);
  scoreContainer.appendChild(againButton);

  againButton.onclick = resetGame;
}

function resetGame() {
  getRandomColor();
  setColor(rndR, rndG, rndB);
  scoreContainer.remove();
  inputText.value = "";
}

function updateHighscore() {
  for (var i = 0; i < scores.length; i++) {
    if (scores[i] > highScore) {
      highScore = scores[i];
    }
  }

  //updateHighscore on screen
  highScoreOut.textContent = highScore.toFixed(2) + "%";
}