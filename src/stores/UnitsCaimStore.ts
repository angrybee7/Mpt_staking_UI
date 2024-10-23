import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from './utils/BaseInputFormStore.ts';
import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';

export class UnitsClaimStore extends BaseInputFormStore {

    constructor(params: BaseInputFormStoreParams) {
        super(params);
    }

    public get tx(): {
        call: InvokeScriptCall | null;
        payment: Array<InvokeScriptPayment> | null;
        dApp: string;
        } {
        const call = {
            function: 'claimUnits',
            args: [],
        };
        return {
            call: call as InvokeScriptCall,
            payment: [],
            dApp: this.rs.configStore.config.contracts.leasing
        };
    }

    public invoke = (): Promise<void> => {
        return this.sendTransaction(() =>
            this.rs.providerStore.sendInvoke(this.tx)
        );
    };
}