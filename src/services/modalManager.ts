import { Signal } from 'ts-utils';
import { MODAL_NAMES } from '../components/ModalContainer/MODAL_NAMES';
import { uniq } from 'ramda';

export type TModalName = keyof typeof MODAL_NAMES;

export type TCloseEventType = 'success' | 'close' | 'abort'; // close предполагается использовать для обработки закрытия, а abort нет

type TModalEvent = {
    modalName: TModalName;
    fadeDuration: number;
};

type TModalOpenEvent = TModalEvent & {
    props: any;
}

type TModalCloseEvent = TModalEvent & {
    closeType: TCloseEventType;
};

type TCloseMessage = {
    modalName: TModalName;
    closeType: TCloseEventType;
}

class ModalManager {

    public openSignal = new Signal<TModalOpenEvent>();
    public closeSignal = new Signal<TModalCloseEvent>();
    public closeAllSignal = new Signal();
    public modalWasClosed = new Signal<TCloseMessage>();
    public openedModals: TModalName[] = [];

    openModal = <T>(modalName: TModalName, props?: T, fadeDuration = 200): Promise<TCloseEventType> => {
        this.openSignal.dispatch({ modalName, props, fadeDuration });
        if (this.openedModals.includes(modalName)) {
            return Promise.reject(`${modalName} is already open`);
        }
        this.openedModals = uniq(this.openedModals.concat(modalName));

        return new Promise((res, rej) => {
            const eventHandler = (event: TCloseMessage) => {
                const { modalName: _modalName, closeType } = event;
                if (_modalName === modalName) {
                    if (closeType === 'success') {
                        res(closeType);
                    } else {
                        rej(closeType);
                    }
                    this.modalWasClosed.off(eventHandler);
                }
            };
            this.modalWasClosed.on(eventHandler);
        });
    };

    closeModal = (modalName: TModalName, closeType: TCloseEventType, fadeDuration = 200): Promise<void> => {
        return new Promise((res) => {
            this.closeSignal.dispatch({ modalName, fadeDuration, closeType });
            this.openedModals = uniq(this.openedModals.filter(_modalName => modalName !== _modalName));
            setTimeout(() => {
                res();
            }, fadeDuration);
        });

    };

    abortAll = async (): Promise<void> => {
        await Promise.all(this.openedModals.map(modalName => this.closeModal(modalName, 'abort', 200)));
        this.closeAllSignal.dispatch('');
    };

}

export const modalManager = new ModalManager();
