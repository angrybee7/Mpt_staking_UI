import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../stores/utils/BaseInputFormStore.ts';
import { action, makeObservable, observable } from 'mobx';
import { INode } from '../../../../stores/utils/fetchNodeList.ts';

export class StakeStore extends BaseInputFormStore {

    public node: INode = this.rs.contractStore.userNode;
    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            node: observable,
            setNode: action.bound,
        });
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

    public setNode(node: INode): void {
        this.node = node;
    }
}
