import { FC, memo } from 'react';
import { Box, Flex, Text } from '@waves.exchange/wx-react-uikit';
import { LogoLine } from './LogoLine';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../components/SerifWrapper/SerifWrapper';

export const LeftSide: FC = memo(() => {
    return (
        <Flex
            width={['100%', '50%']}
            sx={{
                pr: ['0', '40px'],
                backgroundColor: ['#F6FAFB', 'transparent']
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
                    backgroundColor='#F6FAFB'
                    color='#1E1E1E'
                    fontSize='14px'
                    lineHeight='18px'
                >
                    <Trans i18key="mptMainDesc" />
                    <Trans i18key="mptMainDesc" />
                    <Trans i18key="mptMainDesc" />
                    <Trans i18key="mptMainDesc" />
                </SerifWrapper>
            </Box>
        </Flex>
    );
});

LeftSide.displayName = 'LeftSide';
