import { USER_TYPES } from "../stores/AuthStore";

export enum DEVICES_FULL_NAMES {
    MetaMask = 'MetaMask',
    KeeperWallet = 'Keeper Wallet',
    Ledger = 'Ledger',
}

export type USER_TYPES_VALUES = keyof typeof USER_TYPES;

export type TYPE_DEVICES_NAMES =
    | DEVICES_FULL_NAMES.KeeperWallet
    | DEVICES_FULL_NAMES.Ledger
    | DEVICES_FULL_NAMES.MetaMask;

export const getMetamaskDeviceName = (): DEVICES_FULL_NAMES.MetaMask => {
    return DEVICES_FULL_NAMES.MetaMask;
};

export const getKeeperWalletDeviceName =
    (): DEVICES_FULL_NAMES.KeeperWallet => {
        return DEVICES_FULL_NAMES.KeeperWallet;
    };

export const getLedgerDeviceName = (): DEVICES_FULL_NAMES.Ledger => {
    return DEVICES_FULL_NAMES.Ledger;
};

export const getDevice = (userType: USER_TYPES_VALUES): TYPE_DEVICES_NAMES => {
    switch (userType) {
        case USER_TYPES.keeper:
            return getKeeperWalletDeviceName();
        case USER_TYPES.ledger:
            return getLedgerDeviceName();
        case USER_TYPES.metamask:
            return getMetamaskDeviceName();
        default:
            return getKeeperWalletDeviceName();
    }
};

export const isAvailableDevice = (userType: USER_TYPES_VALUES): boolean =>
    userType === USER_TYPES.keeper || userType === USER_TYPES.ledger || userType === USER_TYPES.metamask;
