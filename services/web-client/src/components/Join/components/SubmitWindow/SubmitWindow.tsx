import styles from './SubmitWindow.module.scss';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import decoration from './decoration.png';
import { FormEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export const SubmitWindow = ({
	handleSubmit,
}: {
	handleSubmit: (event: FormEvent, name: string) => void;
}) => {
	const [name, setName] = useState('');

	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<img className={styles.image} src={decoration} alt='decoration' />
				<h2 className={styles.title}>Enter your name</h2>
				<Input
					name='name'
					value={name}
					placeholder='Name'
					type='text'
					onChange={e => {
						setName(e.target.value);
					}}
				/>
				<Button onClick={event => handleSubmit(event, name)}>
					Join the room
				</Button>
			</div>
		</div>
	);
};
