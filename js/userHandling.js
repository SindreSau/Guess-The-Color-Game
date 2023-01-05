const users = []

const user = {
  id: "",
  name: "",
  email: "",
  password: "",
}


const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');

function submit() {
  console.log("clicked registration");
  user.id = Date.now();
  user.name = regName.value;
  user.email = regEmail.value;
  user.password = regPassword.value;
  users.push(user);

  if (user.name !== "" && user.email !== "" && user.password !== "") {
    showRegistrationMessage();
  } else {
    alert("empty fields");
  }

  showUsers(); //For testing
}

function showRegistrationMessage() {
  const regForm = document.getElementsByTagName('form');
  const regMessage = document.createElement('h3');

  regForm.appendChild(regMessage);
  regMessage.textContent = "Welcome ${user.name}, your registration was succesful!"
}

function showUsers() {
  users.forEach(user => {
    console.log(user);
  });
}