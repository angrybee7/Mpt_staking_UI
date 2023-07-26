import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { Button, FeeComponent, FormattedInput, InputErrors, MultiErrorComponent } from '../../../../uikit';
import { StakeStore } from './stakeStore.ts';
import { AppStoreContext } from '../../../../App.tsx';
import { Observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { Money } from '@waves/data-entities';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper.tsx';
import { Text } from '../../../../uikit/Text/Text';
import { BalanceComponent } from '../../../../components/BalanceComponent/BalanceComponent.tsx';
import { Trans } from '@waves/ui-translator';
import { FORM_STATE } from '../../../../stores/utils/BaseFormStore.ts';
import { USER_TYPES } from '../../../../stores/AuthStore.ts';
import { DotsAnimation } from '../../../../components/DotSpinner/DotSpinner.tsx';

export const devices = {
    [USER_TYPES.keeper]: 'Keeper Wallet',
    [USER_TYPES.metamask]: 'MetaMask'
};

export const StakeForm: React.FC = () => {
    const rs = React.useContext(AppStoreContext);

    const stakeStore = React.useMemo(() => {
        return new StakeStore({
            rs,
            inputMoney: new Money(0, rs.assetsStore.LPToken),
        });
    }, []);

    return (
        <Observer>
            {(): ReactElement => {
                const balance = rs.balanceStore.balances[rs.assetsStore.LPToken.id]?.balance;
                return (
                    <SerifWrapper px="24px" py="24px" as='form'>
                        <Text as="div" variant="heading2" mb="16px">
                            <Trans i18key="stake" />
                        </Text>
                        <Flex flexDirection="column">
                            <Flex
                                flexDirection={['column', 'row']}
                                justifyContent="space-between"
                                mb={balance?.getTokens().gt(0) ? '16px' : null}
                            >
                                <BalanceComponent
                                    balance={balance?.getTokens().gt(0) ? balance?.getTokens()?.toFormat() : '0.00'}
                                    label={{ i18key: 'availableForStaking' }}
                                    ticker={rs.assetsStore.LPToken.displayName}
                                    align="left"
                                    mr={[null, '16px']}
                                    mb={['16px', '0']}
                                />
                                <BalanceComponent
                                    balance={rs.contractStore.annual}
                                    label={{ i18key: 'estimatedAnnualInterest' }}
                                    labelHelp={{ i18key: 'estimatedAnnualInterestHelp' }}
                                    ticker="%"
                                    align="left"
                                />
                            </Flex>
                            {balance && balance?.getTokens().gt(0) ?
                                <>
                                    <FormattedInput
                                        value={stakeStore.inputString}
                                        onChange={
                                            (e) => {
                                                stakeStore.onInputChange(
                                                    e.target.value
                                                );
                                            }
                                        }
                                        iconUrl={rs.assetsStore.LPToken.icon}
                                        formatSeparator=","
                                        decimals={rs.assetsStore.LPToken.precision}
                                        tag={rs.assetsStore.LPToken.displayName}
                                        aria-invalid={!!stakeStore.amountError?.error}
                                        onMax={stakeStore.onClickMaxAmount}
                                        placeholder='000000000000'
                                    />
                                    <InputErrors error={stakeStore.amountError?.error}/>
                                    <FeeComponent my="16px" />
                                    <MultiErrorComponent activeErrors={stakeStore.activeErrors} />
                                    <Button
                                        variant="primary"
                                        variantSize="large"
                                        onClick={stakeStore.invoke}
                                        disabled={stakeStore.formState === FORM_STATE.pending}
                                        maxWidth={stakeStore.formState === FORM_STATE.pending ? 'none' : ['300px', '166px']}
                                    >
                                        <Flex justifyContent="center">
                                            <Trans
                                                i18key={stakeStore.formState === FORM_STATE.pending ?
                                                    devices[rs.authStore.user.type] ? 'waitingConfirmation' : 'waiting' :
                                                    'stake'
                                                }
                                                i18Params={{ device: devices[rs.authStore.user.type] }}
                                            />
                                            {stakeStore.formState === FORM_STATE.pending ? <DotsAnimation /> : null}
                                        </Flex>
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

StakeForm.displayName = 'StakeForm';
