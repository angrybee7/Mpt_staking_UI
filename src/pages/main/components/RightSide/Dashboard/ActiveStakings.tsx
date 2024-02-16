import * as React from 'react';
import { Button, Text, Tooltip } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { AddressAvatar, Box, Flex } from '@waves.exchange/wx-react-uikit';
import { BalanceRow } from '../../../../../components/BalanceComponent/BalanceRow.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { shortAddress } from '../../../../../utils';
import { observer } from 'mobx-react-lite';

export const ActiveStakings: React.FC = observer(() => {
    const { contractStore, assetsStore } = React.useContext(AppStoreContext);

    const {
        currentLeased,
        nextLeased
    } = React.useMemo(() => {
        return ({
            currentLeased: contractStore.totalLeased?.current?.getTokens(),
            nextLeased: contractStore.totalLeased?.next?.getTokens(),
        });
    }, [contractStore.totalLeased]);

    return (
        <SerifWrapper>
            {currentLeased?.gt(0) || nextLeased?.gt(0) ? (
                <Box
                    sx={{
                        py: '24px',
                        px:['16px', '24px']
                    }}
                >
                    <Text
                        as="div"
                        variant="heading2"
                        mb="16px"
                    >
                        <Trans i18key="activeStakings" />
                    </Text>
                    <BalanceRow
                        balance={currentLeased?.eq(nextLeased) ?
                            currentLeased?.toFormat() :
                            `${currentLeased?.toFormat()} / ${nextLeased?.toFormat()}`
                        }
                        label={{ i18key: 'totalStaked' }}
                        helpTrans={{ i18key: 'activeStakingsTooltip' }}
                        ticker={assetsStore.LPToken.displayName}
                        mb="24px"
                    />
                    {(Object.values(contractStore.userContractData.data?.nodes) || []).map(({
                        currentLeasingAmount,
                        nextLeasingAmount,
                        nodeAddress,
                    }) => {
                        const isEq = currentLeasingAmount.getTokens().eq(nextLeasingAmount.getTokens());
                        return (
                            <SerifWrapper
                                key={nodeAddress}
                                mb="16px"
                                backgroundColor="#ffffff"
                            >
                                <Box
                                    sx={{
                                        py: ['16px', '24px'],
                                        px:['16px', '24px']
                                    }}
                                >
                                    <BalanceRow
                                        balance={isEq ?
                                            currentLeasingAmount.getTokens().toFormat() :
                                            `${currentLeasingAmount.getTokens().toFormat()} / ${nextLeasingAmount.getTokens().toFormat()}`
                                        }
                                        ticker={assetsStore.LPToken.displayName}
                                        mb="12px"
                                    />
                                    <Flex alignItems="center" mb="16px">
                                        <AddressAvatar
                                            address={nodeAddress}
                                            variantSize="small"
                                            tooltipLabels={{ scriptText: '', keepertText: '', ledgerText: '' }}
                                            display="block"
                                            width={24}
                                            height={24}
                                            mr={8}
                                        />
                                        <Text
                                            variant="text1"
                                            color="textsec"
                                            fontFamily="Sfmono"
                                        >
                                            <Text display={['none', 'block']}>
                                                {nodeAddress}
                                            </Text>
                                            <Text display={['block', 'none']}>
                                                {shortAddress(nodeAddress)}
                                            </Text>
                                        </Text>
                                    </Flex>
                                    <Button
                                        variant="transparent"
                                        variantSize="large"
                                        width="100%"
                                        disabled={nextLeasingAmount.getTokens().isZero()}
                                        boxShadow="0px 8px 20px 0px #3C63AF2B"
                                        wrapperProps={{ variant: 'default' }}
                                    >
                                        <Trans i18key="unstake" />
                                    </Button>
                                    {/*{unstaked.gt(0) ?*/}
                                    {/*    <SerifWrapper mt="16px">*/}
                                    {/*        <Box sx={{ px:['16px', '24px'] }}>*/}
                                    {/*            <Text*/}
                                    {/*                as="div"*/}
                                    {/*                variant="heading4"*/}
                                    {/*                fontFamily="Sfmono-light"*/}
                                    {/*                color="text"*/}
                                    {/*                sx={{ mb: '8px' }}*/}
                                    {/*            >*/}
                                    {/*                <Trans i18key="unstaked" />*/}
                                    {/*            </Text>*/}
                                    {/*            <BalanceRow*/}
                                    {/*                balance={unstaked.toFormat()}*/}
                                    {/*                ticker={assetsStore.LPToken.displayName}*/}
                                    {/*                mb="24px"*/}
                                    {/*            />*/}
                                    {/*            <Tooltip*/}
                                    {/*                variant="info"*/}
                                    {/*                alignSelf="center"*/}
                                    {/*                width="100%"*/}
                                    {/*                placement="top"*/}
                                    {/*                label={(): React.ReactNode => {*/}
                                    {/*                    return <Trans i18key="claimTooltip" />;*/}
                                    {/*                }}*/}
                                    {/*                isOpen={isPrevEpoch}*/}
                                    {/*                sx={{*/}
                                    {/*                    ' div': {*/}
                                    {/*                        maxWidth: 'none'*/}
                                    {/*                    }*/}
                                    {/*                }}*/}
                                    {/*            >*/}
                                    {/*                <Button*/}
                                    {/*                    variant="transparent"*/}
                                    {/*                    variantSize="large"*/}
                                    {/*                    width="100%"*/}
                                    {/*                    disabled={isPrevEpoch}*/}
                                    {/*                    boxShadow="0px 8px 20px 0px #3C63AF2B"*/}
                                    {/*                    wrapperProps={{ variant: 'default' }}*/}
                                    {/*                >*/}
                                    {/*                    <Trans i18key="claim" />*/}
                                    {/*                </Button>*/}
                                    {/*            </Tooltip>*/}
                                    {/*        </Box>*/}
                                    {/*    </SerifWrapper> :*/}
                                    {/*    null*/}
                                    {/*}*/}
                                </Box>
                            </SerifWrapper>
                        )
                    })}
                </Box>
            ) : (
                <Box sx={{ py: '24px', px:['16px', '24px'] }}>
                    <Text as="div" variant="heading2" mb="16px">
                        <Trans i18key="activeStakings" />
                    </Text>
                    <BalanceRow
                        balance={'0.00'}
                        label={{ i18key: 'totalStaked' }}
                        helpTrans={{ i18key: 'activeStakingsTooltip' }}
                        ticker={assetsStore.LPToken.displayName}
                    />
                </Box>
            )}
        </SerifWrapper>
    );
});

ActiveStakings.displayName = 'ActiveStakings';
