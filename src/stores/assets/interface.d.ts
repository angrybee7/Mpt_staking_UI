import { Asset, IAssetJSON } from '@waves/data-entities';
import { IAssetInfo } from '@waves/data-entities/dist/entities/Asset';
import { BigNumber } from '@waves/bignumber';

export type TMetaData = {
    hasImage?: boolean;
    id?: string;
    oracleData?: Array<IOracleData>;
    labels?: Array<ASSET_LABELS>;
    sponsorBalance?: number;
};

export interface AssetWithMeta extends Asset {
    ethAddress?: string;
    meta?: TMetaData;
    icon?: string;
}

export enum ASSET_LABELS {
    GATEWAY = 'GATEWAY',
    STABLECOIN = 'STABLECOIN',
    WA_VERIFIED = 'WA_VERIFIED',
    COMMUNITY_VERIFIED = 'COMMUNITY_VERIFIED',
    POOLS_LP = 'POOLS_LP',
    LAMBO_LP = 'LAMBO_LP',
    ALGO_LP = 'ALGO_LP',
    STAKING_LP = 'STAKING_LP',
    VIRES_LP = 'VIRES_LP',
    LEVERAGE = 'LEVERAGE',
    '3RD_PARTY' = '3RD_PARTY',
    WX = 'WX',
    STAKING_POOLS_LP = 'STAKING_POOLS_LP',
    MAIN = 'MAIN',
    PEPE = 'PEPE'
}

export interface IOracleData extends Record<string, unknown> {
    logo?: string;
    ticker?: string;
    email?: string;
    status?: string;
    link?: string;
    version?: string;
}

export interface IExpandedAssetJson {
    type: string;
    data: IAssetJSON;
    metadata: {
        has_image: boolean;
        verified_status: number;
        oracle_data?: Array<IOracleData>;
        labels?: Array<ASSET_LABELS>;
        sponsor_balance?: number;
    };
}

export interface IAssetsResponse {
    type: string;
    item_type: string;
    data: Array<IExpandedAssetJson>;
    cursor: string;
}

export interface INewAssetJSON extends IAssetInfo {
    readonly ticker?: string;
    readonly id: string;
    readonly name: string;
    readonly precision: number;
    readonly description: string;
    readonly height: number;
    readonly timestamp: Date;
    readonly sender: string;
    readonly reissuable: boolean;
    readonly quantity: BigNumber;
    readonly has_script?: boolean;
    readonly min_sponsored_fee?: BigNumber;
}
