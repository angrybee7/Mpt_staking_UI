import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { Button, FeeComponent, FormattedInput, InputErrors, MultiErrorComponent } from '../../../../uikit';
import { AppStoreContext } from '../../../../App';
import { Observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { Money } from '@waves/data-entities';
import { UnstakeStore } from './unstakeStore.ts';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper';
import { Trans } from '@waves/ui-translator';
import { BalanceRow } from '../../../../components/BalanceComponent/BalanceRow';
import { Text } from '../../../../uikit/Text/Text';

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
                    <SerifWrapper px="24px" py="24px" as='form'>
                        <Text as="div" variant="heading2" sx={{ mb: '16px' }}>
                            <Trans i18key="unstake" />
                        </Text>
                        <Flex flexDirection="column">
                            <BalanceRow
                                balance={unstakeStore.currentTokenBalance?.getTokens()?.toFormat()}
                                label={{ i18key: 'availableForUnstaking' }}
                                ticker={unstakeStore.currentTokenBalance?.asset?.displayName}
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
                                        maxWidth={['300px', '166px']}
                                    >
                                        <Trans i18key="unstake" />
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
