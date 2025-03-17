import styles from './Join.module.scss';
import { Socket } from 'socket.io-client';
import { FormEvent, useState } from 'react';
import { SubmitWindow } from './components/SubmitWindow/SubmitWindow';
import { ErrorWindow } from './components/ErrorWindow/ErrorWindow';
import { useNavigate } from 'react-router-dom';
import urlJoin from 'url-join';
import { authRegisterUrl } from '../../routes/routes';

export const Join = ({ socket }: { socket: Socket }) => {
	const [isErrors, setIsErrors] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigator = useNavigate();

	const handleSubmit = async (event: FormEvent, name: string) => {
		event.preventDefault();

		if (name.trim() !== '') {
			try {
				setIsErrors(false);
				const response = await fetch(
					urlJoin(import.meta.env.VITE_API_URL, authRegisterUrl),
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ userName: name }),
					}
				);

				if (!response.ok) {
					const data = await response.json();
					setErrorMessage(data?.message);
					throw new Error('Ошибка при отправке данных');
				}

				const data = await response.json();
				if (data) {
					navigator(`/conference?name=${name}`);
				}
			} catch (error) {
				console.error('Ошибка:', error);
				setIsErrors(true);
			}
		}
	};

	if (!socket.connected) {
		return <h1>Сервис временно не доступен!</h1>;
	}

	return (
		<div className={styles.root}>
			{isErrors ? (
				<ErrorWindow handleError={setIsErrors} errorMessage={errorMessage} />
			) : (
				<SubmitWindow handleSubmit={handleSubmit} />
			)}
		</div>
	);
};
