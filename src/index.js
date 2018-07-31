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
let results = document.getElementById("word-results");
let gameResults = document.getElementById("game-results");
let square;
let startButton;

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
  let userInfoDiv = document.getElementById("user-info");
  let logOutButton = document.createElement("button");
  logOutButton.innerHTML = "Log Out";
  userInfoDiv.appendChild(logOutButton);

  let loginForm = document.getElementById("user-form");
  loginForm.style.display = "none";

  let startButton = document.getElementById("start-button");
  startButton.style.display = "block";

  logOutButton.addEventListener("click", function() {
    currentUser = null;
    userInfoP.innerHTML = ``;
    userInfoDiv.removeChild(logOutButton);
    loginForm.style.display = "block";
    startButton.style.display = "none";
    clearBoard();
    gameBoard.style.display = "none";
    gameResults.innerHTML = ``;
    results.innerHTML = ``;
  });
}

startButton = document.getElementById("start-button");
startButton.addEventListener("click", function() {
  startButton.style.display = "none";
  gameResults.innerHTML = ``;
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
  checkForWinner();
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
  checkForWinner();
}

function checkForWinner() {
  // horizontal non-null match
  if (
    currentBoard.r1c1 !== "" &&
    currentBoard.r1c1 === currentBoard.r1c2 &&
    currentBoard.r1c2 === currentBoard.r1c3
  ) {
    declareWinner(currentBoard.r1c1);
    clearBoard();
    return;
  }
  if (
    currentBoard.r2c1 !== "" &&
    currentBoard.r2c1 === currentBoard.r2c2 &&
    currentBoard.r2c2 === currentBoard.r2c3
  ) {
    declareWinner(currentBoard.r2c1);
    clearBoard();
    return;
  }
  if (
    currentBoard.r3c1 !== "" &&
    currentBoard.r3c1 === currentBoard.r3c2 &&
    currentBoard.r3c2 === currentBoard.r3c3
  ) {
    declareWinner(currentBoard.r3c);
    clearBoard();
    return;
  }

  // vertical non-"" match
  if (
    currentBoard.r1c1 !== "" &&
    currentBoard.r1c1 === currentBoard.r2c1 &&
    currentBoard.r2c1 === currentBoard.r3c1
  ) {
    declareWinner(currentBoard.r1c1);
    clearBoard();
    return;
  }
  if (
    currentBoard.r1c2 !== "" &&
    currentBoard.r1c2 === currentBoard.r2c2 &&
    currentBoard.r2c2 === currentBoard.r3c2
  ) {
    declareWinner(currentBoard.r1c2);
    clearBoard();
    return;
  }
  if (
    currentBoard.r1c3 !== "" &&
    currentBoard.r1c3 === currentBoard.r2c3 &&
    currentBoard.r2c3 === currentBoard.r3c3
  ) {
    declareWinner(currentBoard.r1c3);
    clearBoard();
    return;
  }

  // downward diagnal non-""-match
  if (
    currentBoard.r1c1 !== "" &&
    currentBoard.r1c1 === currentBoard.r2c2 &&
    currentBoard.r2c2 === currentBoard.r3c3
  ) {
    declareWinner(currentBoard.r1c);
    clearBoard();
    return;
  }

  // upward diagnal non-""-match
  if (
    currentBoard.r3c1 !== "" &&
    currentBoard.r3c1 === currentBoard.r2c2 &&
    currentBoard.r2c2 === currentBoard.r1c3
  ) {
    declareWinner(currentBoard.r3c1);
    clearBoard();
    return;
  }
}

function declareWinner(winningSymbol) {
  startButton.style.display = "block";
  gameBoard.style.display = "none";
  results.innerHTML = "";
  if (winningSymbol === "X") {
    gameResults.innerHTML = `You win!`;
  }
  if (winningSymbol === "O") {
    gameResults.innerHTML = `You lose!`;
  }
}

function clearBoard() {
  document.getElementById("r1c1").innerHTML = "";
  document.getElementById("r1c2").innerHTML = "";
  document.getElementById("r1c3").innerHTML = "";
  document.getElementById("r2c1").innerHTML = "";
  document.getElementById("r2c2").innerHTML = "";
  document.getElementById("r2c3").innerHTML = "";
  document.getElementById("r3c1").innerHTML = "";
  document.getElementById("r3c2").innerHTML = "";
  document.getElementById("r3c3").innerHTML = "";
}
