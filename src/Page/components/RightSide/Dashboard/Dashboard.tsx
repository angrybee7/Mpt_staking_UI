import { FC, useContext } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { observer } from 'mobx-react-lite';
import { FormattedInput, InputErrors, Text } from 'uikit';
import logo from '*.svg';
import { StakeForm } from '../../forms/Stake/StakeForm.tsx';
import { AppStoreContext } from '../../../../App.tsx';
import { UnstakeForm } from '../../forms/Unstake/UnstakeForm.tsx';

export const Dashboard: FC = observer(() => {
    const rs = useContext(AppStoreContext);
    return (
        <Flex
            flexDirection="column"
            backgroundColor="bg"
            borderBottom={['1px solid #C6DAE6', 'none']}
            sx={{
                flex: 1,
                px: ['20px', '60px'],
            }}
        >
            {
                !rs.balanceStore.otherBalance.data.isLoading &&
                <>
                    <Box width="100%" height={['0', '30px']} borderLeft={['none', '1px solid #C6DAE6']} sx={{ my: ['12px', '16px'] }} />
                    <StakeForm />
                    <Box width="100%" height={['0', '30px']} borderLeft={['none', '1px solid #C6DAE6']} sx={{ my: ['12px', '16px'] }} />
                    <UnstakeForm />
                    <Box
                        width="100%"
                        height={['0', 'auto']}
                        flex={1}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                </>
            }
        </Flex>
    );
});

Dashboard.displayName = 'Dashboard';
