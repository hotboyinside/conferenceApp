import styles from './ErrorWindow.module.scss';
import { Button, Variant } from '../Button/Button';
import decoration from './decoration.png';

export const ErrorWindow = ({
	handleError,
	errorMessage,
}: {
	handleError: (value: boolean) => void;
	errorMessage: string;
}) => {
	return (
		<div className={styles.root}>
			<div className={styles.content}>
				<img className={styles.image} src={decoration} alt='decoration' />
				<h2 className={styles.title}>{errorMessage}</h2>
				<Button variant={Variant.White} onClick={() => handleError(false)}>
					Back
				</Button>
			</div>
		</div>
	);
};
