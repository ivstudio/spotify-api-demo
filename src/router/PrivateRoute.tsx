import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface Props {
	component: React.ElementType;
	path: string;
}
const PrivateRoute = ({ component: Component, ...rest }: Props) => {
	const { isAuthenticated } = useAuth();
	const [isAuthState, setAuthState] = useState<boolean>(false);
	const [isloading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		function handleAuth() {
			const auth = isAuthenticated();
			setAuthState(auth);
			setLoading(false);
		}
		handleAuth();
	}, [isAuthenticated, isAuthState]);

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthState && !isloading ? (
					<Redirect
						to={{
							pathname: '/',
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivateRoute;
