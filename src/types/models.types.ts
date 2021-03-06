import {
	UserObjectPublic,
	IPlaylistsResponse,
	ICurrentPlaying,
	ITrackObjectSimplified,
} from './spotify.types';

/* playlist */
export interface IPlaylist {
	name: string;
	id: string;
}

export interface IAction<T> {
	type: T;
}

export interface IAddPlayList extends IAction<'ADD_PLAYLIST'> {
	payload: IPlaylist;
}

export interface IDeletePlayList extends IAction<'DELETE_PLAYLIST'> {
	id: string;
}

export interface IGetPlayList extends IAction<'SET_PLAYLISTS'> {
	payload: IPlaylistsResponse;
}

export interface ISetActivePlayListId
	extends IAction<'SET_ACTIVE_PLAYLIST_ID'> {
	payload: IPlaylist;
}

export interface ISetActivePlayList extends IAction<'SET_ACTIVE_PLAYLIST'> {
	payload: {
		spotify?: IPlaylistsResponse;
		localStorage?: ITrackObjectSimplified[];
	};
}

export interface ISetCurrentPlaying extends IAction<'SET_CURRENT_PLAYING'> {
	payload: ICurrentPlaying;
}

export interface ISetCreatePlaylistMode
	extends IAction<'SET_CREATE_PLAYLIST_MODE'> {
	payload: boolean;
}

export interface IAddTrackToPlaylist extends IAction<'ADD_TRACK_TO_PLAYLIST'> {
	payload: IPlaylist;
}

export interface IActivePlaylist {
	id?: string;
	playlist?: IPlaylistsResponse;
}

/* reducer actions */
export type TPlaylistAction =
	| IAddPlayList
	| IDeletePlayList
	| IGetPlayList
	| ISetActivePlayListId
	| ISetActivePlayList
	| ISetCreatePlaylistMode
	| IAddTrackToPlaylist
	| ISetCurrentPlaying;

/* user */
export interface IUser extends UserObjectPublic {}

/* root actions */
export type TRootAction = TPlaylistAction;

/* store */
export interface IStore {
	playlists: IPlaylistsResponse;
	activePlaylist?: IActivePlaylist;
	currentPlaying?: ICurrentPlaying;
	isCreatePlaylistMode: boolean;
}
