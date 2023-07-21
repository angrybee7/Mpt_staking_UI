import * as React from 'react';
import { createPortal } from 'react-dom';
import { useSystemModals } from './useSystemModals';
import { modalManager } from '../../services/modalManager';
import { MODAL_NAMES } from './MODAL_NAMES';


export type TState = Partial<Record<keyof typeof MODAL_NAMES, {
    isOpen: boolean;
    props: any;
    willClose?: boolean;
    willOpen?: boolean;
}>>;

export type TAction = {
    modalName: keyof typeof MODAL_NAMES;
    isOpen?: boolean;
    props?: any;
    willClose?: boolean;
    willOpen?: boolean;
}

export type TReducer = (state: TState, action: TAction) => TState;

const reducer: TReducer = (state, action) => {
    return {
        ...state,
        [action.modalName]: {
            isOpen: action.isOpen,
            props: action.props || state[action.modalName]?.props,
            willOpen: action.willOpen,
            willClose: action.willClose,
        }
    };
};


export const modalsState = {};

const showContainer = (el: HTMLElement): void => {
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.position = 'fixed';
    el.style.zIndex = '9999';
};

const hideContainer = (el: HTMLElement): void => {
    el.style.width = '0';
    el.style.height = '0';
    el.style.position = 'fixed';
    el.style.zIndex = '-1';
};


export const ModalContainer: React.FC = () => {
    const [state, dispatch] = React.useReducer<TReducer, TState>(reducer, modalsState, () => modalsState);
    const timeoutRef = React.useRef<number>();
    const id = React.useId();

    const modalRoot = React.useMemo(() => document.getElementById('modal-root'), []);

    const el = React.useMemo(() => {
        const el = document.createElement('div');
        return el;
    }, []);

    React.useEffect(() => {
        if (modalRoot) {
            modalRoot.appendChild(el);
        }

        modalManager.openSignal.on(({ modalName, props }) => {
            showContainer(el);
            dispatch({ modalName: modalName, isOpen: true, willOpen: true, props });
        });

        modalManager.closeSignal.on(({ modalName, fadeDuration, closeType }) => {
            dispatch({ modalName: modalName, willClose: true, isOpen: true });

            timeoutRef.current = window.setTimeout(() => {
                if (modalManager.openedModals.length === 0) {
                    hideContainer(el);
                }

                dispatch({ modalName: modalName, isOpen: false, props: undefined, willOpen: false, willClose: false });

                modalManager.modalWasClosed.dispatch({ modalName, closeType });
            }, fadeDuration);
        });
    }, []);

    const modals = useSystemModals(state);

    return createPortal(
        <>
            {modals.map(({ Component, props }, i) => <Component key={`${id}-${i}`} {...props}/>)}
        </>,
        el
    );
};

ModalContainer.displayName = 'WxModalContainer';
