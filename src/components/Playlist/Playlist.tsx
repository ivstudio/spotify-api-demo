import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { spotifyPlaylist } from '../../apis/apis';
import { IPlaylistsResponse } from '../../types/spotify.types';
import { useAppSelector } from '../../store/AppStateProvider';
import styles from './Playlist.module.css';
import TrackDetails from '../TrackDetails/TrackDetails';
import useLocalPlaylist from '../../hooks/useLocalPlaylist';
import useLocalTrack from '../../hooks/useLocalTrack';

const Playlist = () => {
	const { isLocalPlaylist } = useLocalPlaylist();
	const { setTracksToPlaylist } = useLocalTrack();
	const { activePlaylist } = useAppSelector();
	const isNotLocalPlaylist =
		activePlaylist?.id && !isLocalPlaylist(activePlaylist.id);

	const url = isNotLocalPlaylist
		? `${spotifyPlaylist}${activePlaylist.id}/tracks`
		: null;

	const { data, error, isLoading } = useFetch<IPlaylistsResponse>(url);

	useEffect(() => {
		if (!isLoading && activePlaylist?.id) {
			if (!isLocalPlaylist(activePlaylist.id)) {
				setTracksToPlaylist(data, activePlaylist.id);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isLoading, activePlaylist?.id]);

	const tracks = activePlaylist?.playlist?.items
		? activePlaylist?.playlist?.items
		: [];

	if (error) {
		return null;
	}

	if (!activePlaylist?.id) {
		return <div>select a playlist</div>;
	}

	return (
		<div className={styles.container}>
			{tracks.length > 0 ? (
				<>
					{tracks.map((item: any, index) => {
						if (item.track) {
							const { track } = item;
							return (
								<TrackDetails
									key={track.id}
									track={track}
									trackIndex={index + 1}
								/>
							);
						} else {
							return (
								<TrackDetails
									key={item.id}
									track={item}
									trackIndex={index + 1}
								/>
							);
						}
					})}
				</>
			) : (
				<div>Empty Playlist</div>
			)}
		</div>
	);
};

export default Playlist;
