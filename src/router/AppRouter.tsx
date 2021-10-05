import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const Redirect = lazy(() => import('../pages/LoginPage/Redirect'));
const App = lazy(() => import('../pages/App/App'));

const AppRouter = () => {
	return (
		<Router>
			<Suspense fallback={''}>
				<Switch>
					<Route exact path="/" component={LoginPage} />
					<Route path="/redirect" component={Redirect} />
					<PrivateRoute path="/app" component={App} />
				</Switch>
			</Suspense>
		</Router>
	);
};

export default AppRouter;

/* 
NOTES:
Add fallback and 404 page 
*/
