import * as React from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import {
    Button,
    FeeComponent,
    FormattedInput,
    InputErrors,
    MultiErrorComponent,
    Text
} from 'uikit';
import { AppStoreContext } from '../../../../App';
import { Observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { Money } from '@waves/data-entities';
import { UnstakeStore } from './unstakeStore.ts';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper';
import { Trans } from '@waves/ui-translator';
import { BalanceRow } from '../../../../components/BalanceComponent/BalanceRow';
import { devices } from '../Stake/StakeForm.tsx';
import { FORM_STATE } from '../../../../stores/utils/BaseFormStore.ts';
import { DotSpinner } from '../../../../components/DotSpinner/DotSpinner.tsx';

export const UnstakeForm: React.FC = () => {
    const rs = React.useContext(AppStoreContext);

    const unstakeStore = React.useMemo(() => {
        return new UnstakeStore({
            rs,
            inputMoney: new Money(0, rs.assetsStore.LPToken),
        });
    }, []);

    return (
        <Observer>
            {(): ReactElement => {
                return (
                    <SerifWrapper px={['16px', '24px']} py="24px" as='form'>
                        <Text as="div" variant="heading2" sx={{ mb: '16px' }}>
                            <Trans i18key="unstake" />
                        </Text>
                        <Flex flexDirection="column">
                            <BalanceRow
                                balance={unstakeStore.currentTokenBalance?.getTokens()?.gt(0) ?
                                    unstakeStore.currentTokenBalance?.getTokens()?.toFormat() :
                                    '0.00'
                                }
                                label={{ i18key: 'availableForUnstaking' }}
                                ticker={rs.assetsStore.LPToken?.displayName}
                                mb={unstakeStore.currentTokenBalance?.getTokens().gt(0) ? '16px' : null}
                            />
                            {unstakeStore.currentTokenBalance && unstakeStore.currentTokenBalance.getTokens().gt(0) ?
                                <>
                                    <FormattedInput
                                        value={unstakeStore.inputString}
                                        onChange={
                                            (e) => {
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
                                        onMax={unstakeStore.onClickMaxAmount}
                                        placeholder='000000000000'
                                    />
                                    <InputErrors error={unstakeStore.amountError?.error}/>
                                    <FeeComponent my="16px" />
                                    <MultiErrorComponent activeErrors={unstakeStore.activeErrors} />
                                    <Button
                                        variant="primary"
                                        variantSize="large"
                                        onClick={unstakeStore.invoke}
                                        disabled={unstakeStore.formState === FORM_STATE.pending}
                                        maxWidth={unstakeStore.formState === FORM_STATE.pending ? 'none' : ['300px', '200px']}
                                    >
                                        <Box fontSize={[devices[rs.authStore.user.type] ? '14px' : null, 'inherit']}>
                                            <Trans
                                                i18key={unstakeStore.formState === FORM_STATE.pending ?
                                                    devices[rs.authStore.user.type] ? 'waitingConfirmation' : 'waiting' :
                                                    'unstake'
                                                }
                                                i18Params={{ device: devices[rs.authStore.user.type] }}
                                            />
                                            {unstakeStore.formState === FORM_STATE.pending ? <DotSpinner display="inline" /> : null}
                                        </Box>
                                    </Button>
                                </> :
                                null
                            }
                        </Flex>
                    </SerifWrapper>
                );
            }}
        </Observer>
    );
};

UnstakeForm.displayName = 'UnstakeForm';
