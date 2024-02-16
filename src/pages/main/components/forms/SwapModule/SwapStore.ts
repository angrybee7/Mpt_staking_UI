import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../../stores/utils/BaseInputFormStore.ts';
import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { INode } from '../../../../../stores/utils/fetchNodeList.ts';
import { InputErrorsProps } from 'uikit';
import { validate } from '../../../../../utils';

export class SwapStore extends BaseInputFormStore {
    public node: INode;

    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            node: observable,
            setNode: action.bound,
            nodeSelectError: computed,
        });
    }

    public get tx(): {
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
    } {
        // TODO
        const call = this.node ?
            {
                function: 'swapAndSetStakingNode',
                args: [
                    { type: 'boolean', value: true },
                    { type: 'string', value: this.node.address }
                ],
            } :
            {
                function: 'swap',
                args: [
                    { type: 'boolean', value: true },
                ],
            };
        return {
            call: call as InvokeScriptCall<string | number>,
            payment: [
                {
                    assetId: this.currentAmount.asset.id,
                    amount: this.currentAmount.getCoins().toNumber(),
                },
            ],
        };
    }

    public get nodeSelectError(): InputErrorsProps {
        if (this.isConfirmClicked && !this.node) {
            return ({ error: 'required' });
        } else if (this.isConfirmClicked && this.node?.address && !this.isValidNodeAddress()) {
            return ({ error: 'invalidAddress' });
        } else {
            return undefined;
        }
    }

    public invoke = () => {
        const inputResult = this.checkInput();
        const selectResult = this.checkNode();
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

    public onSetManuallyNodeAddress(address: string): void {
        this.setNode({ address });
    }

    public reset(): void {
        super.reset();
        this.setNode(undefined);
    }

    protected checkNode(): boolean {
        return !!this.node && this.isValidNodeAddress();
    }

    protected isValidNodeAddress(): boolean {
        try {
            return validate.address(
                this.node?.address || '',
                this.rs.configStore.config.network.code.charCodeAt(0)
            )
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
