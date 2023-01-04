const gameContainer = document.getElementById('gameContainer');
const rndButton = document.getElementById('rndButton');
const inputText = document.getElementById('inputText');
const submitButton = document.getElementById('submitButton');

let randomColorString;
let rndR, rndG, rndB;

let userGuess = [];
let userRndR, userRndG, userRndB;

rndButton.onclick = rndButtonFunction;
submitButton.onclick = submitButtonFunction;
//run submit function on enter event from text field


//Main function
function rndButtonFunction() {
  getRandomColor();
  setColor(rndR, rndG, rndB);
}


//Functions used by main function
function submitButtonFunction() {
  let userGuessString = inputText.value.trim().toLowerCase();
  console.log(userGuessString);
  userGuess = userGuessString.split(' ');
  console.log(userGuess);
}

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