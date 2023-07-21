import { Asset } from '@waves/data-entities';
import { AssetWithMeta } from '../stores/assets/interface';


export function createBaseAsset(
    { name, id, precision }: { name: string; id: string; precision: number }
): AssetWithMeta {
    return new Asset({
        ticker: name,
        id,
        name,
        precision,
        description: '',
        height: 0,
        hasScript: false,
        timestamp: new Date('2023-01-01T00:00:00.000Z'),
        sender: '',
        quantity: 0,
        reissuable: false
    }) as AssetWithMeta;
}

export function toId(asset: string | Asset): string {
    return (typeof asset === 'string' ? asset : asset?.id) || 'WAVES';
}

export const getPair = (assetId: string|Asset, asset2Id: string|Asset): string => {
    return `${toId(assetId)}/${toId(asset2Id)}`;
};
