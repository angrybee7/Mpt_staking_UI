import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../stores/utils/BaseInputFormStore.ts';
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { INode } from '../../../../stores/utils/fetchNodeList.ts';
import { InputErrorsProps } from 'uikit';

export class StakeStore extends BaseInputFormStore {

    public node: INode = this.rs.contractStore.userNode;

    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            node: observable,
            setNode: action.bound,
            nodeSelectError: computed,
        });

        let initialUserNode = this.rs.contractStore.userNode;
        reaction(
            () => this.rs.contractStore.userNode,
            () => {
                if (!this.node || initialUserNode) {
                    this.node = this.rs.contractStore.userNode;
                }
                if (!initialUserNode) {
                    initialUserNode = this.rs.contractStore.userNode;
                }
            }
        )
    }

    public get tx(): {
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
    } {
        const call = this.node && this.node.address !== this.rs.contractStore.userNode?.address ?
            {
                function: 'stakeAndSetStakingNode',
                args: [{ type: 'string', value: this.node.address }],
            } as InvokeScriptCall<string> :
            {
                function: 'stake',
                args: [],
            };
        return {
            call,
            payment: [
                {
                    assetId: this.currentAmount.asset.id,
                    amount: this.currentAmount.getCoins().toNumber(),
                },
            ],
        };
    }

    public get nodeSelectError(): InputErrorsProps {
        if (!this.rs.contractStore.userNode && this.isConfirmClicked && !this.node) {
            return ({ error: 'required' });
        } else {
            return undefined;
        }
    }

    public invoke = () => {
        const inputResult = this.checkInput();
        const selectResult = this.checkSelect();
        if (!inputResult || !selectResult) {
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

    protected checkSelect(): boolean {
        return !!this.rs.contractStore.userNode || !!this.node;
    }
}
