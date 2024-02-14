import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import {
    BaseInputFormStore,
    BaseInputFormStoreParams,
} from '../../../../../stores/utils/BaseInputFormStore.ts';
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { INode } from '../../../../../stores/utils/fetchNodeList.ts';
import { InputErrorsProps } from 'uikit';
import { Money } from '@waves/data-entities';

export class StakeStore extends BaseInputFormStore {

    public node: INode = this.rs.contractStore.userNode;
    public manuallyAddressInput = '';
    public isManually = false;

    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            node: observable,
            manuallyAddressInput: observable,
            isManually: observable,
            setNode: action.bound,
            setManuallyAddressInput: action.bound,
            setIsManually: action.bound,
            nodeSelectError: computed,
            totalStaked: computed,
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
        );
        reaction(
            () => this.manuallyAddressInput,
            () => {
                this.setNode({ address: this.manuallyAddressInput });
            }
        );
    }

    public get totalStaked(): Money | undefined {
        return this.rs.contractStore.totalStaked;
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

    public setManuallyAddressInput(manuallyAddressInput: string): void {
        this.manuallyAddressInput = manuallyAddressInput;
    }

    public setIsManually(isManually: boolean): void {
        this.isManually = isManually;
    }

    protected checkSelect(): boolean {
        return !!this.rs.contractStore.userNode || !!this.node;
    }
}
