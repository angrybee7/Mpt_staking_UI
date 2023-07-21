
import * as React from 'react';

export const useEscape = (hasESCOut: boolean, handleCloseRef): void => {

    React.useEffect(() => {
        function onkeydown(evt) {
            evt = evt || window.event;
            let isEscape;
            if ('key' in evt) {
                isEscape = evt.key === 'Escape' || evt.key === 'Esc';
            } else {
                isEscape = evt.keyCode === 27;
            }
            if (isEscape) {
                if (typeof handleCloseRef?.current === 'function') {
                    handleCloseRef.current();
                }
            }
        }

        if (hasESCOut) {
            document.addEventListener('keydown', onkeydown);
        }


        return (): void => document.removeEventListener('keydown', onkeydown);
    }, [hasESCOut]);
};
