import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { spotifyPlaylist } from '../../apis/apis';
import { IPlaylistsResponse } from '../../types/spotify.types';
import { useAppDispatch, useAppSelector } from '../../store/AppStateProvider';
import styles from './Playlist.module.css';
import TrackDetails from '../TrackDetails/TrackDetails';
import useLocalPlaylist from '../../hooks/useLocalPlaylist';

const Playlist = () => {
	const dispatch = useAppDispatch();
	const { isLocalPlaylist } = useLocalPlaylist();
	const { activePlaylist } = useAppSelector();

	const url =
		activePlaylist?.id && !isLocalPlaylist(activePlaylist.id)
			? `${spotifyPlaylist}${activePlaylist.id}/tracks`
			: null;
	const { data, error, isLoading } = useFetch<IPlaylistsResponse>(url);

	useEffect(() => {
		if (data) {
			dispatch({ type: 'SET_ACTIVE_PLAYLIST', payload: data });
		}
	}, [data, dispatch]);

	if (error) {
		return null;
	}

	const tracks = activePlaylist?.playlist?.items
		? activePlaylist?.playlist?.items
		: [];

	return (
		<>
			{!isLoading ? (
				<div className={styles.container}>
					{tracks.length > 0 ? (
						<>
							{tracks.map(({ track }, index) => {
								if (!track) {
									return null;
								}
								return (
									<TrackDetails
										key={track.id}
										track={track}
										trackIndex={index + 1}
									/>
								);
							})}
						</>
					) : (
						<div>Empty Playlist</div>
					)}
				</div>
			) : (
				<div>loading...</div>
			)}
		</>
	);
};

export default Playlist;
