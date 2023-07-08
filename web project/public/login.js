// Get the form element and add an event listener for the submit event
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the input values
  const usernameInput = document.querySelector('input[type="text"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Check if the username and password match the expected values
  if (username === "halima" && password === "halima") {
    alert("Login successful!"); // Replace this with your desired action
    // Redirect the user to a different page, for example:
     window.location.href = "/index";
  } else {
    alert("Invalid username or password."); // Replace this with your desired action
  }

  // Clear the input fields
  usernameInput.value = "";
  passwordInput.value = "";
});
