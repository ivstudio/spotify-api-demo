import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import useAuth from '../../hooks/useAuth';

interface Props extends RouteComponentProps {}

export default function RedirectPage(props: Props) {
	const { setAuthorization } = useAuth();
	const { hash = '' } = props.location;

	useEffect(() => {
		if (hash.length) {
			setAuthorization(hash);
		}
	}, [setAuthorization, hash]);

	return null;
}
