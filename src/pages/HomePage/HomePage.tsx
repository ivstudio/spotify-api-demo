import React from 'react';
import Menu from '../../components/Menu/Menu';
import Playlists from '../../components/Playlists/Playlists';
import Playlist from '../../components/Playlist/Playlist';
import CurrentPlaying from '../../components/CurrentPlaying/CurrentPlaying';
import styles from './HomePage.module.css';
import { useAppSelector } from '../../store/AppStateProvider';
import AddPlaylist from '../../components/AddPlaylist/AddPlaylist';

const HomePage = () => {
	const { isCreatePlaylistMode } = useAppSelector();

	return (
		<div className={styles.container}>
			<div className={styles.containerContent}>
				<aside className={styles.sidebar}>
					<Menu />
					<Playlists />
				</aside>

				<main className={styles.main}>
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
