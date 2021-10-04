import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import AppStateProvider from './store/AppStateProvider';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';

ReactDOM.render(
	<React.StrictMode>
		<AppStateProvider>
			<AppRouter />
		</AppStateProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
