import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../stores/utils/BaseInputFormStore.ts';
import { Money } from '@waves/data-entities';

interface IUnstakeStoreParams extends BaseInputFormStoreParams {
    nodeAddress: string;
}

export class UnstakeStore extends BaseInputFormStore {

    public nodeAddress: string;

    public get maxAmount(): Money | undefined {
        return this.currentTokenBalance;
    }

    public get currentTokenBalance(): Money | undefined {
        return (
            this.rs.contractStore.userContractData.data?.nodes[this.nodeAddress]?.nextLeasingAmount ||
            new Money(0, this.rs.assetsStore.LPToken)
        );
    }

    constructor(params: IUnstakeStoreParams) {
        super(params);
        this.nodeAddress = params.nodeAddress
    }

    public get tx(): {
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
    } {
        return {
            call: {
                function: 'cancelLease',
                args: [
                    { type: 'string', value: this.nodeAddress },
                    { type: 'integer', value: this.currentAmount.getCoins().toNumber() }
                ],
            },
            payment: [],
        };
    }

    public invoke = (): Promise<void> => {
        const inputResult = this.checkInput();
        if (!inputResult) {
            return Promise.reject();
        }
        return this.sendTransaction(() =>
            this.rs.providerStore.sendInvoke(this.tx)
        ).then(() => {
            this.reset();
        });
    };

    public reset(): void {
        super.reset();
        this.nodeAddress = '';
    }
}
