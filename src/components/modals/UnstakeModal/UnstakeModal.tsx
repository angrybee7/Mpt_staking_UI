import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { ModalStyled } from '../../Modal/ModalStyled';
import { Trans, translate } from '@waves/ui-translator';
import {
    Button,
    FeeComponent,
    FormattedInput,
    InputErrors,
    MultiErrorComponent,
    Text
} from 'uikit';
import { BalanceRow } from '../../BalanceComponent/BalanceRow';
import { Box } from '@waves.exchange/wx-react-uikit';
import { AppStoreContext } from '../../../App.tsx';
import { UnstakeStore } from './UnstakeStore.ts';
import { Money } from '@waves/data-entities';
import { Observer } from 'mobx-react-lite';
import { FORM_STATE } from '../../../stores/utils/BaseFormStore.ts';
import { devices } from '../../../pages/main/components/forms/Stake/StakeForm.tsx';
import { DotSpinner } from '../../DotSpinner/DotSpinner.tsx';
import { modalManager } from '../../../services/modalManager.ts';

const UnstakeModalFC: React.FC<ModalProps & { address: string }> = ({
    address,
    ...rest
}) => {
    const rs = React.useContext(AppStoreContext);

    const unstakeStore = React.useMemo(() => {
        return new UnstakeStore({
            rs,
            inputMoney: new Money(0, rs.assetsStore.LPToken),
            nodeAddress: address
        });
    }, []);

    const send = React.useCallback((): void => {
        unstakeStore.invoke()
            .then(() => {
                modalManager.closeModal(rest.modalName, 'close')
            })
    }, []);

    return (
        <Observer>
            {(): React.ReactElement => {
                return (
                    <ModalStyled
                        modalName={MODAL_NAMES.unstake}
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
                                <Trans i18key="unstake" />
                            </Text>
                            <BalanceRow
                                balance={unstakeStore.currentTokenBalance?.getTokens().toFormat()}
                                label={{ i18key: 'availableForUnstaking' }}
                                ticker={rs.assetsStore.LPToken.displayName}
                                mb="24px"
                            />
                            <FormattedInput
                                value={unstakeStore.inputString}
                                onChange={(e): void => {
                                    unstakeStore.onInputChange(
                                        e.target.value
                                    );
                                }
                                }
                                iconUrl={rs.assetsStore.LPToken.icon}
                                formatSeparator=","
                                decimals={rs.assetsStore.LPToken.precision}
                                tag={rs.assetsStore.LPToken.displayName}
                                aria-invalid={!!unstakeStore.amountError?.error}
                                onPresetClick={unstakeStore.onClickPresent}
                                placeholder="000000000000"
                            />
                            <InputErrors error={unstakeStore.amountError?.error} />
                            <FeeComponent my="24px" />
                            <MultiErrorComponent activeErrors={unstakeStore.activeErrors} />
                            <Button
                                variant="primary"
                                variantSize="large"
                                width="100%"
                                boxShadow="0px 8px 20px 0px #3C63AF2B"
                                onClick={send}
                                disabled={unstakeStore.formState === FORM_STATE.pending}
                                wrapperProps={{ variant: 'default' }}
                            >
                                <Box
                                    fontSize={[devices[rs.authStore.user.type] ? '14px' : null, 'inherit']}
                                >
                                    <Trans
                                        i18key={unstakeStore.formState === FORM_STATE.pending ?
                                            devices[rs.authStore.user.type] ? 'waitingConfirmation' : 'waiting' :
                                            'unstake'
                                        }
                                        i18Params={{ device: devices[rs.authStore.user.type] }}
                                    />
                                    {unstakeStore.formState === FORM_STATE.pending ?
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

UnstakeModalFC.displayName = 'UnstakeModal';

export const UnstakeModal = translate('app.page')(UnstakeModalFC);
