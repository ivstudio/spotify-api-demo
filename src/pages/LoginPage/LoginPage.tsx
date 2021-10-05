import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../../ui/Button/Button';
import styles from './LoginPage.module.css';

const LoginPage = () => {
	const history = useHistory();
	const { handleLogin, isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated()) {
			history.push('/app');
		}
	}, [isAuthenticated, history]);

	return (
		<div className={styles.container}>
			<h1>Login</h1>
			<Button onClick={handleLogin}>Login with Spotify</Button>
		</div>
	);
};

export default LoginPage;
