import { FC, memo } from 'react';
import { Box, Flex, Text } from '@waves.exchange/wx-react-uikit';
import { LogoLine } from './LogoLine.tsx';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../components/SerifWrapper/SerifWrapper.tsx';

export const LeftSide: FC = memo(() => {
    return (
        <Flex
            width={['100%', '50%']}
            sx={{
                pr: ['0', '40px'],
                backgroundColor: ['bg', 'transparent'],
                pb: ['24px', '0'],
            }}
        >
            <LogoLine />
            <Box sx={{ pt: ['24px', '130px'], ml: ['8px', '-25px'], mr: ['8px', '0'] }}>
                <Text
                    as="h1"
                    fontSize="68px"
                    lineHeight="102px"
                    sx={{
                        my: '0',
                        fontWeight: 300,
                        fontFamily: 'Sfmono-light',
                        display: ['none', 'block']
                    }}
                >
                    <Trans i18key="mptMainTitle" />
                </Text>
                <SerifWrapper
                    py='24px'
                    px='24px'
                    backgroundColor='bg'
                    color='#1E1E1E'
                    fontSize='14px'
                    lineHeight='18px'
                    mb={[null, '24px']}
                >
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc1" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc2" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc3" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc4" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc5" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc6" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc7" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc8" /></Box>
                    <Box><Trans i18key="mptMainDesc9" /></Box>
                </SerifWrapper>
            </Box>
        </Flex>
    );
});

LeftSide.displayName = 'LeftSide';
