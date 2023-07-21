import { AssetWithMeta } from '../assets/interface';
import { Money } from '@waves/data-entities';

export interface IBalance {
    asset: AssetWithMeta;
    balance?: Money;
}

export interface IWavesBalanceResponse {
    address: string;
    regular: number;
    generating: number;
    available: number;
    effective: number;
};

export interface INodeBalanceItem {
    assetId: string;
    balance: string;
    issueTransaction: any;
    quantity: string;
    reissuable: boolean;
    sponsorBalance: string | number | void;
    minSponsoredAssetFee: string | number | void;
}

export type TNodeBalanceResponse = {
    address: string; // user address
    balances: Array<INodeBalanceItem>;
};
