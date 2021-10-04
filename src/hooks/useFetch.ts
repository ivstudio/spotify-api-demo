import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

interface IConfig {
	headers: {
		'Content-Type': string;
		'Authorization': string;
	};
}

function useFetch<D>(url: string | null) {
	const { getAuthParams } = useAuth();
	const { access_token } = getAuthParams();

	const [data, setData] = useState<D | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const config: IConfig = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`,
			},
		};

		const fetchData = async () => {
			if (!url) {
				return;
			}

			setIsLoading(true);
			try {
				const response = await fetch(url, config);
				if (!response.ok) {
					throw Error(`Error status ${response.status}`);
				}
				const data = await response.json();
				setData(data);
				setIsLoading(false);
			} catch (err) {
				setError(true);
			}
		};
		fetchData();
	}, [url, access_token]);

	return { data, error, isLoading };
}

export default useFetch;
