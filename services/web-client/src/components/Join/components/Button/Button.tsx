import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

export enum Variant {
	Primary = 'primary',
	White = 'white',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	variant = Variant.Primary,
	children,
	...props
}) => {
	return (
		<button
			{...props}
			className={classNames(styles.button, styles.primary, {
				[styles.white]: variant === Variant.White,
			})}
		>
			{children}
		</button>
	);
};
