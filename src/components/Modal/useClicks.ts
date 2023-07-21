import * as React from 'react';
import { modalManager, TModalName } from '../../services/modalManager';


export const useClicks = (hasClickOut: boolean, modalName: TModalName): {
    onMouseDown: (e) => void;
    onMouseUp: (e) => void;
} => {
    const [clickState, setClickState] = React.useState(false);

    const onMouseDown = React.useCallback((e) => {
        if (!hasClickOut) {
            return;
        }

        if (e.target.getAttribute('target') !== '_back_') {
            return;
        }

        setClickState(true);
    }, []);

    const onMouseUp = React.useCallback(
        (e) => {
            if (!hasClickOut) {
                return;
            }
            setClickState(false);
            if (e.target.getAttribute('target') !== '_back_') {
                return;
            }

            e.preventDefault();
            e.stopPropagation();
            if (clickState) {
                modalManager.closeModal(modalName, 'abort');
            }
        },
        [clickState]
    );

    return {
        onMouseDown,
        onMouseUp
    };
};
