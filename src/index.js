document.getElementById("user-form").addEventListener("submit", event => {
  event.preventDefault();
  userInfoDiv.style.display = "block";

  let username = document.getElementById("username-input").value;
  getUser(username);
  document.getElementById("username-input").value = ``;
});

let currentUser;
let gameBoard = document.querySelector(".game-board");
let currentBoard;
let gameInformation = document.getElementById("game-information");
let score = document.getElementById("current-game-score");
let results = document.getElementById("word-results");
let gameResults = document.getElementById("game-results");
let square;
let startButton;
let gameSaveButton = document.createElement("button");
let savedGamesList = document.getElementById("saved-games-list");
let userBoards;
let userInfoDiv = document.getElementById("user-info");
let logOutButton;

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
      userBoards = user.boards;
      displayUser();
    }
  });
  if (currentUser === undefined) {
    userBoards = null;
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
      displayUser();
    });
}

function displayUser() {
  let userInfoH3 = document.getElementById("username-display");
  userInfoH3.innerHTML = `Currently logged in as: ${currentUser.username}`;

  logOutButton = document.createElement("button");
  logOutButton.innerHTML = "Log Out";
  userInfoDiv.appendChild(logOutButton);

  let loginForm = document.getElementById("user-form");
  loginForm.style.display = "none";

  let startButton = document.getElementById("start-button");
  startButton.style.display = "block";

  logOutButton.addEventListener("click", function() {
    currentUser = null;
    userInfoDiv.style.display = "none";
    userInfoH3.innerHTML = ``;
    userInfoDiv.removeChild(logOutButton);
    loginForm.style.display = "block";
    startButton.style.display = "none";
    clearBoard();
    gameInformation.style.display = "none";
    gameBoard.style.display = "none";
    gameSaveButton.style.display = "none";
    gameResults.innerHTML = ``;
    results.innerHTML = ``;
    score.innerHTML = "";
    savedGamesList.innerHTML = "";
  });
  displayBoards();
}

startButton = document.getElementById("start-button");
startButton.addEventListener("click", function() {
  clearBoard();
  let currentGameDiv = document.getElementById("current-game-info");

  gameSaveButton.innerText = "Save Current Game";
  currentGameDiv.appendChild(gameSaveButton);
  gameSaveButton.addEventListener("click", function() {
    currentBoard.status = "In progress";
    postBoard();
    results.innerHTML = "";
    score.innerHTML = "";
    gameSaveButton.style.display = "none";
    gameBoard.style.display = "none";
    let userInfoDiv = document.getElementById("user-info");
    userInfoDiv.removeChild(logOutButton);
    getUser(currentUser.username);
  });

  startButton.style.display = "none";
  gameResults.innerHTML = ``;
  gameBoard = document.querySelector(".game-board");
  gameBoard.style.display = "block";
  currentBoard = new Board(currentUser);
  score.innerHTML = `Current Score: ${currentBoard.score}`;
  gameBoard.addEventListener("click", function(event) {
    results.innerHTML = "";
    square = event.target.id;
    fetchRandomWord();

    gameInformation.style.display = "block";
    currentBoard[square] = "clicked";
  });
});

function displayBoards() {
  savedGamesList.innerHTML = "";
  if (userBoards !== null) {
    document.getElementById("saved-games-heading").style.display = "block";
    userBoards.forEach(function(board) {
      let savedGameLi = document.createElement("li");
      // savedGameLi.style.display = "inline";
      savedGameLi.innerHTML = `<a href="#">${board.status}, ${board.score}</a>`;
      savedGamesList.appendChild(savedGameLi);
    });
  }
}

function fetchRandomWord() {
  fetch(`http://localhost:3000/api/v1/words`)
    .then(response => response.json())
    .then(function(word) {
      console.log("fetchRandomWord", word);
      displayWord(word);
    });
}

function displayWord(word) {
  console.log("displayWord", word);
  let wordDisplay = document.getElementById("word-display");
  wordDisplay.innerHTML = `${word.label}`;
  grabGuess(word);
}

function grabGuess(word) {
  let guessForm = document.getElementById("guess-form");
  guessForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let guessValue = document.getElementById("guess").value.toLowerCase();
    fetchSimilarWords(word, guessValue);
    var new_element = guessForm.cloneNode(true);
    guessForm.parentNode.replaceChild(new_element, guessForm);
  });
}

function fetchSimilarWords(word, guessValue) {
  console.log("fetchSimilarWords", word, guessValue);
  fetch(`http://api.datamuse.com/words?ml=${word.label}`)
    .then(response => response.json())
    .then(jsonData => {
      checkForMatches(jsonData, guessValue);
      console.log(jsonData);
    });
}

function checkForMatches(jsonData, guessValue) {
  console.log("checkForMatches", square);
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
    return;
  }
  if (
    currentBoard.r2c1 !== "" &&
    currentBoard.r2c1 === currentBoard.r2c2 &&
    currentBoard.r2c2 === currentBoard.r2c3
  ) {
    declareWinner(currentBoard.r2c1);
    return;
  }
  if (
    currentBoard.r3c1 !== "" &&
    currentBoard.r3c1 === currentBoard.r3c2 &&
    currentBoard.r3c2 === currentBoard.r3c3
  ) {
    declareWinner(currentBoard.r3c);
    return;
  }

  // vertical non-"" match
  if (
    currentBoard.r1c1 !== "" &&
    currentBoard.r1c1 === currentBoard.r2c1 &&
    currentBoard.r2c1 === currentBoard.r3c1
  ) {
    declareWinner(currentBoard.r1c1);
    return;
  }
  if (
    currentBoard.r1c2 !== "" &&
    currentBoard.r1c2 === currentBoard.r2c2 &&
    currentBoard.r2c2 === currentBoard.r3c2
  ) {
    declareWinner(currentBoard.r1c2);
    return;
  }
  if (
    currentBoard.r1c3 !== "" &&
    currentBoard.r1c3 === currentBoard.r2c3 &&
    currentBoard.r2c3 === currentBoard.r3c3
  ) {
    declareWinner(currentBoard.r1c3);
    return;
  }

  // downward diagnal non-""-match
  if (
    currentBoard.r1c1 !== "" &&
    currentBoard.r1c1 === currentBoard.r2c2 &&
    currentBoard.r2c2 === currentBoard.r3c3
  ) {
    declareWinner(currentBoard.r1c);
    return;
  }

  // upward diagnal non-""-match
  if (
    currentBoard.r3c1 !== "" &&
    currentBoard.r3c1 === currentBoard.r2c2 &&
    currentBoard.r2c2 === currentBoard.r1c3
  ) {
    declareWinner(currentBoard.r3c1);
    return;
  }
}

function declareWinner(winningSymbol) {
  startButton.style.display = "block";
  results.innerHTML = "";
  if (winningSymbol === "X") {
    gameResults.innerHTML = `You got three Xs in a row. You win!`;
  }
  if (winningSymbol === "O") {
    gameResults.innerHTML = `The computer got three Os in a row. You lose!`;
  }
  currentBoard.status = "completed";
  postBoard();
  gameSaveButton.style.display = "none";
}

function postBoard() {
  let data = {
    user_id: currentBoard.user_id,
    status: currentBoard.status,
    score: currentBoard.score,
    r1c1: currentBoard.r1c1,
    r1c2: currentBoard.r1c2,
    r1c3: currentBoard.r1c3,
    r2c1: currentBoard.r2c1,
    r2c2: currentBoard.r2c2,
    r2c3: currentBoard.r2c3,
    r3c1: currentBoard.r3c1,
    r3c2: currentBoard.r3c2,
    r3c3: currentBoard.r3c3
  };

  fetch(`http://localhost:3000/api/v1/boards`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(function(board) {
      console.log(board);
    });
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
