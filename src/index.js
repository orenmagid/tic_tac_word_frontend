document.getElementById("user-info").addEventListener("submit", event => {
  event.preventDefault();
  new User(document.getElementById("username").value);
});
