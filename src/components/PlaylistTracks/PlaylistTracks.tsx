import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { spotifyPlaylist } from '../../apis/apis';
import { IPlaylistsResponse } from '../../types/spotify.types';
import { useAppSelector } from '../../store/AppStateProvider';
import TrackDetails from '../TrackDetails/TrackDetails';
import useLocalPlaylist from '../../hooks/useLocalPlaylist';
import useLocalTrack from '../../hooks/useLocalTrack';
import styles from './Tracks.module.css';

interface Props {
	routeId?: string;
}

const Tracks = ({ routeId }: Props) => {
	const { isLocalPlaylist } = useLocalPlaylist();
	const { setTracksToPlaylist } = useLocalTrack();
	const { activePlaylist } = useAppSelector();
	const playlistId = activePlaylist?.id || routeId;
	const isNotLocalPlaylist = playlistId && !isLocalPlaylist(playlistId);

	const url = isNotLocalPlaylist
		? `${spotifyPlaylist}${playlistId}/tracks`
		: null;

	const { data, error, isLoading } = useFetch<IPlaylistsResponse>(url);

	useEffect(() => {
		if (!isLoading && playlistId) {
			if (!isLocalPlaylist(playlistId)) {
				setTracksToPlaylist(data, playlistId);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isLoading, activePlaylist?.id, routeId]);

	const tracks = activePlaylist?.playlist?.items
		? activePlaylist?.playlist?.items
		: [];

	if (error) {
		return null;
	}

	if (!playlistId) {
		return <h2 className={styles.feedbackText}>Select a playlist</h2>;
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
				<h2 className={styles.feedbackText}>
					Add a track to your playlist
				</h2>
			)}
		</div>
	);
};

export default Tracks;
