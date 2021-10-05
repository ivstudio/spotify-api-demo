import { useAppDispatch } from '../store/AppStateProvider';
import {
	ITrackObjectSimplified,
	IPlaylistsResponse,
} from '../types/spotify.types';

const JB_TRACK = 'JUKEBOX_TRACK';
const useLocalTrack = () => {
	const dispatch = useAppDispatch();

	const getLocalTracks = () => {
		const pl = localStorage.getItem(JB_TRACK);
		if (pl && Object.keys(pl).length > 0) {
			return JSON.parse(pl);
		}
		return null;
	};

	function mergePlaylistIds(ids1: string[], ids2: string[]) {
		return [...ids1, ...ids2].reduce((newArray: string[], item: string) => {
			if (newArray.includes(item)) {
				return newArray;
			} else {
				return [...newArray, item];
			}
		}, []);
	}

	const removeTrack = (list: ITrackObjectSimplified[], trackId: string) => {
		return list.filter((item) => item.id !== trackId);
	};

	const filterTracksByid = (
		list: ITrackObjectSimplified[],
		trackId: string
	) => {
		const tracks = [];

		for (const item of list) {
			if (item.hasOwnProperty('playlist_ids')) {
				if (item.playlist_ids?.indexOf(trackId) !== -1) {
					tracks.push(item);
				}
			}
		}
		return tracks;
	};

	const addTrackToPlaylist = (
		activeTrack: ITrackObjectSimplified,
		activePlaylistId: string
	) => {
		const { playlist_ids: trackPlaylistIds = [] } = activeTrack;
		const localTracks: ITrackObjectSimplified[] = getLocalTracks();

		if (activeTrack.hasOwnProperty('playlist_ids')) {
			activeTrack.playlist_ids = mergePlaylistIds(trackPlaylistIds, [
				activePlaylistId,
			]);
		} else {
			activeTrack.playlist_ids = [activePlaylistId];
		}

		if (!localTracks) {
			localStorage.setItem(JB_TRACK, JSON.stringify([activeTrack]));
		} else {
			localStorage.setItem(
				JB_TRACK,
				JSON.stringify([
					...removeTrack(localTracks, activeTrack.id),
					activeTrack,
				])
			);
		}

		dispatch({ type: 'ADD_TRACK_TO_PLAYLIST', payload: activeTrack });
	};

	const setTracksToPlaylist = (
		data: IPlaylistsResponse | null,
		activePlaylistId: string,
		isLocalPlaylist: boolean = false
	) => {
		const localTracks: ITrackObjectSimplified[] = getLocalTracks();

		if (!localTracks) {
			if (data) {
				if (isLocalPlaylist) {
					dispatch({
						type: 'SET_ACTIVE_PLAYLIST',
						payload: {
							spotify: undefined,
							localStorage: undefined,
						},
					});
				} else {
					dispatch({
						type: 'SET_ACTIVE_PLAYLIST',
						payload: { spotify: data, localStorage: undefined },
					});
				}
			} else {
				dispatch({
					type: 'SET_ACTIVE_PLAYLIST',
					payload: {
						spotify: undefined,
						localStorage: undefined,
					},
				});
			}
		} else {
			const plLocalTracks = filterTracksByid(
				localTracks,
				activePlaylistId
			);
			if (data) {
				dispatch({
					type: 'SET_ACTIVE_PLAYLIST',
					payload: {
						spotify: data,
						localStorage: plLocalTracks,
					},
				});
			} else {
				dispatch({
					type: 'SET_ACTIVE_PLAYLIST',
					payload: {
						spotify: undefined,
						localStorage: plLocalTracks,
					},
				});
			}
		}
	};

	return { addTrackToPlaylist, setTracksToPlaylist };
};

export default useLocalTrack;
