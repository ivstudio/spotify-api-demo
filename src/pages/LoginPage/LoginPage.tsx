import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
	const history = useHistory();
	const { handleLogin, isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated()) {
			history.push('/home');
		}
	}, [isAuthenticated, history]);

	return (
		<div>
			<h1>Login</h1>
			<div onClick={handleLogin}>Login</div>
		</div>
	);
};

export default LoginPage;
