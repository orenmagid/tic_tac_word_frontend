document.getElementById("user-info").addEventListener("submit", event => {
  event.preventDefault();
  let user = new User(document.getElementById("username").value);
  console.log(user);
});
