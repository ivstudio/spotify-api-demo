import { useHistory } from 'react-router-dom';

const {
	REACT_APP_SPOTIFY_CLIENT_ID: clientID,
	REACT_APP_SPOTIFY_AUTHORIZE_URL: authUrl,
	REACT_APP_SPOTIFY_REDIRECT_URL: redirectUri,
} = process.env;

const spotifyAuthUrl = `${authUrl}?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true&
scope=user-read-currently-playing`;
const JUKEBOX = 'JUKEBOX';

interface IAuthParams {
	access_token: string;
	expires_in: string;
	token_type: 'Bearer';
}

const formatAuthObj = (urlParams: string): IAuthParams => {
	return urlParams
		.slice(1)
		.split('&')
		.reduce((acc: any, curr: string) => {
			const [key, val] = curr.split('=');
			acc[key] = val;
			return acc;
		}, {});
};

const useAuth = () => {
	const history = useHistory();

	const handleLogin = () => {
		if (spotifyAuthUrl) {
			window.location.href = spotifyAuthUrl;
		}
	};

	const handleLogout = () => {
		localStorage.removeItem(JUKEBOX);
		history.push('/');
	};

	const getCurrentTime = (token: string) => {
		const exp = new Date().getTime();
		return exp.toString();
	};

	const isTokenExpired = () => {
		const token = getAuthParams();
		if (Object.keys(token).length > 0) {
			// implement token refresh
		}
	};

	const setAuthorization = (url: string) => {
		const authParams = formatAuthObj(url);
		if (authParams.access_token) {
			// authParams.expires_in = getCurrentTime(authParams.expires_in);
			localStorage.setItem(JUKEBOX, JSON.stringify(authParams));
			history.push('/app');
		} else {
			history.push('/');
		}
	};

	const getAuthParams = (): IAuthParams => {
		return JSON.parse(localStorage.getItem(JUKEBOX) || '{}');
	};

	const isAuthenticated = (): boolean => {
		return Object.keys(getAuthParams()).length > 0;
	};

	return {
		handleLogout,
		handleLogin,
		setAuthorization,
		getAuthParams,
		isAuthenticated,
		isTokenExpired,
	};
};

export default useAuth;

/* 
NOTES:
Handle token expiration - currently it expires after 1hr.
*/
