import { Socket } from 'socket.io-client';
import styles from './Conference.module.scss';
import { Chat } from './components/Chat/Chat';
import { useEffect, useState } from 'react';
import urlJoin from 'url-join';
import {
	LiveKitRoom,
	RoomAudioRenderer,
	TrackLoop,
	useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { UserVideo } from './components/UserVideo/UserVideo';
import VideoControls from './components/VideoControls/VideoControls';
import { useNavigate, useSearchParams } from 'react-router';
import { joinToConferenceUrl, quitToConferenceUrl } from '../../routes/routes';

const LIVEKIT_API_URL = import.meta.env.VITE_API_WS_URL;

const GET_TOKEN_URL = urlJoin(
	import.meta.env.VITE_API_URL,
	joinToConferenceUrl
);

const DELETE_USER_URL = urlJoin(
	import.meta.env.VITE_API_URL,
	quitToConferenceUrl
);

export const Conference = ({ socket }: { socket: Socket }) => {
	const [searchParams] = useSearchParams();
	const userName = searchParams.get('name') || '';
	const [token, setToken] = useState<string>('');
	const [isOpenChat, setIsOpenChat] = useState(false);
	const navigator = useNavigate();

	const onClickOpenChat = () => {
		setIsOpenChat(prev => !prev);
	};

	const fetchToken = async () => {
		try {
			const response = await fetch(`${GET_TOKEN_URL}?userName=${userName}`);
			if (!response.ok) {
				throw new Error('Ошибка при получении токена');
			}
			const data = await response.json();
			setToken(data.token);
		} catch (err) {
			console.log(err);
		}
	};

	const onDeleteUser = async () => {
		try {
			const response = await fetch(DELETE_USER_URL, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userName }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Не удалось удалить пользователя');
			}
			navigator('/sign-in');
		} catch (error) {
			console.error('Ошибка удаления пользователя:', error);
		}
	};

	useEffect(() => {
		fetchToken();

		window.addEventListener('unload', onDeleteUser);

		return () => {
			window.removeEventListener('unload', onDeleteUser);
		};
	}, []);

	if (!token) return <div>Загрузка...</div>;

	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<LiveKitRoom
					connect
					video={true}
					audio={true}
					token={token}
					serverUrl={LIVEKIT_API_URL}
					className={styles.room}
				>
					<VideoConference />
					<VideoControls
						isOpenChat={isOpenChat}
						onClickOpenChat={onClickOpenChat}
						onDeleteUser={onDeleteUser}
					/>
					<RoomAudioRenderer />
				</LiveKitRoom>
			</div>

			<Chat isOpenChat={isOpenChat} socket={socket} />
		</div>
	);
};

const VideoConference = () => {
	const tracks = useTracks(
		[{ source: Track.Source.Camera, withPlaceholder: true }],
		{ onlySubscribed: false }
	);
	return (
		<TrackLoop tracks={tracks}>
			<UserVideo />
		</TrackLoop>
	);
};
