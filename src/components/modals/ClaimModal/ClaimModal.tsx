import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { ModalStyled } from '../../Modal/ModalStyled';
import { Trans, translate } from '@waves/ui-translator';
import { Button, FeeComponent, MultiErrorComponent, Text } from 'uikit';
import { BalanceRow } from '../../BalanceComponent/BalanceRow';
import { Box } from '@waves.exchange/wx-react-uikit';
import { ClaimStore } from './ClaimStore.ts';
import { AppStoreContext } from '../../../App.tsx';
import { Observer } from 'mobx-react-lite';
import { devices } from '../../../pages/main/components/forms/Stake/StakeForm.tsx';
import { FORM_STATE } from '../../../stores/utils/BaseFormStore.ts';
import { DotSpinner } from '../../DotSpinner/DotSpinner.tsx';
import { modalManager } from '../../../services/modalManager.ts';

const ClaimModalFC: React.FC<ModalProps> = ({ ...rest }) => {
    const rs = React.useContext(AppStoreContext);

    const claimStore = React.useMemo(() => {
        return new ClaimStore(rs);
    }, []);

    const send = React.useCallback((): void => {
        claimStore.invoke()
            .then(() => {
                modalManager.closeModal(rest.modalName, 'close')
            })
    }, []);

    return (
        <Observer>
            {(): React.ReactElement => {
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
                                balance={claimStore.availableForClaim?.getTokens().toFormat()}
                                label={{ i18key: 'availableForClaim' }}
                                ticker={rs.assetsStore.LPToken.displayName}
                                mb="24px"
                            />
                            <FeeComponent mb="24px" />
                            <MultiErrorComponent activeErrors={claimStore.activeErrors} />
                            <Button
                                variant="primary"
                                variantSize="large"
                                width="100%"
                                boxShadow="0px 8px 20px 0px #3C63AF2B"
                                onClick={send}
                                disabled={claimStore.isButtonDisabled}
                                wrapperProps={{ variant: 'default' }}
                            >
                                <Box
                                    fontSize={[devices[rs.authStore.user.type] ? '14px' : null, 'inherit']}
                                >
                                    <Trans
                                        i18key={claimStore.formState === FORM_STATE.pending ?
                                            devices[rs.authStore.user.type] ? 'waitingConfirmation' : 'waiting' :
                                            'claim'
                                        }
                                        i18Params={{ device: devices[rs.authStore.user.type] }}
                                    />
                                    {claimStore.formState === FORM_STATE.pending ?
                                        <DotSpinner display="inline" /> :
                                        null
                                    }
                                </Box>
                            </Button>
                        </Box>
                    </ModalStyled>
                )
            }}
        </Observer>
    );
};

ClaimModalFC.displayName = 'ClaimModal';

export const ClaimModal = translate('app.page')(ClaimModalFC);
