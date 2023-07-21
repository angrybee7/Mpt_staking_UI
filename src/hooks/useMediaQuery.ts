import { useEffect, useMemo, useState } from 'react';

export function useMediaQuery(query: string): boolean {
    const mobileMediaQuery = useMemo(() => matchMedia(query), []);
    const [matches, setMatches] = useState<boolean>(mobileMediaQuery.matches);

    useEffect(() => {
        const handleMatchesChange = (e: MediaQueryListEvent): void => {
            setMatches(e.matches);
        };

        if (mobileMediaQuery.addEventListener) {
            mobileMediaQuery.addEventListener('change', handleMatchesChange);
        } else {
            mobileMediaQuery.addListener(handleMatchesChange);
        }

        return (): void => {
            if (mobileMediaQuery.removeEventListener) {
                mobileMediaQuery.removeEventListener('change', handleMatchesChange);
            } else {
                mobileMediaQuery.removeListener(handleMatchesChange);
            }
        };
    }, [mobileMediaQuery]);

    return matches;
}
