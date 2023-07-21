import { Money } from '@waves/data-entities';
import { ITransProps } from '@waves/ui-translator';
import { action, computed, makeObservable, observable } from 'mobx';
import { isEnoughMoney } from '../../utils';
import { BalanceStore } from '../balance/BalanceStore';
import { wavesAsset } from '../../services/assets';
import { AppStore } from '../AppStore';
import {
    TYPE_DEVICES_NAMES,
    getDevice,
    isAvailableDevice,
} from '../../utils/helpersInformationDevices';
import { parseError } from '.';

export enum FORM_STATE {
    'pending' = 'pending',
    'error' = 'error',
    'initial' = 'initial',
}

export class BaseFormStore {
    public formState: FORM_STATE = FORM_STATE.initial;
    public fee: Money;
    public signError: ITransProps;
    public isConfirmClicked = false;
    public balanceStore: BalanceStore;
    public rs: AppStore;

    constructor(rs: AppStore) {
        this.rs = rs;
        this.balanceStore = rs.balanceStore;
        this.fee = new Money(500000, wavesAsset);
        makeObservable(this, {
            formState: observable,
            isConfirmClicked: observable,
            isRetry: computed,
            isPending: computed,
            isEnoughMoney: computed,
            isDevices: computed,
            signError: observable,
            updateFormState: action,
            sendTransaction: action,
            updateSignError: action,
        });
    }

    public get isEnoughMoney(): boolean {
        if (!this.fee || !this.balanceStore.balances) {
            return false;
        }
        return isEnoughMoney(this.fee, this.balanceStore.balances);
    }

    public get isRetry(): boolean {
        return this.isConfirmClicked && this.formState === FORM_STATE.error;
    }

    public get isDevices(): boolean {
        return isAvailableDevice(this.rs.authStore.user?.type);
    }

    public get currentDevice(): TYPE_DEVICES_NAMES {
        return getDevice(this.rs.authStore.user?.type);
    }

    public get isPending(): boolean {
        return this.formState === FORM_STATE.pending;
    }

    public get activeErrors(): Array<ITransProps> {
        const errors = [];
        if (this.isConfirmClicked && !this.isEnoughMoney) {
            errors.push({ i18key: 'noEnoughFee' });
        }
        if (this.signError) {
            errors.push(this.signError);
        }
        return errors;
    }

    public updateFormState(state: FORM_STATE) {
        this.formState = state;
    }

    public updateSignError(error: ITransProps): void {
        this.signError = error;
    }

    public updateIsConfirmClicked(isConfirmClicked: boolean): void {
        this.isConfirmClicked = isConfirmClicked;
    }

    public reset(): void {
        this.updateIsConfirmClicked(false);
        this.updateSignError(undefined);
        this.updateFormState(FORM_STATE.initial);
    }

    public sendTransaction(promise: () => Promise<any>): any {
        if(this.isPending){
            return;
        }

        this.updateFormState(FORM_STATE.pending);
        this.updateIsConfirmClicked(true);

        if (!this.isEnoughMoney) {
            this.updateFormState(FORM_STATE.error);
            return;
        }

        return promise()
            .then((data) => {
                this.reset();
                return data;
            })
            .catch((e) => {
                this.updateSignError(parseError(e, this.isDevices, this.currentDevice));
                this.updateFormState(FORM_STATE.error);
                throw new Error(e);
            });
    }
}
