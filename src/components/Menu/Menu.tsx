import React from 'react';
import useFetch from '../../hooks/useFetch';
import { spotifyMe } from '../../apis/apis';
import { IUser } from '../../types/models.types';
import styles from './Menu.module.css';
import Button from '../../ui/Button/Button';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../store/AppStateProvider';

const Menu = () => {
	const { handleLogout } = useAuth();
	const dispatch = useAppDispatch();
	const { data: user, error, isLoading } = useFetch<IUser>(spotifyMe);

	if (!user?.id || error) {
		return null;
	}

	const handleAddPlaylist = () => {
		dispatch({ type: 'SET_CREATE_PLAYLIST_MODE', payload: true });
	};

	return (
		<>
			{!isLoading ? (
				<div className={styles.container}>
					<h2 className={styles.displayName}>{user.display_name}</h2>
					<div onClick={handleLogout}>Log out</div>
					<Button onClick={handleAddPlaylist}>
						Create New Playlist
					</Button>
				</div>
			) : null}
		</>
	);
};

export default Menu;
