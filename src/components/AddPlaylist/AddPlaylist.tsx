import React, { useState } from 'react';
import styles from './AddPlaylist.module.css';
import useLocalPlaylist from '../../hooks/useLocalPlaylist';
import { useAppDispatch } from '../../store/AppStateProvider';
import Button from '../../ui/Button/Button';

const AddPlaylist = () => {
	const dispatch = useAppDispatch();
	const { addLocalPlaylist, createId } = useLocalPlaylist();
	const [playlistName, setPlaylistName] = useState('');

	const handleAddPlaylist = () => {
		if (!playlistName.length) {
			return;
		}
		addLocalPlaylist({
			name: playlistName,
			id: createId(),
		});
		setPlaylistName('');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPlaylistName(e.target.value);
	};

	const handleCancel = () => {
		dispatch({ type: 'SET_CREATE_PLAYLIST_MODE', payload: false });
	};

	return (
		<div className={styles.container}>
			<h2>Create Playlist</h2>
			<input
				autoFocus
				className={styles.input}
				onChange={handleChange}
				value={playlistName}
				placeholder="Playlist Name"
			/>
			<div className={styles.buttonContainer}>
				<div onClick={handleCancel} className={styles.cancelButton}>
					Cancel
				</div>
				<Button onClick={handleAddPlaylist}>Save Playlist</Button>
			</div>
		</div>
	);
};

export default AddPlaylist;
