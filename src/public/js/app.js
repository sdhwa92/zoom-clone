const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connection to the Server: ✅");
});

socket.addEventListener("close", () => {
  console.log("Connection to the Server: ❌");
});

socket.addEventListener("message", (message) => {
  console.log("New message:", message.data);
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  const value = input.value;
  socket.send(value);
  input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
