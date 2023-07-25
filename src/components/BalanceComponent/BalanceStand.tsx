import { FC } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { BalanceComponent } from './BalanceComponent';

export const BalanceStand: FC = () => {
    return (
        <Flex sx={{ p: '20px' }}>
            <BalanceComponent
                mr="50px"
                label={{ i18key: 'Balance' }}
                align="left"
                balance="100"
                ticker="L2MP"
            />
            <BalanceComponent
                label={{ i18key: 'Estimated Annual Interest' }}
                align="left"
                labelHelp={() => <Box>labelHelp text</Box>}
                balance="14"
                ticker="%"
            />
        </Flex>
    );
};

BalanceStand.displayName = 'BalanceStand';
