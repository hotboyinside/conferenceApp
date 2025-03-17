import { TrackToggle, DisconnectButton } from '@livekit/components-react';
import classNames from 'classnames';
import styles from './VideoControls.module.scss';
import { Track } from 'livekit-client';
import { useState } from 'react';
import { MicrophoneOffIcon } from './icons/MicrophoneOffIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { VideoOffIcon } from './icons/VideoOffIcon';
import { VideoIcon } from './icons/VideoIcon';
import { OpenChatIcon } from './icons/OpenChatIcon';
import { TurnOffIcon } from './icons/TurnOffIcon';

const VideoControls = ({
	isOpenChat,
	onClickOpenChat,
	onDeleteUser,
}: {
	isOpenChat: boolean;
	onClickOpenChat: () => void;
	onDeleteUser: () => void;
}) => {
	const [microphoneClicked, setMicrophoneClicked] = useState(false);
	const [videoClicked, setVideoClicked] = useState(false);

	return (
		<div className={styles.root}>
			<TrackToggle
				className={styles.toggle}
				showIcon={false}
				source={Track.Source.Microphone}
			>
				{microphoneClicked ? (
					<MicrophoneOffIcon
						className={styles.greyBtn}
						onClick={() => setMicrophoneClicked(prev => !prev)}
					/>
				) : (
					<MicrophoneIcon
						className={styles.greyBtn}
						onClick={() => setMicrophoneClicked(prev => !prev)}
					/>
				)}
			</TrackToggle>

			<TrackToggle
				className={styles.toggle}
				showIcon={false}
				source={Track.Source.Camera}
			>
				{videoClicked ? (
					<VideoOffIcon
						className={styles.greyBtn}
						onClick={() => setVideoClicked(prev => !prev)}
					/>
				) : (
					<VideoIcon
						className={styles.greyBtn}
						onClick={() => setVideoClicked(prev => !prev)}
					/>
				)}
			</TrackToggle>

			<DisconnectButton onClick={onDeleteUser}>
				<TurnOffIcon />
			</DisconnectButton>
			<OpenChatIcon
				className={classNames(styles.chatBtn, {
					[styles.activeBtn]: isOpenChat,
				})}
				onClick={onClickOpenChat}
			/>
		</div>
	);
};

export default VideoControls;
