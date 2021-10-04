import React from 'react';
import styles from './TrackDetails.module.css';
import { ITrackObjectSimplified } from '../../types/spotify.types';
import { msToTime } from '../../utils/utils';

interface Props {
	track: ITrackObjectSimplified;
	trackIndex?: number;
	condensed?: boolean;
}

const getComma = (len: number, index: number) => {
	return len > 1 && len !== index + 1 ? ', ' : '';
};

const TrackDetails = ({ track, trackIndex, condensed = false }: Props) => (
	<div className={styles.track}>
		{trackIndex && <div className={styles.trackIndex}>{trackIndex}</div>}
		<div className={condensed ? styles.condensed : styles.container}>
			<img
				alt={track.album.name}
				src={track.album.images[2].url}
				className={styles.trackImage}
			/>
			<div className={styles.content}>
				<div className={styles.textPrimary}>{track.name}</div>
				<div className={styles.artistList}>
					{track.artists.map((artist, index) => (
						<div className={styles.textSecondary} key={artist.id}>
							{artist.name}
							{getComma(track.artists.length, index)}
						</div>
					))}
				</div>
			</div>
			{!condensed && (
				<>
					<div className={styles.content}>
						<div className={styles.textSecondary}>
							{track.album.name}
						</div>
					</div>
					<div className={styles.content}>
						<div className={styles.textSecondary}>
							{msToTime(track.duration_ms)}
						</div>
					</div>
				</>
			)}
		</div>
	</div>
);

export default TrackDetails;
