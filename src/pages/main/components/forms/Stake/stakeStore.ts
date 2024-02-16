import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../../stores/utils/BaseInputFormStore.ts';
import { action, computed, makeObservable, observable } from 'mobx';
import { INode } from '../../../../../stores/utils/fetchNodeList.ts';
import { InputErrorsProps } from 'uikit';
import { Money } from '@waves/data-entities';
import { validate } from '../../../../../utils';

export class StakeStore extends BaseInputFormStore {

    public node: INode;

    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            node: observable,
            setNode: action.bound,
            nodeSelectError: computed,
            totalStaked: computed,
        });
    }

    public get totalStaked(): Money | undefined {
        return this.rs.contractStore.totalStaked;
    }

    public get tx(): {
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
    } {
        // TODO
        const call = {
            function: 'lease',
            args: [{ type: 'string', value: this.node.address }],
        } as InvokeScriptCall<string>;

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
            );
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
