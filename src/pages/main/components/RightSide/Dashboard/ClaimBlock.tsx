import * as React from 'react';
import { Button, Text, Tooltip } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { Box } from '@waves.exchange/wx-react-uikit';
import { BalanceRow } from '../../../../../components/BalanceComponent/BalanceRow.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { observer } from 'mobx-react-lite';
import { modalManager } from '../../../../../services/modalManager.ts';
import { MODAL_NAMES } from '../../../../../components/ModalContainer/MODAL_NAMES.ts';

// TODO: позже если так и не вернется claim, можно будет удалить компонент
export const ClaimBlock: React.FC = observer(() => {
    const {
        contractStore,
        assetsStore,
    } = React.useContext(AppStoreContext);

    const {
        currentToClaim,
        nextToClaim
    } = React.useMemo(() => {
        return ({
            currentToClaim: contractStore.userContractData.data?.currentPeriodAvailableToClaim?.getTokens(),
            nextToClaim: contractStore.userContractData.data?.nextPeriodAvailableToClaim?.getTokens(),
        });
    }, [contractStore.userContractData.data]);

    const onClickClaim = React.useCallback(() => {
        modalManager.openModal(MODAL_NAMES.claim);
    }, []);

    if (!currentToClaim?.gt(0) && !nextToClaim?.gt(0)) {
        return null;
    }

    return (
        <SerifWrapper
            mt="40px"
            backgroundColor="#ffffff"
        >
            <Box
                sx={{
                    px: ['16px', '24px'],
                    py: ['16px', '20px'],
                }}
            >
                <Text
                    as="div"
                    variant="heading4"
                    fontFamily="Sfmono-light"
                    color="text"
                    sx={{ mb: '8px' }}
                >
                    <Trans i18key="unstaked" />
                </Text>
                <BalanceRow
                    // balance={currentToClaim?.eq(nextToClaim) ?
                    // 	currentToClaim?.toFormat() :
                    // 	`${currentToClaim?.toFormat()} / ${nextToClaim?.toFormat()}`
                    // }
                    balance={`${currentToClaim?.toFormat()} / ${nextToClaim?.toFormat()}`}
                    ticker={assetsStore.LPToken.displayName}
                    mb="12px"
                />
                <Tooltip
                    variant="info"
                    alignSelf="center"
                    width="100%"
                    placement="top"
                    label={(): React.ReactNode => {
                        return <Trans i18key="claimTooltip" />;
                    }}
                    isOpen={
                        currentToClaim?.eq(0) && nextToClaim?.gt(0) ?
                            undefined :
                            false
                    }
                    sx={{
                        ' div': {
                            maxWidth: 'none'
                        }
                    }}
                >
                    <Box>
                        <Button
                            variant="transparent"
                            variantSize="large"
                            width="100%"
                            disabled={currentToClaim?.eq(0)}
                            boxShadow="0px 8px 20px 0px #3C63AF2B"
                            wrapperProps={{ variant: 'default' }}
                            onClick={onClickClaim}
                        >
                            <Trans i18key="claim" />
                        </Button>
                    </Box>
                </Tooltip>
            </Box>
        </SerifWrapper>
    );
});

ClaimBlock.displayName = 'ClaimBlock';
