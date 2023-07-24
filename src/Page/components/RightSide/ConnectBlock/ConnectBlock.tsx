import { FC, memo } from 'react';
import { Flex, Box } from '@waves.exchange/wx-react-uikit';
import { Trans } from '@waves/ui-translator';
import { Text } from '../../../../uikit/Text/Text';
import { Button } from '../../../../uikit/Button/Button';
import { ConnectTypes } from './ConnectTypes';
import { modalManager } from '../../../../services/modalManager';
import { MODAL_NAMES } from '../../../../components/ModalContainer/MODAL_NAMES';

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
                    backgroundImage="url(src/img/mpt-logo.svg)"
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
                sx={{
                    flex: 1,
                    px: ['20px', '40px'],
                }}
            >
                <Box
                    width="100%"
                    flex={1}
                    borderLeft="1px solid #C6DAE6"
                />
                <Flex flexDirection="column" sx={{ py: '24px' }}>
                    <Text
                        as="div"
                        fontSize="23px"
                        lineHeight="32px"
                        color="#1E1E1E"
                        sx={{
                            mb: '24px',
                            fontWeight: 500,
                        }}
                    >
                        <Trans i18key="mptConnectToLogIn" />
                    </Text>
                    <Box borderLeft="1px solid #C6DAE6" sx={{ pl: '20px' }}>
                        <Box borderLeft="1px solid #C6DAE6" sx={{ pl: '20px' }}>

                        </Box>
                    </Box>
                    <ConnectTypes />
                    <Text as="div" variant="text1" color="wdtextsec" mb="16px" textAlign="center">
                        <Trans i18key="connectDesc" />
                    </Text>
                    <Button variant="primary" onClick={onConnectClick}>
                        <Trans i18key="connectButton"  />
                    </Button>
                </Flex>
                <Box
                    width="100%"
                    flex={1}
                    borderLeft="1px solid #C6DAE6"
                />
            </Flex>
        </>
    );
});

ConnectBlock.displayName = 'ConnectBlock';
