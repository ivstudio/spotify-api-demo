import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { spotifyMe } from '../../apis/apis';
import { IPlaylistItem, IPlaylistsResponse } from '../../types/spotify.types';
import { useAppDispatch, useAppSelector } from '../../store/AppStateProvider';
import styles from './Playlist.module.css';
import useLocalPlaylist from '../../hooks/useLocalPlaylist';

const Playlists = () => {
	const dispatch = useAppDispatch();
	const { getLocalPlaylist } = useLocalPlaylist();
	const { playlists, activePlaylist } = useAppSelector();
	const { data, error, isLoading } = useFetch<IPlaylistsResponse>(
		`${spotifyMe}/playlists`
	);

	useEffect(() => {
		if (data) {
			const localPl = getLocalPlaylist();
			const combinedPls = [...localPl, ...data.items];
			data.items = combinedPls;
			dispatch({ type: 'GET_PLAYLISTS', payload: data });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, dispatch]);

	if (error) {
		return null;
	}

	const setActivePlaylistId = ({ name, id }: IPlaylistItem) => {
		const params = {
			name,
			id,
		};

		dispatch({ type: 'SET_ACTIVE_PLAYLIST_ID', payload: params });
	};

	const getClasses = (itemId: string) => {
		let classes = [styles.listItem];
		if (activePlaylist?.id === itemId) {
			classes.push(styles.listItemActive);
		}
		return classes.join(' ');
	};

	return (
		<>
			{!isLoading ? (
				<ul className={styles.list}>
					{playlists.items.map((item) => (
						<li
							key={item.id}
							className={getClasses(item.id)}
							onClick={() => setActivePlaylistId(item)}>
							<span className={styles.listItemText}>
								{item.name}
							</span>
						</li>
					))}
				</ul>
			) : null}
		</>
	);
};

export default Playlists;
