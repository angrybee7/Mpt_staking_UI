import { FC, memo, useCallback, useState } from 'react';
import { Flex, Box, ExternalLink } from '@waves.exchange/wx-react-uikit';
import { Trans } from '@waves/ui-translator';
import { Button, Checkbox, Text } from 'uikit';
import metamaskUrl from '/src/img/metamask.svg';
import keeperUrl from '/src/img/keeper.svg';
import wxUrl from '/src/img/wx.svg';
import ledgerUrl from '/src/img/ledger.svg';
import { PROVIDER_TYPES, PROVIDER_TYPES_VALUES } from '../../../../../stores/AuthStore.ts';
import { useAuth } from '../../../../../hooks/useAuth.ts';
import { MODAL_NAMES } from '../../../../../components/ModalContainer/MODAL_NAMES.ts';
import { modalManager } from '../../../../../services/modalManager.ts';
import { MobileTitle } from '../../../../components/MobileTitle/MobileTitle.tsx';

enum ERROR {
    uncheckedTerms = 'uncheckedTerms',
    uncheckedProvider = 'uncheckedProvider',
}

export const ConnectBlock: FC = memo(() => {
    const [checked, setChecked] = useState<boolean>(false);
    const [selectedProvider, setSelectedProvider] = useState<PROVIDER_TYPES_VALUES>();
    const [errors, setErrors] = useState<Array<ERROR>>([]);
    const { login } = useAuth();

    const handleContinue = useCallback(() => {
        const errors = [];
        if (!checked) {
            errors.push(ERROR.uncheckedTerms);
        }
        if (!selectedProvider) {
            errors.push(ERROR.uncheckedProvider);
        }
        setErrors(errors);
        if (errors.length) {
            return;
        }
        login(selectedProvider);
    }, [checked, selectedProvider]);

    const onCheckTerms = useCallback((e): void => {
        setChecked(e.target.checked);
        setErrors([]);
    }, []);

    const onDisclaimerClick = useCallback((e): void => {
        if (e.target.classList.contains('legalDisclaimer')) {
            e.preventDefault();
            modalManager.openModal(MODAL_NAMES.legalDisclaimer, undefined, 500);
        }
    }, []);

    const onSetProvider = useCallback((provider: PROVIDER_TYPES): void => {
        setSelectedProvider(provider);
        setErrors([]);
    }, []);

    return (
        <>
            <MobileTitle />
            <Flex
                flexDirection="column"
                backgroundColor="bg"
                borderTop={['1px solid #C6DAE6', 'none']}
                borderBottom={['1px solid #C6DAE6', 'none']}
                sx={{
                    flex: 1,
                    px: ['20px', '40px'],
                }}
            >
                <Box
                    borderLeft="1px solid #C6DAE6"
                    display={[null, 'none']}
                    sx={{ pl: '20px', mt: '32px' }}
                >
                    <ExternalLink href="https://units.network/" rel="noopener noreferrer" display="block" maxWidth="400px">
                        <Box
                            backgroundImage="url(./src/img/units-banner.png)"
                            backgroundSize="100% 100%"
                            height="160px"
                            width="100%"
                            minWidth="320px"
                            maxWidth="400px"
                        />
                    </ExternalLink>
                </Box>
                <Box
                    width="100%"
                    height="40px"
                    borderLeft="1px solid #C6DAE6"
                    display={['none', 'block']}
                />
                <Flex flexDirection="column" sx={{ py: '24px' }}>
                    <Text
                        as="div"
                        fontSize={['20px', '23px']}
                        lineHeight={['28px', '32px']}
                        color="#1E1E1E"
                        sx={{
                            mb: ['16px', '24px'],
                            fontWeight: 500,
                        }}
                    >
                        <Trans i18key="mptConnectToLogIn" />
                    </Text>
                    <Box borderLeft={[null, '1px solid #C6DAE6']} sx={{ pl: [null, '20px'] }}>
                        <Box borderLeft={[null, '1px solid #C6DAE6']} sx={{ pl: [null, '20px'] }}>
                            <Button
                                variant="transparent"
                                variantSize="large"
                                isInvalid={errors.includes(ERROR.uncheckedProvider)}
                                isActive={selectedProvider === PROVIDER_TYPES.ledger}
                                onClick={() => onSetProvider(PROVIDER_TYPES.ledger)}
                                mb={20}
                                maxWidth="330px"
                                display="flex"
                                sx={{ alignItems: 'center' }}
                            >
                                <Box
                                    width="28px"
                                    height="28px"
                                    backgroundImage={`url(${ledgerUrl})`}
                                    backgroundRepeat="no-repeat"
                                    backgroundPosition="center center"
                                    sx={{ mr: '12px' }}
                                />
                                <Text fontWeight={300}>
                                    <Trans i18key="ledger" />
                                </Text>
                            </Button>
                            <Button
                                variant="transparent"
                                variantSize="large"
                                isInvalid={errors.includes(ERROR.uncheckedProvider)}
                                isActive={selectedProvider === PROVIDER_TYPES.metamask}
                                onClick={() => onSetProvider(PROVIDER_TYPES.metamask)}
                                mb={20}
                                maxWidth="330px"
                                display="flex"
                                sx={{ alignItems: 'center' }}
                            >
                                <Box
                                    width="28px"
                                    height="28px"
                                    backgroundImage={`url(${metamaskUrl})`}
                                    backgroundRepeat="no-repeat"
                                    backgroundPosition="center center"
                                    sx={{ mr: '12px' }}
                                />
                                <Text fontWeight={300}>
                                    <Trans i18key="metaMask" />
                                </Text>
                            </Button>
                            <Button
                                variant="transparent"
                                variantSize="large"
                                isInvalid={errors.includes(ERROR.uncheckedProvider)}
                                isActive={selectedProvider === PROVIDER_TYPES.keeper}
                                onClick={() => onSetProvider(PROVIDER_TYPES.keeper)}
                                mb={20}
                                maxWidth="330px"
                                display="flex"
                                sx={{ alignItems: 'center' }}
                            >
                                <Box
                                    width="28px"
                                    height="28px"
                                    backgroundImage={`url(${keeperUrl})`}
                                    backgroundRepeat="no-repeat"
                                    backgroundPosition="center center"
                                    sx={{ mr: '12px' }}
                                />
                                <Text fontWeight={300}>
                                    <Trans i18key="keeperWallet" />
                                </Text>
                            </Button>
                            <Button
                                variant="transparent"
                                variantSize="large"
                                isInvalid={errors.includes(ERROR.uncheckedProvider)}
                                isActive={selectedProvider === PROVIDER_TYPES.web}
                                onClick={() => onSetProvider(PROVIDER_TYPES.web)}
                                mb={20}
                                maxWidth="330px"
                                display="flex"
                                sx={{ alignItems: 'center' }}
                            >
                                <Box
                                    width="28px"
                                    height="28px"
                                    backgroundImage={`url(${wxUrl})`}
                                    backgroundRepeat="no-repeat"
                                    backgroundPosition="center center"
                                    sx={{ mr: '12px' }}
                                />
                                <Text fontWeight={300}>
                                    <Trans i18key="seed" />
                                </Text>
                            </Button>
                            <Button
                                variant="transparent"
                                variantSize="large"
                                isInvalid={errors.includes(ERROR.uncheckedProvider)}
                                isActive={selectedProvider === PROVIDER_TYPES.cloud}
                                onClick={() => onSetProvider(PROVIDER_TYPES.cloud)}
                                maxWidth="330px"
                                display="flex"
                                sx={{ alignItems: 'center' }}
                            >
                                <Box
                                    width="28px"
                                    height="28px"
                                    backgroundImage={`url(${wxUrl})`}
                                    backgroundRepeat="no-repeat"
                                    backgroundPosition="center center"
                                    sx={{ mr: '12px' }}
                                />
                                <Text fontWeight={300}>
                                    <Trans i18key="cloud" />
                                </Text>
                            </Button>
                        </Box>

                        <Checkbox
                            controlBoxStyles={{ baseStyles: { mr: '8px' } }}
                            isChecked={checked}
                            isInvalid={errors.includes(ERROR.uncheckedTerms)}
                            onChange={onCheckTerms}
                            color="text"
                            mt="24px"
                        >
                            <Text
                                onClick={onDisclaimerClick}
                                sx={{
                                    '.legalDisclaimer': {
                                        color: 'main',
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <Trans i18key="legalCheckbox" />
                            </Text>
                        </Checkbox>

                        <Button
                            variantSize="large"
                            variant="primary"
                            maxWidth="200px"
                            onClick={handleContinue}
                            mt={24}
                        >
                            <Trans i18key="continue" />
                        </Button>
                    </Box>
                </Flex>
                <Box width="100%" flex={1} borderLeft="1px solid #C6DAE6" />
            </Flex>
        </>
    );
});

ConnectBlock.displayName = 'ConnectBlock';
