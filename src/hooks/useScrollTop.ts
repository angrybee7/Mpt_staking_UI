import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const useScrollTop = (): void => {
	const location = useLocation();

	useEffect((): void => {
		window.scrollTo(0,0);
	}, [location]);
}
