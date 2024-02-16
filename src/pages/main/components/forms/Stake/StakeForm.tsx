import * as React from 'react';
import { Box, ExternalLink, Flex } from '@waves.exchange/wx-react-uikit';
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
import { AppStoreContext } from '../../../../../App.tsx';
import { Observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { Money } from '@waves/data-entities';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { BalanceComponent } from '../../../../../components/BalanceComponent/BalanceComponent.tsx';
import { Trans } from '@waves/ui-translator';
import { FORM_STATE } from '../../../../../stores/utils/BaseFormStore.ts';
import { USER_TYPES } from '../../../../../stores/AuthStore.ts';
import { DotSpinner } from '../../../../../components/DotSpinner/DotSpinner.tsx';
import { ResponsibilitiesBlock } from '../../../../../components/ResponsibilitiesBlock/ResponsibilitiesBlock.tsx';

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
                            <Flex flexDirection={['column', 'row']} justifyContent="space-between" flexWrap="wrap">
                                <BalanceComponent
                                    balance={balance?.getTokens().gt(0) ? balance?.getTokens()?.toFormat() : '0.00'}
                                    label={{ i18key: 'availableForStaking' }}
                                    labelHelp={{ i18key: 'availableForStakingHelp' }}
                                    ticker={rs.assetsStore.LPToken.displayName}
                                    align="left"
                                    flex={1}
                                    mr={[null, '16px']}
                                    mb={['16px', '8px']}
                                />
                                <ExternalLink
                                    href="https://wx.network/trading/spot/L2MP_USDT-ERC20"
                                    rel="noopener noreferrer"
                                    width={['100%', 'fit-content']}
                                    height="fit-content"
                                    backgroundColor="standard.$0"
                                    mb={16}
                                    boxShadow="0px 8px 20px 0px #3C63AF2B"
                                >
                                    <Button
                                        variant="transparent"
                                        variantSize="large"
                                        width={['100%', 'auto']}
                                        minWidth={165}
                                        maxWidth={['unset', 278]}
                                        wrapperProps={{ variant: 'default' }}
                                    >
                                        <Trans i18key="getL2MP" />
                                    </Button>
                                </ExternalLink>
                                {/*<BalanceComponent*/}
                                {/*    balance={stakeStore.totalStaked?.getTokens()?.gt(0) ?*/}
                                {/*        stakeStore.totalStaked?.getTokens()?.toFormat() :*/}
                                {/*        '0.00'*/}
                                {/*    }*/}
                                {/*    label={{ i18key: 'totalStaked' }}*/}
                                {/*    labelHelp={{ i18key: 'totalStakedTooltip' }}*/}
                                {/*    ticker={rs.assetsStore.LPToken.displayName}*/}
                                {/*    align="left"*/}
                                {/*    flex={1}*/}
                                {/*    mr={[null, '16px']}*/}
                                {/*    mb={['16px', '8px']}*/}
                                {/*/>*/}
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
                                        onPresetClick={stakeStore.onClickPresent}
                                        placeholder='000000000000'
                                    />
                                    <InputErrors error={stakeStore.amountError?.error}/>
                                    <NodeSelect
                                        nodes={
                                            rs.contractStore.nodes.filter((node) => {
                                                return node.address !== stakeStore.node?.address;
                                            })
                                        }
                                        selectedNode={stakeStore.node}
                                        onChangeNode={stakeStore.setNode}
                                        onChangeInput={stakeStore.onSetManuallyNodeAddress.bind(stakeStore)}
                                        inputValue={stakeStore.node?.address || ''}
                                        isError={!!stakeStore.nodeSelectError?.error}
                                        mt={16}
                                    />
                                    <InputErrors error={stakeStore.nodeSelectError?.error} />
                                    <FeeComponent my="16px" />
                                    <ResponsibilitiesBlock mb="16px" />
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
