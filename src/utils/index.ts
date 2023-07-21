import { Money } from '@waves/data-entities';
import { IBalance } from '../stores/balance/interface';

export function toArray<T>(some: T | Array<T>): Array<T> {
    if (Array.isArray(some)) {
        return some;
    } else {
        return [some];
    }
}

export function normalizeTime(time: number | Date): number | Date {
    const timeDiff = 0;
    if (typeof time === 'number') {
        return time - timeDiff;
    } else {
        return new Date(time.getTime() - timeDiff);
    }
}

export const normalizeTxTimestamp = <T extends { timestamp: number }>(
    tx: T
): T => {
    return {
        ...tx,
        timestamp: normalizeTime(tx.timestamp || Date.now()),
    };
};

export const isEnoughMoney = (
    fee: Money,
    balance: Record<string, IBalance>
): boolean => {
    const balanceFeeAsset =
        (balance[fee.asset.id] && balance[fee.asset.id].balance) ||
        new Money(0, fee.asset);
    return balanceFeeAsset.gte(fee);
};

export const shortAddress = (address): string => `${address.slice(0, 8)}...${address.slice(-8)}`;
