import { ITransProps } from '@waves/ui-translator';
import { isNumber } from 'ts-utils';

const makeErrorTest = (regex: RegExp) => (e: Error | string) => {
    const msg = typeof e === 'string' ? e : e.message;
    return regex.test(msg);
};

export const isUserRejection = makeErrorTest(
    /user rejection|window was closed by user|user denied message|User rejected the request/im
);
export const isWrongChain = makeErrorTest(
    /not equals keeper connect|invalid connect options./im
);
export const isAnotherAccount = makeErrorTest(
    /your address is not equal to login address./im
);
export const isMetamaskRejection = makeErrorTest(
    /MetaMask Tx Signature: User denied transaction signature./im
);

export const parseError = (e, isDevices, device): ITransProps => {
    let trans;

    switch (true) {
        case isUserRejection(e):
            trans = {
                i18key: `rejectedByUser${isDevices ? 'Device' : ''}`,
                i18Params: { device },
            };
            break;
        case isWrongChain(e):
            trans = {
                i18key: 'wrongNetworkError',
                i18Params: { device },
            };
            break;
        case isAnotherAccount(e):
            trans = {
                i18key: 'wrongUser',
                i18Params: { device },
            };
            break;
        case isMetamaskRejection(e):
            trans = {
                i18key: `rejectedByUser${isDevices ? 'Device' : ''}`,
                i18Params: { device },
            };
            break;
        case e && e?.error && isNumber(e?.error):
            trans = {
                i18key: 'somethingWrongWithNode',
                i18Params: { code: e.error },
            };
            break;
        default:
            trans = {
                i18key: 'somethingWrong',
            };
            break;
    }

    return trans;
};
