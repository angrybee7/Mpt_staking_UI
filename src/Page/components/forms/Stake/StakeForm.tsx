import * as React from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import {
    Button,
    FeeComponent,
    FormattedInput,
    InputErrors,
    MultiErrorComponent,
    NodeSelect,
    Text
} from 'uikit';
import { StakeStore } from './stakeStore.ts';
import { AppStoreContext } from '../../../../App.tsx';
import { Observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { Money } from '@waves/data-entities';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper.tsx';
import { BalanceComponent } from '../../../../components/BalanceComponent/BalanceComponent.tsx';
import { Trans } from '@waves/ui-translator';
import { FORM_STATE } from '../../../../stores/utils/BaseFormStore.ts';
import { USER_TYPES } from '../../../../stores/AuthStore.ts';
import { DotSpinner } from '../../../../components/DotSpinner/DotSpinner';
import { LabelComponent } from '../../../../components/LabelComponent/LabelComponent.tsx';
import { stylesByVariant } from '../../../../components/BalanceComponent/helpers.ts';
import { BlocksToTime } from '../../../../components/BlocksToTime/index.tsx';

export const devices = {
    [USER_TYPES.keeper]: 'Keeper Wallet',
    [USER_TYPES.metamask]: 'MetaMask',
    [USER_TYPES.ledger]: 'Ledger',
};

export const StakeForm: React.FC = () => {
    const rs = React.useContext(AppStoreContext);
    const { contractStore } = rs;

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
                    <SerifWrapper px={['16px', '24px']} py="24px" as='form'>
                        <Text as="div" variant="heading2" mb="16px">
                            <Trans i18key="stake" />
                        </Text>
                        <Flex flexDirection="column">
                            <Flex flexDirection={['column', 'row']} justifyContent="space-between">
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
                            <LabelComponent
                                label={{ i18key: 'remainingTime' }}
                                labelHelp={{ i18key: 'remainingTimeHelp' }}
                                variant="text1"
                                colorTitle={stylesByVariant.medium.label.color}
                                align="left"
                                my="16px"
                            >
                                <Text variant="heading2" color="main">
                                    {BlocksToTime({
                                        blocks: Math.max(contractStore.totalAssetsContractData.data.remainingBlocks, 0),
                                        options: {
                                            useYears: true,
                                            useMonth: true,
                                            useWeeks: true,
                                            showTime: true,
                                            shortFormat: true,
                                            split: ' '
                                        }
                                    })}
                                </Text>
                            </LabelComponent>
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
                                    {
                                        !contractStore.userNode ?
                                            <>
                                                <NodeSelect
                                                    nodes={
                                                        rs.contractStore.nodes.filter((node) => {
                                                            return node.address !== stakeStore.node?.address;
                                                        })
                                                    }
                                                    selectedNode={stakeStore.node}
                                                    onChangeNode={stakeStore.setNode}
                                                    mt={16}
                                                    isError={!!stakeStore.nodeSelectError?.error}
                                                />
                                                <InputErrors error={stakeStore.nodeSelectError?.error}/>
                                            </> :
                                            null
                                    }
                                    <FeeComponent my="16px" />
                                    <MultiErrorComponent activeErrors={stakeStore.activeErrors} />
                                    <Button
                                        variant="primary"
                                        variantSize="large"
                                        onClick={stakeStore.invoke}
                                        disabled={stakeStore.formState === FORM_STATE.pending}
                                        maxWidth={stakeStore.formState === FORM_STATE.pending ? 'none' : ['300px', '200px']}
                                    >
                                        <Box fontSize={[devices[rs.authStore.user.type] ? '14px' : null, 'inherit']}>
                                            <Trans
                                                i18key={stakeStore.formState === FORM_STATE.pending ?
                                                    (devices[rs.authStore.user.type] ? 'waitingConfirmation' : 'waiting') :
                                                    'stake'
                                                }
                                                i18Params={{ device: devices[rs.authStore.user.type] }}
                                            />
                                            {stakeStore.formState === FORM_STATE.pending ? <DotSpinner display="inline" /> : null}
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

StakeForm.displayName = 'StakeForm';
