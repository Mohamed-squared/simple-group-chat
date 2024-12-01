const apiUrl = "https://discord.com/oauth2/authorize?client_id=1312760383257182238&permissions=8&integration_type=0&scope=bot"; // Replace with your API URL

document.getElementById("sendMessage").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!username || !message) {
    alert("Username and message are required!");
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, message }),
  })
    .then(response => {
      if (response.ok) {
        document.getElementById("message").value = ""; // Clear message box
      } else {
        alert("Failed to send message.");
      }
    });
});

// Fetch and display messages
setInterval(() => {
  fetch(apiUrl + "/receive")
    .then(response => response.json())
    .then(messages => {
      const chatBox = document.getElementById("chatBox");
      chatBox.innerHTML = ""; // Clear old messages
      messages.forEach(msg => {
        const messageElement = document.createElement("p");
        messageElement.textContent = `${msg.username}: ${msg.message}`;
        chatBox.appendChild(messageElement);
      });
    });
}, 3000);
