import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { spotifyCurrentPlaying } from '../../apis/apis';
import { ICurrentPlaying } from '../../types/spotify.types';
import { useAppDispatch, useAppSelector } from '../../store/AppStateProvider';
import TrackDetails from '../TrackDetails/TrackDetails';
import styles from './CurrentPlaying.module.css';

const CurrentPlaying = () => {
	const dispatch = useAppDispatch();
	const { currentPlaying, activePlaylist } = useAppSelector();

	const { data, error, isLoading } = useFetch<ICurrentPlaying>(
		spotifyCurrentPlaying
	);

	useEffect(() => {
		if (data) {
			dispatch({ type: 'SET_CURRENT_PLAYING', payload: data });
		}
	}, [data, dispatch]);

	if (!currentPlaying?.item || error) {
		return (
			<div className={styles.container}>
				<div className={styles.textLarge}>Nothing playing</div>
			</div>
		);
	}

	const handleAddToPlaylist = () => {
		if (currentPlaying.item) {
			dispatch({
				type: 'ADD_TRACK_TO_PLAYLIST',
				payload: currentPlaying.item,
			});
		}
	};

	return (
		<>
			{!isLoading ? (
				<div className={styles.container}>
					<TrackDetails track={currentPlaying.item} condensed />
					<div className={styles.buttonContainer}>
						<button
							className={styles.button}
							onClick={handleAddToPlaylist}
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
