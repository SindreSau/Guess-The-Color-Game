const gameContainer = document.getElementById('gameContainer');
const inputText = document.getElementById('inputText');
const submitButton = document.getElementById('submitButton');

let randomColorString;
let rndR, rndG, rndB;
let userR, userG, userB;
let scoreAsPercentage;
let scores = [];
let highScore = 0;


//To be replaced by startGameButton:
window.onload = runGame();


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
  getRandomColor();
  setColor(rndR, rndG, rndB);
  //user has submitted, show score and ask if user wants to replay
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
  console.log(rndR, rndG, rndB);

  //update randomColorString
  randomColorString = `${rndR}, ${rndG}, ${rndB}`;
  console.log(randomColorString);
}

function setColor(R, G, B) {
  gameContainer.style.backgroundColor = `rgba(${R}, ${G}, ${B})`;
}

function submitButtonFunction() {
  let userGuess = [];
  let userGuessString = inputText.value.trim();
  //kjøre funksjon som returnerer true kun hvis input er riktig, ellers alert error
  console.log("Guess as string: " + userGuessString);
  userGuess = userGuessString.split(' ');
  userR = userGuess[0];
  userG = userGuess[1];
  userB = userGuess[2];
  console.log(userR, userG, userB);
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
  console.log("rScore: " + rScore);
  console.log("gScore: " + gScore);
  console.log("bScore: " + bScore);
  scoreAsLowestBest = rScore + gScore + bScore;
  if (scoreAsLowestBest > 0) {
    scoreAsHighestBest = 765 - scoreAsLowestBest;
  } else {
    scoreAsHighestBest = 765;
  }
  console.log(scoreAsLowestBest);
  console.log(scoreAsHighestBest);
  scoreAsPercentage = (scoreAsHighestBest / 765) * 100;
  scoreAsPercentage = scoreAsPercentage.toFixed(2) + '%';
  console.log("Your score: " + scoreAsPercentage);
  scores.push(scoreAsPercentage);
  console.log(scores);
  showScore();
}

function showScore() {
  const scoreContainer = document.createElement('div');
  scoreContainer.classList.add('score-container');
  const scoreText = document.createElement('h3');
  scoreText.textContent = "Your score: ";
  const scoreOut = document.createElement('h3');
  scoreOut.textContent = scoreAsPercentage;
  const againButton = document.createElement('button');
  againButton.textContent = "Again?";
  againButton.onclick = resetGame;

  scoreContainer.appendChild(scoreText);
  scoreContainer.appendChild(scoreOut);
  gameContainer.appendChild(scoreContainer);
  scoreContainer.appendChild(againButton);
}

function resetGame() {
  console.log("RESETTTTTT");
}