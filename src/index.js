let currentUser;
let gameBoard = document.querySelector(".game-board");
let currentBoard;
let gameInformation = document.getElementById("game-information");
let score = document.getElementById("current-game-score");
let results = document.getElementById("word-results");
let gameResults = document.getElementById("game-results");
let square;
let startButton = document.getElementById("start-button");
let gameSaveButton = document.getElementById("save-game-button");
let savedGamesList = document.getElementById("saved-games-list");
let userBoards;
let userInfoDiv = document.getElementById("user-info");
let logOutButton;
let currentGameDiv = document.getElementById("current-game-info");
let savedGamesHeading = document.getElementById("saved-games-heading");
let loginForm = document.getElementById("user-form");
let userInfoH3 = document.getElementById("username-display");
let leaderBoardList = document.getElementById("leader-board-list");
let leaderBoardHeader = document.getElementById("leader-board-header");
let leaderBoardDiv = document.getElementById("leader-board-div");
let winningWordsList = document.getElementById("winning-words-list");
let winningWordsDiv = document.getElementById("winning-words-div");
let winningWordsHeading = document.getElementById("winning-words-heading");

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Set up event listener on submit button of login form
loginForm.addEventListener("submit", event => {
  event.preventDefault();
  userInfoDiv.style.display = "block";
  leaderBoardDiv.style.display = "block";

  let username = document.getElementById("username-input").value;
  getUser(username);
  getBoards();
  document.getElementById("username-input").value = ``;
  gameSaveButton.addEventListener("click", () => saveGame());
  gameSaveButton.style.display = "none";
  console.log("Added Event Listener to Save Game Button.");
});

// Fetches all boards from backend
function getBoards() {
  leaderBoardList.innerHTML = "";
  console.log("getBoards");
  fetch(`https://shielded-castle-10591.herokuapp.com/api/v1/boards`)
    .then(response => response.json())
    .then(boards => {
      if (boards.length > 0) {
        reduceToTopTenBoards(boards);
      } else {
        let leaderBoardLi = document.createElement("li");
        leaderBoardLi.innerHTML = `You are the first person to play this game, intrepid gamer that you are! Grab that high score while you can!`;
        leaderBoardList.appendChild(leaderBoardLi);
      }
    });
}

function reduceToTopTenBoards(boards) {
  console.log(boards);
  let winLoseDrawBoards = boards.filter(function(board) {
    return (
      board.status === "Won" ||
      board.status === "Lost" ||
      board.status === "Draw"
    );
  });
  let sortedWinLoseDrawBoard = winLoseDrawBoards
    .sort(function(a, b) {
      return a.score - b.score;
    })
    .reverse();
  displayLeaderBoards(sortedWinLoseDrawBoard);
}

function displayLeaderBoards(sortedWinLoseDrawBoard) {
  if (sortedWinLoseDrawBoard.length < 10) {
    for (var i = 0; i < sortedWinLoseDrawBoard.length; i++) {
      let leaderBoardLi = document.createElement("li");
      let board = sortedWinLoseDrawBoard[i];
      leaderBoardLi.innerHTML = `${board.user.username} -- Score: ${
        board.score
      } -- Status: ${board.status} -- Date: ${board.play_date}`;
      leaderBoardList.appendChild(leaderBoardLi);
    }
  } else {
    for (var i = 0; i < 10; i++) {
      let leaderBoardLi = document.createElement("li");
      let board = sortedWinLoseDrawBoard[i];
      leaderBoardLi.innerHTML = `${board.user.username} -- Score: ${
        board.score
      } -- Status: ${board.status} -- Date: ${board.play_date}`;
      leaderBoardList.appendChild(leaderBoardLi);
    }
  }
}

// Fetches all users from backend
function getUser(username) {
  console.log("getUser");
  fetch(`https://shielded-castle-10591.herokuapp.com/api/v1/users`)
    .then(response => response.json())
    .then(function(users) {
      checkForExistingUser(users, username);
    });
}

// checks to see if username given matches any of users fetched from backend
function checkForExistingUser(users, username) {
  console.log("checkForExistingUser");
  users.forEach(function(user) {
    // if username already exists in backend,
    // create JS user object and set equal to currentUser
    // call displayUser
    if (user.username === username) {
      currentUser = new User(user.username, user.id);
      userBoards = user.boards;
      displayUser();
    }
  });
  // if currentUser doesn't exist, call postUser
  if (currentUser === undefined || currentUser === null) {
    userBoards = null;
    postUser(username);
  }
}

// make fetch request to create new user on backend
// then calls displayUser
function postUser(username) {
  console.log("postUser");
  let data = { username: username };

  fetch(`https://shielded-castle-10591.herokuapp.com/api/v1/users`, {
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

// display username, welcome message
// creates logout button
// sets events listener on start button, so user can start game
function displayUser() {
  console.log("displayUser");
  userInfoH3.innerHTML = `Currently logged in as: ${currentUser.username}`;

  logOutButton = document.createElement("button");
  logOutButton.innerHTML = "Log Out";
  userInfoDiv.appendChild(logOutButton);

  loginForm.style.display = "none";
  startButton.style.display = "block";

  startButton.addEventListener("click", () => startNewGame());

  logOutButton.addEventListener("click", () => logOut());
  displayBoards();
}

// starts new game
function startNewGame() {
  clearBoard();

  document.getElementById("r1c1").classList.remove("selected-space");
  document.getElementById("r1c2").classList.remove("selected-space");
  document.getElementById("r1c3").classList.remove("selected-space");
  document.getElementById("r2c1").classList.remove("selected-space");
  document.getElementById("r2c2").classList.remove("selected-space");
  document.getElementById("r2c3").classList.remove("selected-space");
  document.getElementById("r3c1").classList.remove("selected-space");
  document.getElementById("r3c2").classList.remove("selected-space");
  document.getElementById("r3c3").classList.remove("selected-space");

  startButton.style.display = "none";
  gameResults.innerHTML = ``;
  gameBoard = document.querySelector(".game-board");
  gameBoard.style.display = "block";
  currentBoard = new Board(currentUser);
  score.innerHTML = `Current Score: ${currentBoard.score}`;
  console.log("Add event listener to gameBoard");
  gameBoard.addEventListener("click", squareClicked);
}

// when square has been clicked, sets off chain of events
// by calling fetchRandomWord
function squareClicked(event) {
  gameBoard.removeEventListener("click", squareClicked);
  event.target.classList.add("selected-space");
  if (gameSaveButton.style.display === "none") {
    gameSaveButton.style.display = "block";
  }
  results.innerHTML = "";
  square = event.target.id;
  fetchRandomWord();

  gameInformation.style.display = "block";
  currentBoard[square] = "clicked";
}

// logs user out
function logOut() {
  currentUser = null;
  userInfoDiv.style.display = "none";
  userInfoH3.innerHTML = ``;
  userInfoDiv.removeChild(logOutButton);
  loginForm.style.display = "block";
  startButton.style.display = "none";
  clearBoard();
  gameInformation.style.display = "none";
  gameBoard.style.display = "none";

  gameResults.innerHTML = ``;
  results.innerHTML = ``;
  score.innerHTML = "";
  savedGamesList.innerHTML = "";
  leaderBoardDiv.style.display = "none";
}

function saveGame() {
  console.log("Inside 'saveGame' function");
  gameBoard.removeEventListener("click", squareClicked);
  startButton.style.display = "block";
  gameInformation.style.display = "none";
  if (currentBoard.status === "New") {
    postBoard();
  } else {
    patchBoard();
  }

  results.innerHTML = "";
  score.innerHTML = "";
  gameSaveButton.style.display = "none";
  gameBoard.style.display = "none";
}

function displayBoards() {
  console.log("displayBoards");
  savedGamesList.innerHTML = "";
  if (userBoards !== null && userBoards.length !== 0) {
    savedGamesHeading.style.display = "block";
    userBoards.forEach(function(board) {
      console.log(board);
      createAndAppendSavedGameLi(board);
    });
  } else {
    savedGamesHeading.style.display = "none";
  }
}

function createAndAppendSavedGameLi(board) {
  let savedGameLi = document.createElement("li");
  if (board.status === "In Progress") {
    savedGameLi.innerHTML = `<a href="#">Date: ${board.play_date} -- Status: ${
      board.status
    } -- Score: ${board.score}</a>`;
    savedGameLi.id = `board-${board.id}`;
    savedGamesList.appendChild(savedGameLi);
    savedGameLi.addEventListener("click", () => loadSavedBoard(board));
  } else {
    savedGameLi.innerHTML = `Date: ${board.play_date} -- Status: ${
      board.status
    } -- Score: ${board.score}`;
    savedGamesList.appendChild(savedGameLi);
  }
}

function fetchRandomWord() {
  fetch(`https://shielded-castle-10591.herokuapp.com/api/v1/words`)
    .then(response => response.json())
    .then(function(word) {
      console.log("fetchRandomWord", word);
      console.log(word.users);
      if (word.users.length !== 0) {
        let i = 0;
        word.users.forEach(function(user) {
          if (
            user.id === currentUser.id &&
            user.username === currentUser.username
          ) {
            console.log(word, "Already Played!!!!!");
            fetchRandomWord();
            return;
          } else {
            i++;
          }

          displayWord(word);
          patchWord(word);
          return;
        });
      } else {
        displayWord(word);
        patchWord(word);
      }
    });
}

function patchWord(word) {
  let data = { user_ids: currentUser.id };
  fetch(`https://shielded-castle-10591.herokuapp.com/api/v1/words/${word.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(word => {
      console.log(word);
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
    gameBoard.addEventListener("click", squareClicked);
    event.preventDefault();
    let guessValue = document.getElementById("guess").value.toLowerCase();
    fetchSimilarWords(word, guessValue);
    let newGuessForm = guessForm.cloneNode(true);
    if (guessForm.parentNode !== null) {
      guessForm.parentNode.replaceChild(newGuessForm, guessForm);
    }
  });
}

function fetchSimilarWords(word, guessValue) {
  console.log("fetchSimilarWords", word, guessValue);
  fetch(`https://api.datamuse.com/words?ml=${word.label}&max=500`)
    .then(response => response.json())
    .then(jsonData => {
      checkForMatches(jsonData, guessValue, word);
      console.log(jsonData);
    });
}

function checkForMatches(jsonData, guessValue, word) {
  console.log("checkForMatches", square);
  let simpleReturnedWordArray = jsonData.map(function(returnedWord) {
    return returnedWord.word;
  });

  if (simpleReturnedWordArray.indexOf(guessValue) === -1) {
    displayLose();
    displayWinningWords(jsonData, word);
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

function displayWinningWords(jsonData, word) {
  winningWordsHeading.innerHTML = `Top Ten High Scoring Words for "${toTitleCase(
    word.label
  )}"`;

  if (jsonData.length < 10) {
    for (var i = 0; i < jsonData.length; i++) {
      let winningWordLi = document.createElement("li");
      winningWordsList.appendChild(winningWordLi);
      winningWordLi.innerHTML = `${toTitleCase(
        jsonData[i].word
      )} -- Score: ${Math.floor(
        (jsonData[i].score / jsonData[0].score) * 100
      )}`;
    }
  }

  for (var i = 0; i < 10; i++) {
    let winningWordLi = document.createElement("li");
    winningWordsList.appendChild(winningWordLi);
    winningWordLi.innerHTML = `${toTitleCase(jsonData[i].word)} -- ${Math.floor(
      (jsonData[i].score / jsonData[0].score) * 100
    )} points`;
  }
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
  console.log("Inside checkforWinner function");
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
    declareWinner(currentBoard.r3c1);
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
    declareWinner(currentBoard.r1c1);
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

  // ends in a draw/tie
  if (
    (currentBoard.r1c1 === "X" || currentBoard.r1c1 === "O") &&
    (currentBoard.r1c2 === "X" || currentBoard.r1c2 === "O") &&
    (currentBoard.r1c3 === "X" || currentBoard.r1c3 === "O") &&
    (currentBoard.r2c1 === "X" || currentBoard.r2c1 === "O") &&
    (currentBoard.r2c2 === "X" || currentBoard.r2c2 === "O") &&
    (currentBoard.r2c3 === "X" || currentBoard.r2c3 === "O") &&
    (currentBoard.r3c1 === "X" || currentBoard.r3c1 === "O") &&
    (currentBoard.r3c2 === "X" || currentBoard.r3c2 === "O") &&
    (currentBoard.r3c3 === "X" || currentBoard.r3c3 === "O")
  ) {
    declareDraw();
    return;
  }
}

function declareWinner(winningSymbol) {
  console.log("Inside declare winner function");
  gameBoard.removeEventListener("click", squareClicked);
  startButton.style.display = "block";
  results.innerHTML = "";
  if (winningSymbol === "X") {
    gameResults.innerHTML = `You got three Xs in a row. You win! We've added 100 points to your overall score.`;
    currentBoard.status = "Won";
    currentBoard.score += 100;
    score.innerHTML = `Current Score: ${currentBoard.score}`;
  }
  if (winningSymbol === "O") {
    gameResults.innerHTML = `The computer got three Os in a row. You lose! We've subtracted 100 points from your overall score.`;
    currentBoard.status = "Lost";
    currentBoard.score -= 100;
    score.innerHTML = `Current Score: ${currentBoard.score}`;
  }
  if (currentBoard.id === null) {
    postBoard();
  } else {
    patchBoard();
  }
  gameSaveButton.style.display = "none";
}

function declareDraw() {
  gameBoard.removeEventListener("click", squareClicked);
  startButton.style.display = "block";
  results.innerHTML = "";
  gameResults.innerHTML = `Game Over! No winner here!`;
  currentBoard.status = "Draw";
  if (currentBoard.id === null) {
    postBoard();
  } else {
    patchBoard();
  }
  gameSaveButton.style.display = "none";
}

function postBoard() {
  console.log("Inside function 'postBoard'");
  let data = {
    user_id: currentBoard.user_id,
    status: currentBoard.status === "New" ? "In Progress" : currentBoard.status,
    score: currentBoard.score,
    play_date: new Date().toLocaleDateString("en-US"),
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

  fetch(`https://shielded-castle-10591.herokuapp.com/api/v1/boards`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(function(board) {
      console.log(board);
      createAndAppendSavedGameLi(board);
      getBoards();
    });
}

function patchBoard() {
  let data = {
    user_id: currentBoard.user_id,
    status: currentBoard.status === "New" ? "In Progress" : currentBoard.status,
    score: currentBoard.score,
    play_date: new Date().toLocaleDateString("en-US"),
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

  fetch(
    `https://shielded-castle-10591.herokuapp.com/api/v1/boards/${
      currentBoard.id
    }`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => response.json())
    .then(function(board) {
      console.log("Just ran 'patchBoard' function", board);
      let liToDelete = document.getElementById(`board-${board.id}`);
      liToDelete.parentNode.removeChild(liToDelete);
      createAndAppendSavedGameLi(board);
      getBoards();
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

function loadSavedBoard(board) {
  console.log("loadSavedBoard");
  let startButton = document.getElementById("start-button");
  startButton.style.display = "none";

  gameResults.innerHTML = "";

  gameBoard.style.display = "block";
  gameSaveButton.style.display = "block";

  currentBoard = new Board(currentUser);

  currentBoard.id = board.id;

  currentBoard.status = board.status;
  currentBoard.score = board.score;

  currentBoard.r1c1 = board.r1c1;
  currentBoard.r1c2 = board.r1c2;
  currentBoard.r1c3 = board.r1c3;
  currentBoard.r2c1 = board.r2c1;
  currentBoard.r2c2 = board.r2c2;
  currentBoard.r2c3 = board.r2c3;
  currentBoard.r3c1 = board.r3c1;
  currentBoard.r3c2 = board.r3c2;
  currentBoard.r3c3 = board.r3c3;

  document.getElementById("r1c1").innerHTML =
    board.r1c1 === "clicked" ? "" : board.r1c1;
  document.getElementById("r1c2").innerHTML =
    board.r1c2 === "clicked" ? "" : board.r1c2;
  document.getElementById("r1c3").innerHTML =
    board.r1c3 === "clicked" ? "" : board.r1c3;
  document.getElementById("r2c1").innerHTML =
    board.r2c1 === "clicked" ? "" : board.r2c1;
  document.getElementById("r2c2").innerHTML =
    board.r2c2 === "clicked" ? "" : board.r2c2;
  document.getElementById("r2c3").innerHTML =
    board.r2c3 === "clicked" ? "" : board.r2c3;
  document.getElementById("r3c1").innerHTML =
    board.r3c1 === "clicked" ? "" : board.r3c1;
  document.getElementById("r3c2").innerHTML =
    board.r3c2 === "clicked" ? "" : board.r3c2;
  document.getElementById("r3c3").innerHTML =
    board.r3c3 === "clicked" ? "" : board.r3c3;

  score.innerHTML = `Current Score: ${currentBoard.score}`;
  gameBoard.addEventListener("click", squareClicked);
}
