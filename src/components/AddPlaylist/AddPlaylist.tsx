import React, { useState } from 'react';
import styles from './AddPlaylist.module.css';
import useLocalPlaylist from '../../hooks/useLocalPlaylist';
import Button from '../../ui/Button/Button';

const AddPlaylist = () => {
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

	return (
		<div>
			<h2>Create Playlist</h2>
			<input
				autoFocus
				className={styles.input}
				onChange={handleChange}
				value={playlistName}
				placeholder="Playlist Name"
			/>
			<div className={styles.buttonContainer}>
				<Button onClick={handleAddPlaylist}>Save Playlist</Button>
			</div>
		</div>
	);
};

export default AddPlaylist;
