import { forwardRef } from 'react';
import styles from './UserVideo.module.scss';
import classNames from 'classnames';
import type { Participant } from 'livekit-client';
import { Track } from 'livekit-client';
import { useParticipants } from '@livekit/components-react';
import {
	ParticipantContext,
	TrackRefContext,
	useEnsureTrackRef,
} from '@livekit/components-react';
import { VideoTrack } from '@livekit/components-react';
import { ParticipantName } from '@livekit/components-react';
import { MicIcon } from './icons/MicIcon';
import { MicOffIcon } from './icons/MicOffIcon';

interface UserVideoProps extends React.HTMLAttributes<HTMLDivElement> {
	trackRef?: { participant: Participant; source: Track.Source };
}

export const UserVideo = forwardRef<HTMLDivElement, UserVideoProps>(
	function UserVideo({ trackRef, ...htmlProps }, ref) {
		const trackReference = useEnsureTrackRef(trackRef);
		const participants = useParticipants();
		const isOnlyOneParticipant = participants.length === 1;
		const currentParticipant = trackReference.participant;
		const participantName = currentParticipant.identity;
		const isMicEnabled = currentParticipant.isMicrophoneEnabled;
		const isCameraEnabled = currentParticipant.isCameraEnabled;

		return (
			<div
				className={classNames(styles.root, {
					[styles.onlyOneTile]: isOnlyOneParticipant,
				})}
				ref={ref}
				{...htmlProps}
			>
				<TrackRefContext.Provider value={trackReference}>
					<ParticipantContext.Provider value={trackReference.participant}>
						<div
							className={classNames({ [styles.cameraOff]: !isCameraEnabled })}
						/>
						<VideoTrack className={styles.video} trackRef={trackReference} />
						<div
							className={classNames(styles.userInfo, {
								[styles.userInfoWhenCameraOff]: !isCameraEnabled,
							})}
						>
							{isMicEnabled ? (
								<MicIcon
									className={classNames({
										[styles.iconWhenCameraOff]: !isCameraEnabled,
									})}
								/>
							) : (
								<MicOffIcon
									className={classNames({
										[styles.iconWhenCameraOff]: !isCameraEnabled,
									})}
								/>
							)}
							<span>{participantName}</span>
						</div>
					</ParticipantContext.Provider>
				</TrackRefContext.Provider>
			</div>
		);
	}
);
