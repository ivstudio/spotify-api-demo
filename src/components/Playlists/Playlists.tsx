import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { spotifyMe } from '../../apis/apis';
import { IPlaylistItem, IPlaylistsResponse } from '../../types/spotify.types';
import { useAppDispatch, useAppSelector } from '../../store/AppStateProvider';
import styles from './Playlist.module.css';
import useLocalPlaylist from '../../hooks/useLocalPlaylist';
import useLocalTrack from '../../hooks/useLocalTrack';

interface Props {
	condensed?: boolean;
}

const Playlists = ({ condensed: isSidebarPlaylist = false }: Props) => {
	const history = useHistory();
	const dispatch = useAppDispatch();
	const { setTracksToPlaylist } = useLocalTrack();
	const { getLocalPlaylist, isLocalPlaylist } = useLocalPlaylist();
	const { playlists, activePlaylist } = useAppSelector();
	const { data, error, isLoading } = useFetch<IPlaylistsResponse>(
		`${spotifyMe}/playlists`
	);

	useEffect(() => {
		if (data) {
			const localPl = getLocalPlaylist();
			if (localPl) {
				const combinedPls = [...localPl, ...data.items];
				data.items = combinedPls;
			}

			dispatch({ type: 'SET_PLAYLISTS', payload: data });
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

		if (isLocalPlaylist(id)) {
			setTracksToPlaylist(null, id, true);
		}

		dispatch({ type: 'SET_ACTIVE_PLAYLIST_ID', payload: params });

		if (!isSidebarPlaylist) {
			history.push(`/app/playlists/${id}`);
		}
	};

	if (isSidebarPlaylist) {
		return (
			<>
				{!isLoading ? (
					<ul
						className={`${styles.list} ${styles.containerCondensed}`}>
						{playlists.items.map((item) => (
							<li
								key={item.id}
								className={`${styles.listItemCondensed} ${
									activePlaylist?.id === item.id &&
									styles.listItemActive
								}`}
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
	}

	return (
		<>
			{!isLoading ? (
				<ul className={styles.list}>
					{playlists.items.map((item, index) => (
						<li
							key={item.id}
							className={`${styles.listItem} ${
								activePlaylist?.id === item.id &&
								styles.listItemActive
							}`}
							onClick={() => setActivePlaylistId(item)}>
							<span className={styles.itemIndex}>
								{index + 1}
							</span>
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
