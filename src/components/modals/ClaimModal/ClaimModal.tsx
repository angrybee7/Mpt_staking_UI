import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { ModalStyled } from '../../Modal/ModalStyled';
import { Trans, translate } from '@waves/ui-translator';
import { Button, FeeComponent, Text } from 'uikit';
import { BalanceRow } from '../../BalanceComponent/BalanceRow';
import { Box } from '@waves.exchange/wx-react-uikit';

const ClaimModalFC: React.FC<ModalProps & { store: any; address: string }> = ({ store, address, ...rest }) => {
    return (
        <ModalStyled
            modalName={MODAL_NAMES.claim}
            stateVariant="default"
            width={['100%', '720px']}
            color="standard.$0"
            {...rest}
        >
            <Box pb="12px">
                <Text
                    as="div"
                    variant="heading3"
                    color="text"
                    pt="12px"
                    pb="24px"
                >
                    <Trans i18key="claim" />
                </Text>
                <BalanceRow
                    balance={store.nodes[address].availableForClaiming.getTokens().toFormat()}
                    label={{ i18key: 'availableForClaim' }}
                    ticker={store.nodes[address].availableForClaiming.asset.displayName}
                    mb="24px"
                />
                <FeeComponent mb="24px" />
                <Button
                    variant="primary"
                    variantSize="large"
                    width="100%"
                    boxShadow="0px 8px 20px 0px #3C63AF2B"
                    onClick={() => null}
                    wrapperProps={{ variant: 'default' }}
                >
                    <Trans i18key="claim" />
                </Button>
            </Box>
        </ModalStyled>
    );
};

ClaimModalFC.displayName = 'ClaimModal';

export const ClaimModal = translate('app.page')(ClaimModalFC);
