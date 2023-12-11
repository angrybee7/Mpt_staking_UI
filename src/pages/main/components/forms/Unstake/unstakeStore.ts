import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../../stores/utils/BaseInputFormStore.ts';
import { Money } from '@waves/data-entities';

export class UnstakeStore extends BaseInputFormStore {
    constructor(params: BaseInputFormStoreParams) {
        super(params);
    }

    public get tx(): {
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
        } {
        return {
            call: {
                function: 'withdraw',
                args: [{
                    type: 'integer',
                    value: this.currentAmount.getCoins().toNumber(),
                }],
            },
            payment: [],
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

    public get maxAmount(): Money | undefined {
        return this.rs.contractStore.userContractData.data.availableToWithdraw;
    }

    public get currentTokenBalance(): Money | undefined {
        return this.rs.contractStore.userContractData.data.availableToWithdraw;
    }

    public get totalStaked(): Money | undefined {
        return this.rs.contractStore.totalStaked;
    }
}
