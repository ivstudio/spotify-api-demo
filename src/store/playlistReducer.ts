import { IStore, TRootAction } from '../types/models.types';

export default function playlistReducer(
	state: IStore,
	action: TRootAction
): IStore {
	switch (action.type) {
		case 'ADD_PLAYLIST':
			return {
				...state,
				playlists: {
					...state.playlists,
					items: [action.payload, ...state.playlists.items],
				},
			};
		case 'DELETE_PLAYLIST':
			return {
				...state,
				playlists: {
					...state.playlists,
					items: [],
				},
			};
		case 'GET_PLAYLISTS':
			return {
				...state,
				playlists: action.payload,
			};
		case 'SET_ACTIVE_PLAYLIST_ID':
			if (action.payload.id === state.activePlaylist?.id) {
				return state;
			}

			return {
				...state,
				isCreatePlaylistMode: false,
				activePlaylist: {
					playlist: undefined,
					id: action.payload.id,
				},
			};
		case 'SET_ACTIVE_PLAYLIST':
			return {
				...state,
				activePlaylist: {
					...state.activePlaylist,
					playlist: action.payload,
				},
			};
		case 'SET_CURRENT_PLAYING':
			if (!action.payload.item) {
				return state;
			}

			return {
				...state,
				currentPlaying: {
					...state.currentPlaying,
					item: action.payload.item,
				},
			};
		case 'SET_CREATE_PLAYLIST_MODE':
			console.log(action.payload);
			return {
				...state,
				isCreatePlaylistMode: action.payload,
			};
		case 'ADD_TRACK_TO_PLAYLIST':
			console.log(action.payload);
			return {
				...state,
			};
		default: {
			return state;
		}
	}
}

// ...state.playlists.items.filter(
// 	(i: IPlaylist) => i.id !== action.id
// ),
