import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { spotifyCurrentPlaying } from '../../apis/apis';
import { ICurrentPlaying } from '../../types/spotify.types';
import { useAppDispatch, useAppSelector } from '../../store/AppStateProvider';
import TrackDetails from '../TrackDetails/TrackDetails';
import styles from './CurrentPlaying.module.css';

const CurrentPlaying = () => {
	const dispatch = useAppDispatch();
	const { currentPlaying, activePlaylist, playlists } = useAppSelector();

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
		console.log(activePlaylist, playlists, currentPlaying.item);
	};

	return (
		<>
			{!isLoading ? (
				<div className={styles.container}>
					<TrackDetails track={currentPlaying.item} condensed />
					<button onClick={handleAddToPlaylist}>
						Add to playlist
					</button>
				</div>
			) : (
				<div>loading...</div>
			)}
		</>
	);
};

export default CurrentPlaying;
