interface IExternalUrlObject {
	spotify: string;
}

export interface ImageObject {
	height?: number;
	url: string;
	width?: number;
}

export interface FollowersObject {
	href: string;
	total: number;
}

export interface UserObjectPublic {
	display_name?: string;
	external_urls: IExternalUrlObject;
	followers?: FollowersObject;
	href: string;
	id: string;
	images?: ImageObject[];
	type: 'user';
	uri: string;
}

export interface IPlaylistItem {
	collaborative?: boolean;
	external_urls?: IExternalUrlObject;
	href?: string;
	id: string;
	images?: ImageObject[];
	name: string;
	owner?: UserObjectPublic;
	public?: boolean;
	snapshot_id?: string;
	type?: 'playlist';
	uri?: string;
	track?: ITrackObjectSimplified;
}

export interface IPlaylistsResponse {
	href?: string;
	items: IPlaylistItem[];
	limit?: number;
	offset?: number;
	previous?: number;
	total?: number;
}

export interface IArtistObjectSimplified {
	external_urls: IExternalUrlObject;
	href: string;
	id: string;
	name: string;
	type: 'artist';
	uri: string;
}

export interface IAlbumObjectSimplified {
	album_type: string;
	available_markets?: string[];
	external_urls: IExternalUrlObject;
	href: string;
	id: string;
	images: ImageObject[];
	name: string;
	type: 'album';
	uri: string;
}

export interface ITrackLinkObject {
	external_urls: IExternalUrlObject;
	href: string;
	id: string;
	type: 'track';
	uri: string;
}

export interface ITrackObjectSimplified {
	artists: IArtistObjectSimplified[];
	available_markets?: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: IExternalUrlObject;
	href: string;
	id: string;
	is_playable?: boolean;
	linked_from?: ITrackLinkObject;
	name: string;
	preview_url: string;
	track_number: number;
	type: 'track';
	uri: string;
	album: IAlbumObjectSimplified;
}

export interface ICurrentPlaying {
	item?: ITrackObjectSimplified;
}
