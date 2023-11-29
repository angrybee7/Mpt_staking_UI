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
    availableInternalLp: Money;
    availableToWithdraw: Money;
    currentInternalLPPrice: Money; // ??
    userTotalStaked: Money;
    userTotalWithdrawn: Money;
    userLockedInternalLpAmount: Money;
    userLockedTokenAmount: Money;
    userStakingNodes: Array<string>;
    userStakingNodesShares: Array<number>;
}
