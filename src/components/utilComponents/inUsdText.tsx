import * as React from 'react';
import { BigNumber } from '@waves/bignumber';
import { Text } from 'uikit';
import { TTextProps } from '@waves.exchange/wx-react-uikit';

interface Props extends TTextProps {
    usd: BigNumber | null | undefined;
    decimals: number;
    label?: string;
    isBalanceMoreHundred?: boolean;
    hasBrackets?: boolean;
}

export const InUsdText: React.FC<Props> = ({
    usd,
    decimals,
    label = '$',
    isBalanceMoreHundred = false,
    hasBrackets = true,
    ...props
}) => {
    const inUsdText = React.useMemo(() => {
        if (!usd || usd.isZero() || usd.isNaN() || !usd.isFinite()) {
            return '';
        }
        const isRoundBalance = isBalanceMoreHundred && usd.toNumber() > 100;
        return hasBrackets ?
            `(${label}${
                isRoundBalance ? usd.roundTo(null, 3) : usd.toFormat(decimals)
            })` :
            `${label}${
                isRoundBalance ? usd.roundTo(null, 3) : usd.toFormat(decimals)
            }`;
    }, [usd]);

    return <Text {...(props as any)}>{inUsdText}</Text>;
};
