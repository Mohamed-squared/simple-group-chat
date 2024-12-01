const API_BASE_URL = "http://127.0.0.1:5000/api"; // Ensure this matches your Flask server

// Get DOM elements
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const messagesDiv = document.getElementById("messages");

// Fetch messages from the API and update the chat
async function fetchMessages() {
    try {
        const response = await fetch(`${API_BASE_URL}/messages/receive`);
        const messages = await response.json();

        // Clear the chat and render messages
        messagesDiv.innerHTML = "";
        messages.forEach(msg => {
            const messageElement = document.createElement("div");
            messageElement.textContent = `${msg.username}: ${msg.message}`;
            messagesDiv.appendChild(messageElement);
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Send a message to the API
async function sendMessage(username, message) {
    try {
        await fetch(`${API_BASE_URL}/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, message }),
        });
        chatInput.value = "";
        fetchMessages(); // Refresh the messages
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Event listener for the chat form submission
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const message = chatInput.value.trim();

    if (username && message) {
        sendMessage(username, message);
    } else {
        alert("Please enter both a username and a message.");
    }
});

// Periodically fetch messages to keep the chat updated
setInterval(fetchMessages, 3000); // Fetch every 3 seconds

// Initial fetch to populate the chat
fetchMessages();
