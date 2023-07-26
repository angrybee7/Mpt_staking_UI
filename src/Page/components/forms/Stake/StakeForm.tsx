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
                return (
                    <SerifWrapper px="24px" py="24px" as='form'>
                        <Text as="div" variant="heading2" mb="16px">
                            <Trans i18key="stake" />
                        </Text>
                        <Flex flexDirection="column">
                            <Flex
                                flexDirection={['column', 'row']}
                                justifyContent="space-between"
                                mb={rs.balanceStore.balances[rs.assetsStore.LPToken.id]?.balance?.getTokens().gt(0) ? '16px' : null}
                            >
                                <BalanceComponent
                                    balance={rs.balanceStore.balances[rs.assetsStore.LPToken.id]?.balance?.getTokens().toFormat()}
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
                            {rs.balanceStore.balances[rs.assetsStore.LPToken.id]?.balance &&
                                rs.balanceStore.balances[rs.assetsStore.LPToken.id]?.balance?.getTokens().gt(0) ?
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
                                        maxWidth={['300px', '166px']}
                                    >
                                        <Trans i18key="stake" />
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
