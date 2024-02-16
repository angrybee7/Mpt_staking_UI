import { Money } from '@waves/data-entities';

interface ICommonContractData {
    totalAssetAmount: Money;
    emissionPerBlock: Money;
}


interface IUserAssets {
    availableInternalLp: number;
    availableToWithdraw: number;
    currentInternalLPPrice: number;
    userTotalStaked: number;
    userTotalWithdrawn: number;
}

interface IUserContractData {
    currentPeriodStart: number;
    currentPeriodAvailableToClaim: Money;
    nextPeriodStart: number;
    nextPeriodAvailableToClaim: Money;
    totalLeasedAmount: Money;
    currentHeight: number;
}
