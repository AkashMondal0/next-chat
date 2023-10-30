import io from 'socket.io-client';
//"https://socket.skysolo.me/" ||
const socket = io("http://localhost:3003" as string);

export default socket;