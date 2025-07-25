import { io } from 'socket.io-client';

const URL = 'http://localhost:3333';

export const socket = io(URL);

socket.on('connect', () => {
  console.log('Conectado al servidor de socket.io');
});
socket.on('connect_error', (err) => {
  console.log(err.message);
});
