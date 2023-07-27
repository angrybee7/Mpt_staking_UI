import * as React from 'react';
import { AssetLogo, Box, Flex } from '@waves.exchange/wx-react-uikit';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper.tsx';
import {
    Button,
    Checkbox,
    FeeComponent,
    FormattedInput,
    InputErrors,
    MultiErrorComponent,
    Text,
} from 'uikit';
import { Trans } from '@waves/ui-translator';
import { Observer } from 'mobx-react-lite';
import { ReactElement, useContext } from 'react';
import { AppStoreContext } from '../../../../App.tsx';
import { AssetWithMeta } from '../../../../stores/assets/interface';
import { Money } from '@waves/data-entities';
import { SwapStore } from './SwapStore.ts';
import { FORM_STATE } from '../../../../stores/utils/BaseFormStore.ts';
import { devices } from '../Stake/StakeForm.tsx';

const SwapItem: React.FC<{ asset: AssetWithMeta }> = ({ asset }) => {
    return (
        <SerifWrapper
            py={12}
            px={24}
            flex={1}
            mb={1}
            variant="primary"
            width={['100%', 'auto']}
        >
            <Flex alignItems="center">
                <AssetLogo
                    mr={12}
                    size={28}
                    assetId={asset.id}
                    logo={asset.icon}
                />
                <Text color="text" fontSize={18}>
                    {asset.displayName}
                </Text>
            </Flex>
        </SerifWrapper>
    );
};

export const SwapForm: React.FC = () => {
    const rs = useContext(AppStoreContext);
    const { assetsStore, balanceStore } = rs;

    const swapStore = React.useMemo(() => {
        return new SwapStore({
            rs,
            inputMoney: new Money(0, rs.assetsStore.XTN),
        });
    }, []);

    return (
        <Observer>
            {(): ReactElement => {
                return (
                    <Box as="form" my={2}>
                        <Flex
                            width="100%"
                            alignItems="center"
                            flexDirection={['column', 'row']}
                        >
                            <SwapItem asset={assetsStore.XTN} />
                            <Text color="text" px="16px" py={['8px', '0']}>
                                <Trans i18key={'to'} />
                            </Text>
                            <SwapItem asset={assetsStore.LPToken} />
                        </Flex>
                        <Flex my={16}>
                            <Text variant="heading3" color="text">
                                <Trans i18key={'availableToSwap'} />
                            </Text>
                            <Text color="main" ml={4}>
                                {balanceStore.xtnBalance
                                    ?.getTokens()
                                    .toFormat() || 0.0}
                            </Text>
                        </Flex>
                        <Box>
                            <FormattedInput
                                value={swapStore.inputString}
                                onChange={(e) => {
                                    swapStore.onInputChange(e.target.value);
                                }}
                                iconUrl={rs.assetsStore.XTN.icon}
                                formatSeparator=","
                                decimals={rs.assetsStore.XTN.precision}
                                tag={rs.assetsStore.XTN.displayName}
                                aria-invalid={!!swapStore.amountError?.error}
                                onMax={swapStore.onClickMaxAmount}
                                placeholder="000000000000"
                            />
                            <InputErrors error={swapStore.amountError?.error} />
                            <Checkbox
                                controlBoxStyles={{
                                    baseStyles: { marginRight: '8px' },
                                }}
                                isChecked={swapStore.autoStake}
                                isInvalid={false}
                                onChange={(e) =>
                                    swapStore.setAutoStake(e.target.checked)
                                }
                                color="text"
                                mt={16}
                            >
                                <Trans i18key={'swapCheckbox'} />
                            </Checkbox>
                            <Flex mt={16}>
                                <Text color="text" mr={4}>
                                    <Trans i18key={'youReceive'} />:
                                </Text>
                                <Text color="main">
                                    {swapStore.currentAmount
                                        .getTokens()
                                        .toFormat()}{' '}
                                    {assetsStore.LPToken.displayName}
                                </Text>
                            </Flex>
                            <FeeComponent my="16px" />
                            <MultiErrorComponent
                                activeErrors={swapStore.activeErrors}
                            />
                            <Button
                                variant="primary"
                                onClick={swapStore.invoke}
                                maxWidth={swapStore.formState === FORM_STATE.pending ? 'none' : ['300px', '200px']}
                                variantSize="large"
                                disabled={swapStore.formState === FORM_STATE.pending}
                            >
                                <Flex justifyContent="center">
                                    <Trans
                                        i18key={swapStore.formState === FORM_STATE.pending ?
                                            devices[rs.authStore.user.type] ? 'waitingConfirmation' : 'waiting' :
                                            (swapStore.autoStake
                                                ? 'swapAndStake'
                                                : 'swap')
                                        }
                                        i18Params={{ device: devices[rs.authStore.user.type] }}
                                    />
                                </Flex>
                            </Button>
                        </Box>
                    </Box>
                );
            }}
        </Observer>
    );
};

SwapForm.displayName = 'SwapForm';
