import { FC } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { BalanceComponent } from './BalanceComponent';
import { BalanceRow } from './BalanceRow';

export const BalanceStand: FC = () => {
    return (
        <Box>
            <Flex sx={{ p: '20px' }}>
                <BalanceComponent
                    mr="50px"
                    label={{ i18key: 'Balance' }}
                    align="left"
                    balance="100"
                    ticker="L2MP"
                />
                <BalanceComponent
                    mr="50px"
                    label={{ i18key: 'Balance' }}
                    align="left"
                    balance="0.00"
                    ticker="L2MP"
                />
                <BalanceComponent
                    mr="50px"
                    label={{ i18key: 'Estimated Annual Interest' }}
                    align="left"
                    labelHelp={() => <Box>labelHelp text</Box>}
                    balance="14"
                    ticker="%"
                />
            </Flex>
            <Flex sx={{ p: '20px' }}>
                <BalanceRow
                    mr="50px"
                    label={{ i18key: 'Estimated Annual Interest' }}
                    balance="0.00"
                    ticker="L2MP"
                />
                <BalanceRow
                    label={{ i18key: 'Estimated Annual Interest' }}
                    balance="14"
                    ticker="L2MP"
                />
            </Flex>
        </Box>
    );
};

BalanceStand.displayName = 'BalanceStand';
