import io from 'socket.io-client';

const socket = io(process.env.SOCKET_URL || "http://localhost:3003" as string);

export default socket;