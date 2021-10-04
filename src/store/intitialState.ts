import { IStore } from '../types/models.types';

const initialState: IStore = {
	playlists: {
		href: '',
		items: [],
	},
	activePlaylist: {
		playlist: undefined,
	},
	currentPlaying: {
		item: undefined,
	},
	isCreatePlaylistMode: false,
};

export default initialState;
