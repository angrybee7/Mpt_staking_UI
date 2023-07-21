import { BigNumber } from '@waves/bignumber';

export enum HEURISTICS {
    SameAsset = 'SameAsset',
    USDLike = 'USDLike',
    Defo = 'Defo',
    AnyStake= 'AnyStake',
    Exchange = 'Exchange',
    NeutrinoGovernance = 'NeutrinoGovernance'
}

export type TRateData = {
    exchange?: BigNumber;
    heuristic?: BigNumber
};

type TRatesData = Array<TRateData>;

type TRatesHash = Record<string, TRateData>

export interface IRatesResponse {
    type?: 'list';
    data: Array<{
        pair: string;
        heuristics: Array<HEURISTICS>;
        data: {
            exchange?: number | null;
            heuristic?: number | null;
        };
    }>;
}
