import { io } from "socket.io-client";         // Import socket.io-client
import { serverEndpoint } from "./appConfig";  // Import your backend server endpoint

const socket = io(serverEndpoint);             // Connect to the backend via socket

export default socket;                         // Export the socket instance
