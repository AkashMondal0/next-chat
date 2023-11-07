import io from 'socket.io-client';
const socket = io(process.env.SOCKET_URL || "https://socket.skysolo.me/" as string);

export default socket;