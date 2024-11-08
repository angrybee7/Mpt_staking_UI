/* eslint-disable max-len */
import { FC, useContext } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { observer } from 'mobx-react-lite';
import { StakeForm } from '../../forms/Stake/StakeForm.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { UnitsReward } from './UnitsReward';
import { ActiveStakings } from './ActiveStakings.tsx';
import { SwapModule } from '../../forms/SwapModule/SwapModule.tsx';
import { UnitsRetroDrop } from './UnitsRetroDrop.tsx';

export const Dashboard: FC = observer(() => {
    const { balanceStore, contractStore } = useContext(AppStoreContext);

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
                !balanceStore.otherBalance.data.isLoading &&
                <>
                    <Box
                        width="100%"
                        height={['0', '30px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                    <UnitsReward
                        blocks={contractStore.userContractData?.data?.unitsClaimRemaining}
                        forClaim={contractStore.userContractData?.data?.unitsAvailableToClaim}
                        claimed={contractStore.userContractData?.data?.totalUnitsClaimed}
                    />
                    <Box
                        width="100%"
                        height={['0', '30px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                    <UnitsRetroDrop
                        blocks={contractStore.userContractData?.data?.vesting?.remainBlocks}
                        forClaim={contractStore.userContractData?.data?.vesting?.availableToClaim}
                        claimed={contractStore.userContractData?.data?.vesting?.claimed}
                    />
                    <Box
                        width="100%"
                        height={['0', '30px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                    <SwapModule hasXtn={balanceStore.xtnBalance?.getTokens().gt(0)}/>
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
