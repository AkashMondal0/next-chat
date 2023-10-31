import io from 'socket.io-client';
//"https://socket.skysolo.me/" ||
const socket = io("http://192.168.31.232:3003" as string);

export default socket;