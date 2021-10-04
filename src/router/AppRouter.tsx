import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const Redirect = lazy(() => import('../pages/LoginPage/Redirect'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));

const AppRouter = () => {
	return (
		<Router>
			<Suspense fallback={''}>
				<Switch>
					<Route exact path="/" component={LoginPage} />
					<Route path="/redirect" component={Redirect} />
					<PrivateRoute path="/home" component={HomePage} />
				</Switch>
			</Suspense>
		</Router>
	);
};

export default AppRouter;
