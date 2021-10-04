import { useAppDispatch } from '../store/AppStateProvider';
import { IPlaylist } from '../types/models.types';

const JBPlaylist = 'JUKEBOX_PLAYLIST';

const useLocalPlaylist = () => {
	const dispatch = useAppDispatch();

	const createId = () => {
		const random = Math.floor(1000 + Math.random() * 9000).toString();
		return `${random}LocalPlaylist`;
	};

	const isLocalPlaylist = (playlistId: string): boolean => {
		return /LocalPlaylist/.test(playlistId);
	};

	const getLocalPlaylist = () => {
		const pl = localStorage.getItem(JBPlaylist);
		if (pl && Object.keys(pl).length > 0) {
			return JSON.parse(pl);
		}
		return null;
	};

	const addLocalPlaylist = (newPlaylist: IPlaylist) => {
		const localPlaylist = getLocalPlaylist();

		if (!localPlaylist) {
			localStorage.setItem(JBPlaylist, JSON.stringify([newPlaylist]));
		} else {
			localStorage.setItem(
				JBPlaylist,
				JSON.stringify([...localPlaylist, newPlaylist])
			);
		}

		dispatch({ type: 'ADD_PLAYLIST', payload: newPlaylist });
		dispatch({ type: 'SET_ACTIVE_PLAYLIST_ID', payload: newPlaylist });
	};

	return { addLocalPlaylist, createId, isLocalPlaylist, getLocalPlaylist };
};

export default useLocalPlaylist;
