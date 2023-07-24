import { FC, memo } from 'react';
import { Flex, Box } from '@waves.exchange/wx-react-uikit';
import { Trans } from '@waves/ui-translator';
import { Text } from '../../../../uikit/Text/Text';
import { Button } from '../../../../uikit/Button/Button';
import { modalManager } from '../../../../services/modalManager';
import { MODAL_NAMES } from '../../../../components/ModalContainer/MODAL_NAMES';
import logo from '/src/img/mpt-logo.svg';
import metamaskUrl from '/src/img/metamask.svg';
import keeperUrl from '/src/img/keeper.svg';
import wxUrl from '/src/img/wx.svg';

export const ConnectBlock: FC = memo(() => {
    const onConnectClick = () => {
        modalManager.openModal(MODAL_NAMES.authModal);
    };

    return (
        <>
            <Flex sx={{ flexDirection: 'column', alignItems: 'center', py: '32px', px: '32px', display: ['flex', 'none'] }}>
                <Box
                    width="62px"
                    height="62px"
                    minHeight="62px"
                    backgroundImage={`url(${logo})`}
                    backgroundSize="100% 100%"
                    sx={{
                        mb: '24px'
                    }}
                />
                <Text
                    as="div"
                    fontSize="38px"
                    lineHeight="42px"
                    color="#1E1E1E"
                    sx={{
                        my: '0',
                        fontWeight: 300,
                        fontFamily: 'Sfmono-light',
                        textAlign: 'center',
                        display: ['block', 'none']
                    }}
                >
                    <Trans i18key="mptMainTitle" />
                </Text>
            </Flex>
            <Flex
                flexDirection="column"
                backgroundColor="#F6FAFB"
                borderTop={['1px solid #C6DAE6', 'none']}
                borderBottom={['1px solid #C6DAE6', 'none']}
                sx={{
                    flex: 1,
                    px: ['20px', '40px'],
                }}
            >
                <Box width="100%" flex={1} maxHeight="40vh" borderLeft="1px solid #C6DAE6" />
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
                                disabled={true}
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
                                <Trans i18key="comingSoon" />
                            </Button>
                            <Button
                                variant="transparent"
                                disabled={true}
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
                                <Trans i18key="comingSoon" />
                            </Button>
                            <Button
                                variant="transparent"
                                disabled={true}
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
                                <Trans i18key="comingSoon" />
                            </Button>
                        </Box>
                    </Box>
                </Flex>
                <Box width="100%" flex={1} borderLeft="1px solid #C6DAE6" />
            </Flex>
        </>
    );
});

ConnectBlock.displayName = 'ConnectBlock';
