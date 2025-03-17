import { format } from 'date-fns';
import styles from './Message.module.scss';
import classNames from 'classnames';

export const Message = ({
	userName,
	name,
	text,
	sendTime,
}: {
	userName: string;
	name: string;
	text?: string;
	sendTime: string;
}) => {
	const isOwnMessage = userName === name;
	const dateOfMessageFromBackend = new Date(sendTime);
	const timeOfMessage = format(dateOfMessageFromBackend, 'HH:mm');

	return (
		<div
			className={classNames(styles.root, {
				[styles.messageRight]: isOwnMessage,
			})}
		>
			<p
				className={classNames(styles.name, {
					[styles.blueName]: isOwnMessage,
				})}
			>
				{isOwnMessage ? 'You' : name}
			</p>
			<div className={styles.message}>
				<p className={styles.text}>{text || ''}</p>
				<span className={styles.divider}>·</span>
				<span className={styles.time}>{timeOfMessage}</span>
			</div>
		</div>
	);
};
