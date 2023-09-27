import io from 'socket.io-client';


console.log(import.meta.env.MODE, window.location.origin)
const isDev = !!import.meta.env.MODE && import.meta.env.MODE === "development"
const url = isDev ? "http://localhost:4000" : window.location.origin

const socketOptions = {
	autoConnect: false,
	reconnection: false,
	withCredentials: true,
	transports: ["websocket"]
}

const socket = io(url, socketOptions);
export default socket;
