import { Routes, Route, Navigate } from 'react-router';
import { Join } from './components/Join/Join.tsx';
import { Conference } from './components/Conference/Conference.tsx';
import { socket } from './socket.ts';
import { useState, useEffect } from 'react';

export const App = () => {
	const [, setIsConnected] = useState(socket.connected);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};
	}, [socket.connected]);

	return (
		<Routes>
			<Route path='/' element={<Navigate to='sign-in' />} />
			<Route path='sign-in' element={<Join socket={socket} />} />
			<Route path='conference' element={<Conference socket={socket} />} />
		</Routes>
	);
};
