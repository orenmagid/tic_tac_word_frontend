document.getElementById("user-info").addEventListener("submit", event => {
  event.preventDefault();
  let username = document.getElementById("username").value;
  getUser(username);
});

let currentUser;

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
