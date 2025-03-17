import styles from './Input.module.scss';
import { InputHTMLAttributes } from 'react';
import { useState } from 'react';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
}

const errorMessage = '* Please enter your name';

export const Input = ({ placeholder, ...props }: InputProps) => {
	const { value } = props;
	const [isError, setIsError] = useState(false);

	const onBlurHandler = () => setIsError(value === '');

	return (
		<div className={classNames(styles.root, { [styles.errorMargin]: isError })}>
			<input
				className={classNames(styles.input, { [styles.errorBorder]: isError })}
				placeholder={placeholder}
				onBlur={onBlurHandler}
				{...props}
			></input>
			{isError && <span className={styles.errorMessage}>{errorMessage}</span>}
		</div>
	);
};
