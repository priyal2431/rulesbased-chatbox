document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const messageInput = document.getElementById("messageInput");
  const messages = document.getElementById("messages");

  function addMessage(text, sender = "user") {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg", sender === "bot" ? "msg-bot" : "msg-user");

    msgDiv.innerHTML = `
      <div class="bubble">
        <p class="mb-1">${text}</p>
        <time class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
      </div>
    `;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    messageInput.value = "";

    try {
      const res = await fetch("/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: text })
      });

      const data = await res.json();
      addMessage(data.reply, "bot");
    } catch (err) {
      addMessage("⚠️ Error connecting to server.", "bot");
    }
  });
});
