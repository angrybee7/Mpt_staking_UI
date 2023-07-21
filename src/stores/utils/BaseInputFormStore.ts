import { action, computed, makeObservable, observable } from 'mobx';
import { Money } from '@waves/data-entities';
import { BaseFormStore } from './BaseFormStore';
import { AppStore } from '../AppStore';
import { InputErrorsProps } from 'uikit';

export type TInputErrorState = 'notEnoughFunds' | 'minAmount' | 'required';

export interface BaseInputFormStoreParams {
    rs: AppStore;
    inputMoney: Money;
    isMinAmountForWaves?: boolean
}

export class BaseInputFormStore extends BaseFormStore {

    public currentAmount: Money;
    public amountError: InputErrorsProps;
    public inputString: string;
    public isMinAmountForWaves: boolean;

    constructor({ rs, inputMoney, isMinAmountForWaves = false }: BaseInputFormStoreParams) {
        super(rs);
        this.currentAmount = inputMoney;
        this.isMinAmountForWaves = isMinAmountForWaves;
        makeObservable(this, {
            amountError: observable,
            updateAmountError: action,
            inputString: observable,
            currentTokenBalance: computed
        });
    }

    public reset(): void {
       super.reset();
       this.updateAmountError(undefined);
       this.inputString = undefined;
    }

    public get currentTokenBalance(): Money | undefined {
        return this.rs.balanceStore.balances[this.currentAmount?.asset.id]?.balance;
    }

    public get minAmount(): Money {
        return new Money(0, this.rs.assetsStore.WAVES).cloneWithTokens(1);
    }

    public get maxAmount(): Money | undefined {
        const asset = this.currentAmount?.asset;
        if (!asset) {
            return;
        }

        const zeroMoney = new Money(0, asset);

        if (!this.rs.balanceStore.balances[asset.id]?.balance) {
            return zeroMoney;
        }

        return zeroMoney.cloneWithTokens(this.rs.balanceStore.balances[asset.id].balance.getTokens());
    }

    public onInputChange(value: string): void {
        this.updateAmountError(undefined);
        this.inputString = value;
        this.currentAmount = this.currentAmount.cloneWithTokens(value);
    }

    public onClickMaxAmount = (): void => {
        const tokenId = this.currentTokenBalance?.asset.id;
        const feeId = this.fee?.asset.id;
        const max =
            tokenId && tokenId === feeId
                ? this.currentTokenBalance.minus(this.fee)
                : this.currentTokenBalance;

        this.onInputChange(
            max && !max?.getTokens()?.isNegative()
                ? max?.getTokens()?.toString()
                : '0'
        );
    };

    public checkInput = (): boolean => {
        this.updateIsConfirmClicked(true);
        this.updateSignError(undefined);
        this.validateAmount();
        return !(!this.isEnoughMoney || this.amountError);
    };

    protected validateAmount(): void {
        if (!this.inputString || !this.currentAmount || this.currentAmount.getTokens().eq(0)) {
            this.updateAmountError({ error: 'required' });
            return;
        }
        if (this.maxAmount && this.maxAmount.getTokens().lt(this.currentAmount.getTokens())) {
            this.updateAmountError({ error: 'notEnoughFunds' });
            return;
        }
        if (
            this.isMinAmountForWaves &&
            this.minAmount &&
            this.minAmount.getTokens().gt(this.currentAmount.getTokens())
        ) {
            this.updateAmountError({
                error: 'minAmount',
                minAmount: this.minAmount.getTokens(),
                assetName: this.minAmount.asset.displayName,
            });
            return;
        }

        this.updateAmountError(undefined);
    }

    public updateAmountError(error: InputErrorsProps): void {
        this.amountError = error;
    }

}
