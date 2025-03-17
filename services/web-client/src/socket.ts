import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_API_URL;

export const socket = io(SOCKET_URL);
