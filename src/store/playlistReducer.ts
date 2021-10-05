import { IStore, TRootAction, IPlaylist } from '../types/models.types';

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
				activePlaylist: {
					id: action.payload.id,
				},
				isCreatePlaylistMode: false,
			};
		case 'SET_PLAYLISTS':
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
					...state.activePlaylist,
					id: action.payload.id,
				},
			};
		case 'SET_ACTIVE_PLAYLIST':
			const { spotify, localStorage = [] } = action.payload;
			const spotifyTracks = spotify?.items || [];
			return {
				...state,
				activePlaylist: {
					...state.activePlaylist,
					playlist: {
						items: [...localStorage, ...spotifyTracks],
					},
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
			return {
				...state,
				isCreatePlaylistMode: action.payload,
			};
		case 'ADD_TRACK_TO_PLAYLIST':
			const tracks = state.activePlaylist?.playlist?.items.length
				? [
						...[action.payload],
						...state.activePlaylist?.playlist?.items,
				  ]
				: [action.payload];

			return {
				...state,
				activePlaylist: {
					...state.activePlaylist,
					playlist: {
						...state.activePlaylist?.playlist,
						items: tracks,
					},
				},
			};
		case 'DELETE_PLAYLIST':
			/* not finished */
			return {
				...state,
				playlists: {
					...state.playlists,
					items: [
						...state.playlists.items.filter(
							(i: IPlaylist) => i.id !== action.id
						),
					],
				},
			};
		default: {
			return state;
		}
	}
}
