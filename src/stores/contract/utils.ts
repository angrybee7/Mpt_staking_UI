import { Money } from '@waves/data-entities';

export const filterObjectUserLeasing =  ({ contractAddress, userAddress }) => {
    const values = [
        [contractAddress, userAddress]
    ];

    return {
        filter: {
            in: {
                properties: [
                    { address: {} },
                    { fragment: { position: 1, type: 'string' } },
                ],
                values
            }
        }
    };
};


export const moneyFactory = (zeroMoney: Money) => (amount: number):  Money => {
    return zeroMoney.cloneWithCoins(amount);
};

export const BLOCKS_PER_DAY = 60 * 24;
export const BLOCKS_PER_YEAR = BLOCKS_PER_DAY * 365;
