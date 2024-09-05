import * as React from 'react';
import { NodeOption, Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { AddressAvatar, Box, Flex } from '@waves.exchange/wx-react-uikit';
import { BalanceRow } from '../../../../../components/BalanceComponent/BalanceRow.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { observer } from 'mobx-react-lite';
import { LabelComponent } from '../../../../../components/LabelComponent/LabelComponent.tsx';
import { useMediaQuery } from '../../../../../hooks/useMediaQuery.ts';
import { shortAddress } from '../../../../../utils/index.ts';

export const ActiveStakings: React.FC = observer(() => {
    const {
        contractStore,
        assetsStore,
    } = React.useContext(AppStoreContext);
    const isMobile = useMediaQuery('screen and (max-width: 650px)');

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
            <Box
                sx={{
                    py: '16px',
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
                    // balance={currentLeased?.eq(nextLeased) ?
                    //     currentLeased?.toFormat() :
                    //     `${currentLeased?.toFormat()} / ${nextLeased?.toFormat()}`
                    // }
                    balance={`${currentLeased?.toFormat()} / ${nextLeased?.toFormat()}`}
                    label={{ i18key: 'totalStaked' }}
                    helpTrans={{ i18key: 'totalStakedTooltip' }}
                    ticker={assetsStore.LPToken.displayName}
                    mb="24px"
                />
                {contractStore.rewrittenUserNodes.length ?
                    <SerifWrapper backgroundColor="#ffffff">
                        <Box
                            sx={{
                                py: '16px',
                                px: '16px'
                            }}
                        >
                            {contractStore.rewrittenUserNodes.map((node) => (
                                <Flex
                                    key={node.nodeAddress}
                                    flexDirection="column"
                                    mb="16px"
                                    sx={{
                                        '&:last-of-type': {
                                            mb: '0'
                                        }
                                    }}
                                >
                                    <LabelComponent
                                        label={{ i18key: contractStore.nodesByAddress[node.nodeAddress]?.name || 'Unknown' }}
                                        variant="text1"
                                        align="left"
                                        mb="4px"
                                    />
                                    <Flex>
                                        <Flex
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            mr="24px"
                                        >
                                            <AddressAvatar
                                                address={node.nodeAddress}
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
                                                {isMobile ? shortAddress(node?.nodeAddress || '') : node?.nodeAddress || ''}
                                            </Text>
                                        </Flex>
                                        <BalanceRow
                                            // eslint-disable-next-line max-len
                                            balance={`${node.currentLeasingAmount.getTokens()?.toFormat()} / ${node.nextLeasingAmount.getTokens()?.toFormat()}`}
                                            ticker={assetsStore.LPToken.displayName}
                                            sx={{
                                                whiteSpace: 'nowrap'
                                            }}
                                        />
                                    </Flex>
                                </Flex>
                            ))}
                        </Box>
                    </SerifWrapper> :
                    null
                }
            </Box>
        </SerifWrapper>
    );
});

ActiveStakings.displayName = 'ActiveStakings';
