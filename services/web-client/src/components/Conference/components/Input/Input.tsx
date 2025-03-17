import styles from './Input.module.scss';
import { InputHTMLAttributes } from 'react';
import sendImage from './send.png';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	onClick: () => void;
}

export const Input = ({ placeholder, onClick, ...props }: InputProps) => {
	return (
		<div className={styles.root}>
			<input
				className={styles.input}
				placeholder={placeholder}
				{...props}
			></input>
			<img onClick={onClick} className={styles.sendButton} src={sendImage} />
		</div>
	);
};
