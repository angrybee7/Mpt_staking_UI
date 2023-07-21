import { Asset } from '@waves/data-entities';
import { BigNumber } from '@waves/bignumber';

export const wavesAsset = new Asset({
    ticker: 'WAVES',
    id: 'WAVES',
    name: 'Waves',
    precision: 8,
    description: '',
    height: 0,
    hasScript: false,
    timestamp: new Date('2016-04-11T21:00:00.000Z'),
    minSponsoredFee: new BigNumber(0),
    sender: '',
    quantity: 10000000000000000,
    reissuable: false,
});
