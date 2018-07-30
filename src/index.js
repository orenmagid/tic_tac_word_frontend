document.getElementById("user-form").addEventListener("submit", event => {
  document.getElementById("username").value = ``;
  event.preventDefault();

  let username = document.getElementById("username").value;
  getUser(username);
});

let currentUser;
let gameBoard = document.querySelector(".game-board");
let currentBoard;
let gameInformation;
let score = document.getElementById("score");
let results = document.getElementById("results");

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
      console.log(currentUser);
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
      console.log(currentUser);
    });
}

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", function() {
  gameBoard = document.querySelector(".game-board");
  gameBoard.style.display = "block";
  currentBoard = new Board(currentUser);
  gameBoard.addEventListener("click", function(event) {
    results.innerHTML = "";
    let squareClicked = event.target.id;
    fetchRandomWord(squareClicked);
    gameInformation = document.getElementById("game-information");
    gameInformation.style.display = "block";
    currentBoard[squareClicked] = "clicked";
    console.log(squareClicked);
  });
});

function fetchRandomWord(squareClicked) {
  fetch(`http://localhost:3000/api/v1/words`)
    .then(response => response.json())
    .then(word => displayWord(word, squareClicked));
}

function displayWord(word, square) {
  let wordDisplay = document.getElementById("word");
  wordDisplay.innerHTML = `${word.label}`;
  let guessButton = document.getElementById("guess-button");
  guessButton.addEventListener("click", function(event) {
    let guessValue = document.getElementById("guess").value.toLowerCase();

    fetchSimilarWords(word, guessValue, square);
  });
}

function fetchSimilarWords(word, guessValue, square) {
  fetch(`http://api.datamuse.com/words?ml=${word.label}`)
    .then(response => response.json())
    .then(jsonData => {
      checkforMatches(jsonData, guessValue, square);
    });
}

function checkforMatches(jsonData, guessValue, square) {
  let simpleReturnedWordArray = jsonData.map(function(returnedWord) {
    return returnedWord.word;
  });

  if (simpleReturnedWordArray.indexOf(guessValue) === -1) {
    displayLose(square);
  } else {
    jsonData.forEach(function(returnedWord) {
      if (guessValue == returnedWord.word) {
        displayWin(square, returnedWord, jsonData);
      }
    });
  }

  gameInformation.style.display = "none";
  let guessInput = document.getElementById("guess");
  guessInput.value = "";
}

function displayLose(square) {
  console.log("displayLose", square);
  results.innerHTML = "Nope! The computer gets an O!";
  currentBoard[square] = "O";
  document.getElementById(`${square}`).innerHTML = "O";
}

function displayWin(square, returnedWord, jsonData) {
  console.log("displayWin");
  score.innerHTML = `Score: ${(currentBoard.score += Math.floor(
    (returnedWord.score / jsonData[0].score) * 100
  ))}`;
  results.innerHTML = `Correct! You've earned ${Math.floor(
    (returnedWord.score / jsonData[0].score) * 100
  )} points with the word "${returnedWord.word}".`;

  document.getElementById(`${square}`).innerHTML = "X";
  currentBoard[square] = "X";
}
