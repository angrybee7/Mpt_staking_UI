import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../../stores/utils/BaseInputFormStore.ts';
import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { INode } from '../../../../../stores/utils/fetchNodeList.ts';
import { InputErrorsProps } from 'uikit';

export class SwapStore extends BaseInputFormStore {
    public autoStake = true;
    public node: INode = this.rs.contractStore.userNode;

    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            autoStake: observable,
            setAutoStake: action.bound,
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
        dApp: string;
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
    } {
        console.info(this.node?.address);
        const call = this.autoStake && this.node && this.node.address !== this.rs.contractStore.userNode?.address ?
            {
                function: 'swapAndSetStakingNode',
                args: [
                    { type: 'boolean', value: this.autoStake },
                    { type: 'string', value: this.node.address }
                ],
            } :
            {
                function: 'swap',
                args: [
                    { type: 'boolean', value: this.autoStake },
                ],
            };
        return {
            dApp: this.rs.configStore.config.contracts.swap,
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
        if (
            this.autoStake &&
            !this.rs.contractStore.userNode &&
            this.isConfirmClicked &&
            !this.node
        ) {
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

    public setAutoStake(value: boolean): void {
        this.autoStake = value;
    }

    public reset(): void {
        super.reset();
        this.setAutoStake(true);
    }

    public setNode(node: INode): void {
        this.node = node;
    }

    protected checkSelect(): boolean {
        return !this.autoStake || (!!this.rs.contractStore.userNode || !!this.node);
    }
}
