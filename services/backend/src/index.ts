import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import connectedToDatabase from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import { OK } from './constants/http';
import authRoutes from './routes/auth.route';
import quitRoutes from './routes/quite.route';
import joinRoom from './routes/join.route';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { auth } from './socket/services/socket/auth';
import { onConnection } from './socket/services/socket/onConnection';

const app = express();
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: APP_ORIGIN,
		credentials: true,
	},
});

io.use(auth);

io.on('connection', onConnection);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api/join', joinRoom);

app.use('/api/quit', quitRoutes);

app.use(errorHandler);

connectedToDatabase().then(() => {
	server.listen(PORT, async () => {
		console.log(
			`Server is running on port: ${PORT} in ${NODE_ENV} environment`
		);
	});
});
