import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../stores/utils/BaseInputFormStore.ts';
import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import { action, makeObservable, observable } from 'mobx';

export class SwapStore extends BaseInputFormStore {
    public autoStake = false;

    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            autoStake: observable,
            setAutoStake: action,
        });
    }

    public get tx(): {
        dApp: string;
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
    } {
        return {
            dApp: this.rs.configStore.config.contracts.swap,
            call: {
                function: 'swap',
                args: [
                    {
                        type: 'boolean',
                        value: this.autoStake,
                    },
                ]
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

    public setAutoStake(value: boolean): void {
        this.autoStake = value;
    }

    public reset(): void {
        super.reset();
        this.setAutoStake(false);
    }
}
