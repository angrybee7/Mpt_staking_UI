import { FC, useContext } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { observer } from 'mobx-react-lite';
import { StakeForm } from '../../forms/Stake/StakeForm.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { SwapModule } from '../../forms/SwapModule/SwapModule.tsx';
import { ClaimWarning } from './ClaimWarning.tsx';
import { KPIEndsBlock } from './KPIEndsBlock.tsx';
import { ActiveStakings } from './ActiveStakings.tsx';

const blocks = 5000;
const isStarted = false;
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
                    <Box
                        width="100%"
                        height={['0', '20px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                    {isStarted ?
                        <KPIEndsBlock blocks={blocks} /> :
                        <ClaimWarning />
                    }
                    <Box
                        width="100%"
                        height={['0', '20px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                    <SwapModule hasXtn={rs.balanceStore.xtnBalance?.getTokens().gt(0)}/>
                    <Box
                        width="100%"
                        height={['0', '30px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                    <StakeForm />
                    <Box
                        width="100%"
                        height={['0', '30px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                    <ActiveStakings />
                    <Box
                        width="100%"
                        height={['0', '30px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                </>
            }
        </Flex>
    );
});

Dashboard.displayName = 'Dashboard';
