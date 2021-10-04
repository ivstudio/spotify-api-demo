import React, { useState } from 'react';
import styles from './AddPlaylist.module.css';
import useLocalPlaylist from '../../hooks/useLocalPlaylist';

const AddPlaylist = () => {
	const { addLocalPlaylist, createId } = useLocalPlaylist();
	const [playlistName, setPlaylistName] = useState('');

	const handleAddPlaylist = () => {
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
			<input onChange={handleChange} value={playlistName} />
			<div className={styles.buttonContainer}>
				<button onClick={handleAddPlaylist}>ADD PLAYLIST</button>
			</div>
		</div>
	);
};

export default AddPlaylist;
