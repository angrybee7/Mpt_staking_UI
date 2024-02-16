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
import BigNumber from '@waves/bignumber';

export class StakeStore extends BaseInputFormStore {

    public node: INode;

    constructor(params: BaseInputFormStoreParams) {
        super(params);
        makeObservable(this, {
            node: observable,
            setNode: action.bound,
            nodeSelectError: computed,
            unstakedFunds: computed,
            availableForStaking: computed,
        });
    }

    public get unstakedFunds(): Money {
        const zeroMoney = new Money(0, this.rs.assetsStore.LPToken);
        const currentToClaim =
            this.rs.contractStore.userContractData.data?.currentPeriodAvailableToClaim?.getTokens() ||
            new BigNumber(0);
        const nextToClaim =
            this.rs.contractStore.userContractData.data?.nextPeriodAvailableToClaim?.getTokens() ||
            new BigNumber(0);
        return zeroMoney.cloneWithTokens(
            currentToClaim.add(nextToClaim)
        )
    }

    public get availableForStaking(): Money {
        const zeroMoney = new Money(0, this.rs.assetsStore.LPToken);
        const balance = this.balanceStore.lpBalance || zeroMoney.cloneWithTokens(0);
        return zeroMoney.cloneWithTokens(
            balance.getTokens().add(this.unstakedFunds.getTokens())
        );
    }

    public get maxAmount(): Money {
        return this.availableForStaking;
    }

    public get tx(): {
        call: InvokeScriptCall<string | number> | null;
        payment: Array<InvokeScriptPayment<string | number>> | null;
    } {
        const payment = BigNumber.max(
            this.currentAmount.getCoins().sub(this.unstakedFunds.getCoins()),
            0
        )
        const call = {
            function: 'leaseFromLocked',
            args: [
                { type: 'string', value: this.node.address },
                { type: 'integer', value: this.currentAmount.getCoins().toNumber() }
            ],
        } as InvokeScriptCall<string>;

        return {
            call,
            payment: payment.gt(0) ?
                [
                    {
                        assetId: this.currentAmount.asset.id,
                        amount: payment.toNumber(),
                    },
                ] :
                []
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
