import * as React from 'react';
import { ITransProps, Trans } from '@waves/ui-translator';
import { Flex, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Text } from '../../uikit/Text/Text';

type BalanceRowProps = TFlexProps & {
    balance: string | number;
    label: ITransProps;
    ticker: string;
}

export const BalanceRow: React.FC<BalanceRowProps> = ({ balance, label, ticker, ...rest }) => {
    return (
        <Flex alignItems="center" {...rest}>
            <Text as="div" variant="heading4" fontFamily="Sfmono-light" color="text" sx={{ mr: '8px' }}>
                <Trans {...label} />{':'}
            </Text>
            {balance ?
                <Text variant="heading4" color={Number(balance) === 0 ? 'textsec' : 'main'}>{`${balance} ${ticker}`}</Text> :
                <Text color="text">...</Text>
            }
        </Flex>
    );
};

BalanceRow.displayName = 'BalanceRow';
