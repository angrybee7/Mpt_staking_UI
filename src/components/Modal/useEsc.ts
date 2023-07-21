import * as React from 'react';
import { modalManager, TModalName } from '../../services/modalManager';

export const useEscape = (hasESCOut: boolean, modalName: TModalName): void => {

    React.useEffect(() => {
        function onkeydown(evt): void {
            evt = evt || window.event;
            let isEscape;
            if ('key' in evt) {
                isEscape = evt.key === 'Escape' || evt.key === 'Esc';
            } else {
                isEscape = evt.keyCode === 27;
            }
            if (isEscape) {
                modalManager.closeModal(modalName, 'abort');
            }
        }

        if (hasESCOut) {
            document.addEventListener('keydown', onkeydown);
        }

        return (): void => document.removeEventListener('keydown', onkeydown);
    }, [modalName, hasESCOut]);
};
