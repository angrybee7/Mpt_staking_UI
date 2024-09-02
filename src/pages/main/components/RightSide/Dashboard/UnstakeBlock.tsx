import * as React from 'react';
import { Button, Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { AddressAvatar, Box, Flex } from '@waves.exchange/wx-react-uikit';
import { BalanceRow } from '../../../../../components/BalanceComponent/BalanceRow.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { shortAddress } from '../../../../../utils';
import { observer } from 'mobx-react-lite';
import { modalManager } from '../../../../../services/modalManager.ts';
import { MODAL_NAMES } from '../../../../../components/ModalContainer/MODAL_NAMES.ts';


// TODO: позже если так и не вернется unstake, можно будет удалить компонент
export const UnstakeBlock: React.FC = observer(() => {
    const {
        contractStore,
        assetsStore,
    } = React.useContext(AppStoreContext);

    const onClickUnstake = React.useCallback((address: string) => {
        modalManager.openModal(
            MODAL_NAMES.unstake,
            { address }
        );
    }, []);

    return contractStore.rewrittenUserNodes.map(({ currentLeasingAmount, nextLeasingAmount, nodeAddress }) => {
        const isEq = currentLeasingAmount.getTokens().eq(nextLeasingAmount.getTokens());
        return (
            <SerifWrapper
                key={nodeAddress}
                mb="24px"
                backgroundColor="#ffffff"
            >
                <Box
                    sx={{
                        py: ['20px', '24px'],
                        px:['20px', '24px']
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
                    <Flex alignItems="center" mb="12px">
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
                        onClick={() => onClickUnstake(nodeAddress)}
                    >
                        <Trans i18key="unstake" />
                    </Button>
                </Box>
            </SerifWrapper>
        );
    });
});

UnstakeBlock.displayName = 'UnstakeBlock';
