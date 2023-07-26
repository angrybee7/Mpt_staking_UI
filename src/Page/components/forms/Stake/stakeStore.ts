import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../stores/utils/BaseInputFormStore.ts';
import { FORM_STATE } from '../../../../stores/utils/BaseFormStore.ts';

export class StakeStore extends BaseInputFormStore {
    constructor(params: BaseInputFormStoreParams) {
        super(params);
    }

    public get tx(): {
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
        } {
        return {
            call: {
                function: 'stake',
                args: [],
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
        this.updateFormState(FORM_STATE.pending);
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
}
