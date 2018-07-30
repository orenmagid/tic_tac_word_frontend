document.getElementById("user-form").addEventListener("submit", event => {
  event.preventDefault();

  let username = document.getElementById("username-input").value;
  getUser(username);
  document.getElementById("username-input").value = ``;
});

let currentUser;
let gameBoard = document.querySelector(".game-board");
let currentBoard;
let gameInformation;
let score = document.getElementById("current-game-score");
let results = document.getElementById("results");
let square;

function getUser(username) {
  fetch(`http://localhost:3000/api/v1/users`)
    .then(response => response.json())
    .then(function(users) {
      checkForExistingUser(users, username);
    });
}

function checkForExistingUser(users, username) {
  users.forEach(function(user) {
    if (user.username === username) {
      currentUser = new User(user.username, user.id);
      displayUser(currentUser);
    }
  });
  if (currentUser === undefined) {
    postUser(username);
  }
}

function postUser(username) {
  let data = { username: username };

  fetch(`http://localhost:3000/api/v1/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(function(user) {
      currentUser = new User(user.username, user.id);
      displayUser(currentUser);
    });
}

function displayUser(currentUser) {
  console.log(currentUser);
  let userInfoP = document.getElementById("username-display");
  userInfoP.innerHTML = `Currently logged in as: ${currentUser.username}`;
}

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", function() {
  startButton.style.display = "none";
  gameBoard = document.querySelector(".game-board");
  gameBoard.style.display = "block";
  currentBoard = new Board(currentUser);
  gameBoard.addEventListener("click", function(event) {
    results.innerHTML = "";
    square = event.target.id;
    fetchRandomWord();
    gameInformation = document.getElementById("game-information");
    gameInformation.style.display = "block";
    currentBoard[square] = "clicked";
  });
});

function fetchRandomWord() {
  fetch(`http://localhost:3000/api/v1/words`)
    .then(response => response.json())
    .then(word => displayWord(word));
}

function displayWord(word) {
  let wordDisplay = document.getElementById("word");
  wordDisplay.innerHTML = `${word.label}`;
  let guessButton = document.getElementById("guess-button");
  guessButton.addEventListener("click", function(event) {
    let guessValue = document.getElementById("guess").value.toLowerCase();

    fetchSimilarWords(word, guessValue);
  });
}

function fetchSimilarWords(word, guessValue) {
  fetch(`http://api.datamuse.com/words?ml=${word.label}`)
    .then(response => response.json())
    .then(jsonData => {
      checkforMatches(jsonData, guessValue);
    });
}

function checkforMatches(jsonData, guessValue) {
  let simpleReturnedWordArray = jsonData.map(function(returnedWord) {
    return returnedWord.word;
  });

  if (simpleReturnedWordArray.indexOf(guessValue) === -1) {
    displayLose();
  } else {
    jsonData.forEach(function(returnedWord) {
      if (guessValue == returnedWord.word) {
        displayWin(returnedWord, jsonData);
      }
    });
  }

  gameInformation.style.display = "none";
  let guessInput = document.getElementById("guess");
  guessInput.value = "";
}

function displayLose() {
  console.log("displayLose", square);
  results.innerHTML = "Nope! The computer gets an O!";
  currentBoard[square] = "O";
  document.getElementById(`${square}`).innerHTML = "O";
}

function displayWin(returnedWord, jsonData) {
  console.log("displayWin", square);
  score.innerHTML = `Current Score: ${(currentBoard.score += Math.floor(
    (returnedWord.score / jsonData[0].score) * 100
  ))}`;
  results.innerHTML = `Correct! You've earned ${Math.floor(
    (returnedWord.score / jsonData[0].score) * 100
  )} points with the word "${returnedWord.word}".`;

  document.getElementById(`${square}`).innerHTML = "X";
  currentBoard[square] = "X";
}
