import { Money } from '@waves/data-entities';

interface IUserAssets {
    currentPeriodStart: number;
    currentPeriodAvailableToClaim: number;
    nextPeriodStart: number;
    nextPeriodAvailableToClaim: number;
    totalLeasedAmount: number;
    currentHeight: number;
}

interface IUserContractData {
    currentPeriodStart: number;
    currentPeriodAvailableToClaim: Money;
    nextPeriodStart: number;
    nextPeriodAvailableToClaim: Money;
    totalLeasedAmount: Money;
    currentHeight: number;
}

interface IUserLeasingNodeDataRaw {
    currentPeriodHeight: number;
    currentLeasingAmount: number
    nextPeriodHeight: number;
    nextLeasingAmount: number;
}

interface IUserLeasingNodeData {
    nodeAddress: string;
    currentPeriodHeight: number;
    currentLeasingAmount: Money;
    nextPeriodHeight: number;
    nextLeasingAmount: Money;
}

interface IUserLeasingData {
    nodes: Record<string, IUserLeasingNodeData>;
}

interface IUserData extends IUserContractData {
    nodes: IUserLeasingNodeData;
}
