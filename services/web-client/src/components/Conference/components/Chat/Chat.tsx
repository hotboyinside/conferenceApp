import styles from './Chat.module.scss';
import classNames from 'classnames';
import { Message } from '../Message/Message';
import { Input } from '../Input/Input';
import { useEffect, useState, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router';
import { getLastChatMessages } from '../../../../routes/routes';
import urlJoin from 'url-join';

interface Message {
	_id: string;
	text?: string;
	name: string;
	sendTime: string;
}

const GET_MESSAGES_URL = urlJoin(
	import.meta.env.VITE_API_URL,
	getLastChatMessages
);

export const Chat = ({
	socket,
	isOpenChat,
}: {
	socket: Socket;
	isOpenChat: boolean;
}) => {
	const [searchParams] = useSearchParams();
	const userName = searchParams.get('name') || '';
	const [message, setMessage] = useState('');
	const [allMessages, setAllMessages] = useState<Message[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const fetchLastChatMessages = async () => {
		try {
			const response = await fetch(GET_MESSAGES_URL);
			const data = await response.json();
			setAllMessages(data.messages);
		} catch (err) {
			console.log(err);
		}
	};

	const onClickSendMessage = () => {
		socket.emit('message:send', {
			text: message,
			name: userName,
			sendTime: new Date(),
		});
		setMessage('');
	};

	useEffect(() => {
		const getMessages = (data: Message) => {
			setAllMessages(prevMessages => [...prevMessages, data]);
		};
		socket.on('message', getMessages);

		return () => {
			socket.off('message', getMessages);
		};
	}, [socket]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [allMessages]);

	useEffect(() => {
		fetchLastChatMessages();
	}, []);

	return (
		<div className={styles.root}>
			<div
				className={classNames(styles.container, { [styles.show]: isOpenChat })}
			>
				<h2 className={styles.title}>Chat</h2>
				<span className={styles.divider}></span>
				<div className={styles.messageContainer}>
					<div className={styles.messages}>
						{allMessages.map(message => {
							return (
								<Message
									key={`${message._id}${message.sendTime}`}
									userName={userName}
									{...message}
								/>
							);
						})}
						<div ref={messagesEndRef} className={styles.lastMessage}></div>
					</div>
				</div>

				<div className={styles.controlsContainer}>
					<div className={styles.controls}>
						<Input
							onClick={onClickSendMessage}
							value={message}
							onChange={e => setMessage(e.target.value)}
							placeholder='Start typing'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
