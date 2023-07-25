import { modalManager } from '../services/modalManager.ts';
import { MODAL_NAMES } from '../components/ModalContainer/MODAL_NAMES.ts';
import { useContext, useRef, useState } from 'react';
import { KeeperAuthModalProps } from '../components/modals/KeeperAuthModal/KeeperAuthModal.tsx';
import { AppStoreContext } from '../App.tsx';
import { PROVIDER_TYPES_VALUES } from '../stores/AuthStore.ts';

export enum AUTH_DEVICE_STATES {
    notInstalled = 'notInstalled',
    signCustom = 'signCustom',
    switchNetwork = 'switchNetwork',
    connectionRejected = 'connectionRejected',
    noAccounts = 'noAccounts',
    noLogin = 'noLogin',
    approveConnection = 'approveConnection'
}

interface IUseAuth {
    login: (electedProvider: PROVIDER_TYPES_VALUES) => Promise<void>;
    deviceState: AUTH_DEVICE_STATES | undefined;
}

type TProviderError = {
    code: '10' | '13' | '14';
    data: any;
    message: string;
};

const getModalNameBySelectedProvider = (selectedProvider: PROVIDER_TYPES_VALUES): MODAL_NAMES => {
    return `${selectedProvider}Auth` as MODAL_NAMES;
};

export const useAuth = (): IUseAuth => {
    const { authStore } = useContext(AppStoreContext);
    const [deviceState, setDeviceState] = useState<AUTH_DEVICE_STATES | undefined>();
    const prevState = useRef<AUTH_DEVICE_STATES | undefined>();
    let selectedProvider: PROVIDER_TYPES_VALUES;

    const login = async (_selectedProvider: PROVIDER_TYPES_VALUES): Promise<void> => {
        selectedProvider = _selectedProvider;
        try {
            await authStore.login(selectedProvider);
            await modalManager.closeModal(getModalNameBySelectedProvider(selectedProvider), 'close');
        } catch (e: Error | TProviderError | unknown) {
            console.log(e);
            let _deviceState: AUTH_DEVICE_STATES | undefined;
            if (e instanceof Error && e.message === `${selectedProvider} is not installed`) {
                _deviceState = AUTH_DEVICE_STATES.notInstalled;
            }
            if (e instanceof Error &&  e.message.includes('Invalid connect options.')) {
                _deviceState = AUTH_DEVICE_STATES.switchNetwork;
            }
            if (typeof e === 'string' && e.includes('Error requestAccounts')) {
                _deviceState = AUTH_DEVICE_STATES.approveConnection;
            }
            if (e && (e as TProviderError).code === '13') {
                _deviceState = AUTH_DEVICE_STATES.noLogin;
            }
            if (e && (e as TProviderError).code === '14') {
                _deviceState = AUTH_DEVICE_STATES.noAccounts;
            }
            if (e && (e as TProviderError).code === '10') {
                _deviceState = AUTH_DEVICE_STATES.connectionRejected;
            }
            onChangeDeviceState(_deviceState);
        }
    };

    const onChangeDeviceState = async (_deviceState: AUTH_DEVICE_STATES) => {
        setDeviceState(_deviceState);
        if (_deviceState) {
            const modalName = getModalNameBySelectedProvider(selectedProvider);
            if (modalManager.openedModals.includes(modalName) && prevState.current === _deviceState) {
                return;
            }
            prevState.current = _deviceState;
            await modalManager.abortAll();
            setTimeout(() => {
                modalManager.openModal(modalName, {
                    modalState: _deviceState,
                    onRetry: () => login(selectedProvider)
                });
            }, 200);
        }
    };


    return {
        login,
        deviceState
    };
};
