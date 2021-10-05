import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { spotifyCurrentPlaying } from '../../apis/apis';
import { ICurrentPlaying } from '../../types/spotify.types';
import { useAppDispatch, useAppSelector } from '../../store/AppStateProvider';
import TrackDetails from '../TrackDetails/TrackDetails';
import styles from './CurrentPlaying.module.css';
import useLocalTrack from '../../hooks/useLocalTrack';

const CurrentPlaying = () => {
	const dispatch = useAppDispatch();
	const { addTrackToPlaylist } = useLocalTrack();
	const { currentPlaying, activePlaylist } = useAppSelector();

	const { data, error, isLoading } = useFetch<ICurrentPlaying>(
		spotifyCurrentPlaying
	);

	useEffect(() => {
		if (data) {
			dispatch({ type: 'SET_CURRENT_PLAYING', payload: data });
		}
	}, [data, dispatch]);

	const handleAddPlaylist = (track: ICurrentPlaying) => {
		if (!track?.item || !activePlaylist?.id) {
			return;
		}
		addTrackToPlaylist(track.item, activePlaylist.id);
	};

	if (!currentPlaying?.item || error) {
		return (
			<div className={styles.container}>
				<div className={styles.textLarge}>Nothing playing</div>
			</div>
		);
	}

	return (
		<>
			{!isLoading ? (
				<div className={styles.container}>
					<TrackDetails track={currentPlaying.item} condensed />
					<div className={styles.buttonContainer}>
						<button
							className={`${styles.button} ${
								!activePlaylist?.id && styles.disabled
							}`}
							onClick={() => handleAddPlaylist(currentPlaying)}
							disabled={!activePlaylist?.id}>
							Add track to active playlist
						</button>
					</div>
				</div>
			) : (
				<div>loading...</div>
			)}
		</>
	);
};

export default CurrentPlaying;
