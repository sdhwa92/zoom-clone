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

setTimeout(() => {
  socket.send("Hello from the browser!");
}, 10000);
