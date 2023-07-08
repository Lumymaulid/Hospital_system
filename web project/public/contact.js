
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    var messageInput = document.getElementById("message-input").value;
    console.log("Message:", messageInput);

    var confirmationElement = document.createElement("p");
    confirmationElement.textContent = "Message Sent";
    confirmationElement.style.color = "green";
    var containerElement = document.querySelector(".container");
    containerElement.appendChild(confirmationElement);
  

    document.getElementById("contact-form").reset();
  });
  