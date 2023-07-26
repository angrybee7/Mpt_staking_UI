import { BaseInputFormStore, BaseInputFormStoreParams } from '../../../../stores/utils/BaseInputFormStore.ts';
import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import { action, makeObservable, observable } from 'mobx';

export class SwapStore extends BaseInputFormStore {

    public autoStake = false;

    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            autoStake: observable,
            setAutostake: action
        })
    }

    public get tx(): {
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
    } {
        return {
            call: {
                function: 'swap',
                args: this.autoStake ? [{
                    type: 'boolean',
                    value: true
                }] : [],
            },
            payment: [
                {
                    assetId: this.currentAmount.asset.id,
                    amount: this.currentAmount.getCoins().toNumber(),
                },
            ],
        };
    }

    public invoke = () => {
        const inputResult = this.checkInput();
        if (!inputResult) {
            return;
        }
        this.sendTransaction(() =>
            this.rs.providerStore.sendInvoke(this.tx)
        ).then(() => {
            this.reset();
        });
    };

    public setAutostake(value: boolean): void {
        this.autoStake = value;
    }
}
