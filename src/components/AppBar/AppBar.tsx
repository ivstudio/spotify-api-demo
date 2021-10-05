import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './AppBar.module.css';

const AppBar = () => {
	const { handleLogout } = useAuth();
	return (
		<nav className={styles.appBar}>
			<ul className={styles.navList}>
				<li className={styles.navListItem}>
					<Link to="/app">Home</Link>
				</li>
				<li className={styles.navListItem}>
					<Link to="/app/playlists">Playlists</Link>
				</li>
				<li className={styles.navListItem}>
					<div onClick={handleLogout}>Log out</div>
				</li>
			</ul>
		</nav>
	);
};

export default AppBar;
