const socket = new WebSocket('ws://localhost:8082/game');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
};

socket.onmessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data);
  console.log('Game update:', data);
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

export default socket;
