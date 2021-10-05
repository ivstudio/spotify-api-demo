import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import Playlists from '../../components/Playlists/Playlists';
import AppBar from '../../components/AppBar/AppBar';
import CurrentPlaying from '../../components/CurrentPlaying/CurrentPlaying';
import PlaylistTracks from '../../components/PlaylistTracks/PlaylistTracks';
import AddPlaylist from '../../components/AddPlaylist/AddPlaylist';
import { useAppSelector } from '../../store/AppStateProvider';
import useAuth from '../../hooks/useAuth';
import styles from './App.module.css';

interface Props {
	id?: string;
}

const App = (params: RouteComponentProps<Props>) => {
	const { isTokenExpired } = useAuth();
	const { isCreatePlaylistMode } = useAppSelector();
	const isPlaylistPath = params.location.pathname === '/app/playlists';

	useEffect(() => {
		console.log(isTokenExpired());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.containerContent}>
				<aside className={styles.sidebar}>
					<Menu />
					{!isPlaylistPath && <Playlists condensed />}
				</aside>

				<main className={styles.main}>
					<AppBar />
					<Switch>
						<Route
							exact
							path={params.match.path}
							component={PlaylistTracks}
						/>
						<Route
							exact
							path={`${params.match.path}/playlists`}
							component={Playlists}
						/>
						<Route
							path={`${params.match.path}/playlists/:id`}
							component={PlaylistTracks}
						/>
					</Switch>
					{isCreatePlaylistMode && <AddPlaylist />}
				</main>
			</div>
			<div className={styles.footer}>
				<CurrentPlaying />
			</div>
		</div>
	);
};

export default App;
