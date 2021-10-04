import React from 'react';
import reducer from './playlistReducer';
import { TRootAction } from '../types/models.types';
import initialState from './intitialState';

interface Props {
	children: JSX.Element | JSX.Element[];
}

const AppStateContext = React.createContext(initialState);
const AppDispatchContext = React.createContext<
	React.Dispatch<TRootAction> | undefined
>(undefined);

const AppStateProvider = ({ children }: Props) => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	return (
		<AppStateContext.Provider value={state}>
			<AppDispatchContext.Provider value={dispatch}>
				{children}
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;

export function useAppSelector() {
	const context = React.useContext(AppStateContext);
	if (context === undefined) {
		throw new Error('useAppSelector must be used within AppStateContext');
	}
	return context;
}

export function useAppDispatch() {
	const context = React.useContext(AppDispatchContext);
	if (context === undefined) {
		throw new Error(
			'useAppDispatch must be used within AppDispatchContext'
		);
	}
	return context;
}
