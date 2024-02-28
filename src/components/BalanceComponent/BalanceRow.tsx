import * as React from 'react';
import { ITransProps, Trans } from '@waves/ui-translator';
import { Box, Flex, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Help, Text } from 'uikit';

type BalanceRowProps = TFlexProps & {
    balance: string | number;
    ticker: string;
    label?: ITransProps;
    helpTrans?: ITransProps;
}

export const BalanceRow: React.FC<BalanceRowProps> = ({
    balance,
    label,
    ticker,
    helpTrans,
    ...rest
}) => {
    return (
        <Flex alignItems="center" {...rest}>
            {label ?
                <Text
                    as="div"
                    variant="heading4"
                    fontFamily="Sfmono-light"
                    color="text"
                    sx={{ mr: '8px' }}
                >
                    <Trans {...label} />{':'}
                </Text> :
                null
            }
            {balance ?
                <Text
                    variant="heading4"
                    color={Number(balance) === 0 ? 'textsec' : 'main'}
                >
                    {`${balance} ${ticker}`}
                </Text> :
                <Text color="text">...</Text>
            }
            {helpTrans ?
                <Help ml={12}>
                    <Box width="max-content" maxWidth="280px">
                        <Trans
                            i18key={helpTrans.i18key}
                            i18Params={helpTrans?.i18Params}
                        />
                    </Box>
                </Help> :
                null
            }
        </Flex>
    );
};

BalanceRow.displayName = 'BalanceRow';
