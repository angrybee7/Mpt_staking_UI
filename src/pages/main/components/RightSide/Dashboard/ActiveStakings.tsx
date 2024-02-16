import * as React from 'react';
import { Button, Text, Tooltip } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { AddressAvatar, Box, Flex } from '@waves.exchange/wx-react-uikit';
import { BalanceRow } from '../../../../../components/BalanceComponent/BalanceRow.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import BigNumber from '@waves/bignumber';
import { shortAddress } from '../../../../../utils/index.ts';
import { modalManager } from '../../../../../services/modalManager.ts';
import { MODAL_NAMES } from '../../../../../components/ModalContainer/MODAL_NAMES.ts';
import { Money } from '@waves/data-entities';
 
export const ActiveStakings: React.FC = () => {
    const rs = React.useContext(AppStoreContext);
    const stakings = [
        { staked: new BigNumber(5), node: { address: 'SDCFVSFCWDcsdcSVSRAdcsdC' }, unstaked: new BigNumber(2), isPrevEpoch: false },
        { staked: new BigNumber(4), node: { address: 'SDCFVSFCWDcsdsSVSRAdcsdC' }, unstaked: new BigNumber(0) },
        { staked: new BigNumber(0), node: { address: 'SDCFVSFCWDcsdcSdSRAdcsdC' }, unstaked: new BigNumber(5), isPrevEpoch: true },
    ];
    const staked = new BigNumber(9);
    
    const onClickUnstake = React.useCallback((address: string) => {
        modalManager.openModal(
            MODAL_NAMES.unstake,
            {
                store: {
                    nodes: {
                        SDCFVSFCWDcsdcSVSRAdcsdC: { availableForUnstaking: new Money(500000000, rs.assetsStore.LPToken) },
                        SDCFVSFCWDcsdsSVSRAdcsdC: { availableForUnstaking: new Money(400000000, rs.assetsStore.LPToken) },
                        SDCFVSFCWDcsdcSdSRAdcsdC: { availableForUnstaking: new Money(0, rs.assetsStore.LPToken) },
                    }
                },
                address
            }
        );
    }, []);

    const onClickClaim = React.useCallback((address: string) => {
        modalManager.openModal(
            MODAL_NAMES.claim,
            {
                store: {
                    nodes: {
                        SDCFVSFCWDcsdcSVSRAdcsdC: { availableForClaiming: new Money(200000000, rs.assetsStore.LPToken) },
                        SDCFVSFCWDcsdsSVSRAdcsdC: { availableForClaiming: new Money(0, rs.assetsStore.LPToken) },
                        SDCFVSFCWDcsdcSdSRAdcsdC: { availableForClaiming: new Money(500000000, rs.assetsStore.LPToken) },
                    }
                },
                address
            }
        );
    }, []);

    return (
        <SerifWrapper>
            {staked.gt(0) ? (
                <Box sx={{ py: '24px', px:['16px', '24px'] }}>
                    <Text as="div" variant="heading2" mb="16px">
                        <Trans i18key="activeStakings" />
                    </Text>
                    <BalanceRow
                        balance={staked.toFormat()}
                        label={{ i18key: 'totalStaked' }}
                        helpTrans={{ i18key: 'activeStakingsTooltip' }}
                        ticker={rs.assetsStore.LPToken.displayName}
                        mb="24px"
                    />
                    {stakings.map(({ staked, node, unstaked, isPrevEpoch }) => (
                        <SerifWrapper key={node.address} mb="16px" backgroundColor="#ffffff">
                            <Box sx={{ py: ['16px', '24px'], px:['16px', '24px'] }}>
                                <BalanceRow balance={staked.toFormat()} ticker={rs.assetsStore.LPToken.displayName} mb="12px" />
                                <Flex alignItems="center" mb="16px">
                                    <AddressAvatar
                                        address={node.address}
                                        variantSize="small"
                                        tooltipLabels={{ scriptText: '', keepertText: '', ledgerText: '' }}
                                        display="block"
                                        width={24}
                                        height={24}
                                        mr={8}
                                    />
                                    <Text variant="text1" color="textsec" fontFamily="Sfmono">
                                        <Text display={['none', 'block']}>{node.address}</Text>
                                        <Text display={['block', 'none']}>{shortAddress(node.address)}</Text>
                                    </Text>
                                </Flex>
                                <Button
                                    variant="transparent"
                                    variantSize="large"
                                    width="100%"
                                    disabled={staked.isZero()}
                                    boxShadow="0px 8px 20px 0px #3C63AF2B"
                                    onClick={() => onClickUnstake(node.address)}
                                    wrapperProps={{ variant: 'default' }}
                                >
                                    <Trans i18key="unstake" />
                                </Button>
                                {unstaked.gt(0) ?
                                    <SerifWrapper mt="16px">
                                        <Box sx={{ px:['16px', '24px'] }}>
                                            <Text as="div" variant="heading4" fontFamily="Sfmono-light" color="text" sx={{ mb: '8px' }}>
                                                <Trans i18key="unstaked" />
                                            </Text>
                                            <BalanceRow
                                                balance={unstaked.toFormat()}
                                                ticker={rs.assetsStore.LPToken.displayName}
                                                mb="24px"
                                            />
                                            <Tooltip
                                                variant="info"
                                                alignSelf="center"
                                                width="100%"
                                                placement="top"
                                                label={(): React.ReactNode => {
                                                    return <Trans i18key="claimTooltip" />;
                                                }}
                                                isOpen={isPrevEpoch}
                                                sx={{
                                                    ' div': {
                                                        maxWidth: 'none'
                                                    }
                                                }}
                                            >
                                                <Button
                                                    variant="transparent"
                                                    variantSize="large"
                                                    width="100%"
                                                    disabled={isPrevEpoch}
                                                    boxShadow="0px 8px 20px 0px #3C63AF2B"
                                                    onClick={() => onClickClaim(node.address)}
                                                    wrapperProps={{ variant: 'default' }}
                                                >
                                                    <Trans i18key="claim" />
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                    </SerifWrapper> :
                                    null
                                }
                            </Box>
                        </SerifWrapper>
                    ))}
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
                        ticker={rs.assetsStore.LPToken.displayName}
                    />
                </Box>
            )}
        </SerifWrapper>
    );
};

ActiveStakings.displayName = 'ActiveStakings';
