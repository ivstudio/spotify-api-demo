import { useAppDispatch } from '../store/AppStateProvider';
import { IPlaylist } from '../types/models.types';

const JB_PLAYLIST = 'JUKEBOX_PLAYLIST';

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
		const pl = localStorage.getItem(JB_PLAYLIST);
		if (pl && Object.keys(pl).length > 0) {
			return JSON.parse(pl);
		}
		return null;
	};

	const addLocalPlaylist = (newPlaylist: IPlaylist) => {
		const localPlaylist = getLocalPlaylist();

		if (!localPlaylist) {
			localStorage.setItem(JB_PLAYLIST, JSON.stringify([newPlaylist]));
		} else {
			localStorage.setItem(
				JB_PLAYLIST,
				JSON.stringify([...localPlaylist, newPlaylist])
			);
		}

		dispatch({ type: 'ADD_PLAYLIST', payload: newPlaylist });
	};

	return { addLocalPlaylist, createId, isLocalPlaylist, getLocalPlaylist };
};

export default useLocalPlaylist;
