import React from 'react';
import Menu from '../../components/Menu/Menu';
import Playlists from '../../components/Playlists/Playlists';
import Playlist from '../../components/Playlist/Playlist';
import CurrentPlaying from '../../components/CurrentPlaying/CurrentPlaying';
import { useAppSelector } from '../../store/AppStateProvider';
import useAuth from '../../hooks/useAuth';
import AddPlaylist from '../../components/AddPlaylist/AddPlaylist';
import styles from './HomePage.module.css';

const HomePage = () => {
	const { isCreatePlaylistMode } = useAppSelector();

	const { handleLogout } = useAuth();

	return (
		<div className={styles.container}>
			<div className={styles.containerContent}>
				<aside className={styles.sidebar}>
					<Menu />
					<Playlists />
				</aside>

				<main className={styles.main}>
					<div className={styles.header}>
						<div className={styles.logout} onClick={handleLogout}>
							Log out
						</div>
					</div>
					{isCreatePlaylistMode ? <AddPlaylist /> : <Playlist />}
				</main>
			</div>
			<div className={styles.footer}>
				<CurrentPlaying />
			</div>
		</div>
	);
};

export default HomePage;
