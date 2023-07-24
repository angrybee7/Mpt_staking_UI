import BigNumber from '@waves/bignumber';
import { Money } from '@waves/data-entities';

interface ICommonContractData {
    totalAssetAmount: BigNumber;
    emissionPerBlock: BigNumber;
}


interface IUserAssets {
    availableInternalLp: number;
    availableToWithdraw: number;
    currentInternalLPPrice: number;
    userTotalStaked: number;
    userTotalWithdrawn: number;
}

interface IUserContractData {
    availableInternalLp: Money;
    availableToWithdraw: Money;
    currentInternalLPPrice: Money; // ??
    userTotalStaked: Money;
    userTotalWithdrawn: Money;
}
