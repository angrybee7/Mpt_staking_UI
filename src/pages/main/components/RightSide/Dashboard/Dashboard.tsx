import { FC, useContext } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { observer } from 'mobx-react-lite';
import { StakeForm } from '../../forms/Stake/StakeForm.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { UnstakeForm } from '../../forms/Unstake/UnstakeForm.tsx';
import { SwapModule } from '../../forms/SwapModule/SwapModule.tsx';
import { ClaimForm } from '../../forms/Claim/ClaimForm.tsx';
import { ChangeNodeForm } from '../../forms/ChangeNode/ChangeNodeForm.tsx';
import { UnstakeWarning } from './UnstakeWarning.tsx';

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
                    <UnstakeWarning />
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
                    {
                        rs.contractStore.availableForClaim?.getTokens().isPositive() ?
                            (
                                <>
                                    <ClaimForm />
                                    <Box
                                        width="100%"
                                        height={['0', '30px']}
                                        borderLeft={['none', '1px solid #C6DAE6']}
                                        sx={{ my: ['12px', '16px'] }}
                                    />
                                </>
                            ) :
                            null
                    }
                    <StakeForm />
                    <Box
                        width="100%"
                        height={['0', '30px']}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                    {
                        rs.contractStore.totalStaked?.getTokens()?.isPositive() ?
                            (
                                <>
                                    <ChangeNodeForm />
                                    <Box
                                        width="100%"
                                        height={['0', '30px']}
                                        borderLeft={['none', '1px solid #C6DAE6']}
                                        sx={{ my: ['12px', '16px'] }}
                                    />
                                </>
                            ) :
                            null
                    }
                    <UnstakeForm />
                    <Box
                        width="100%"
                        height={['0', 'auto']}
                        flex={2}
                        borderLeft={['none', '1px solid #C6DAE6']}
                        sx={{ my: ['12px', '16px'] }}
                    />
                </>
            }
        </Flex>
    );
});

Dashboard.displayName = 'Dashboard';
