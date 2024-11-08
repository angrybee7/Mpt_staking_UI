import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from './utils/BaseInputFormStore.ts';
import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';

export class UnitsDropClaimStore extends BaseInputFormStore {

    constructor(params: BaseInputFormStoreParams) {
        super(params);
    }

    public get tx(): {
        call: InvokeScriptCall | null;
        payment: Array<InvokeScriptPayment> | null;
        dApp: string;
        } {
        const call = {
            function: 'claimAll',
            args: [],
        };
        return {
            call: call as InvokeScriptCall,
            payment: [],
            dApp: this.rs.configStore.config.contracts.unitsDrop
        };
    }

    public invoke = (): Promise<void> => {
        return this.sendTransaction(() =>
            this.rs.providerStore.sendInvoke(this.tx)
        );
    };
}