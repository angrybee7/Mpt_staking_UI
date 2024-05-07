import { FC, useContext } from 'react';
import { Box, ExternalLink, Flex, Text } from '@waves.exchange/wx-react-uikit';
import { LogoLine } from './LogoLine.tsx';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../components/SerifWrapper/SerifWrapper.tsx';
import { AppStoreContext } from '../../../App.tsx';
import { observer } from 'mobx-react-lite';
import unitsBanner from '/src/img/units-banner.png';

export const LeftSide: FC = observer(() => {
    const { authStore } = useContext(AppStoreContext);
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
            <Box sx={{ pt: ['24px', '130px'], ml: ['8px', '-25px'], mr: ['8px', '0'], width: '100%' }}>
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
                    py='16px'
                    px='12px'
                    backgroundColor='bg'
                    color='#1E1E1E'
                    fontSize='14px'
                    lineHeight='18px'
                    maxWidth={['432px', '640px']}
                    mb={[null, '24px']}
                    mx={['auto', '0']}
                    display={[authStore.isAuthorized ? 'block' : 'none', 'block']}
                >
                    <ExternalLink href="https://units.network/" rel="noopener noreferrer" display="block" maxWidth={['400px', '608px']}>
                        <Box
                            backgroundImage={`url(${unitsBanner})`}
                            backgroundSize="100% 100%"
                            height={['160px', '304px']}
                            width="100%"
                            minWidth={['320px', '510px']}
                            maxWidth={['400px', '608px']}
                        />
                    </ExternalLink>
                    {/* <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc" /></Box>s
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc1" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc2" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc3" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc4" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc5" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc6" /></Box>
                    <Box sx={{ mb: '16px' }}><Trans i18key="mptMainDesc7" /></Box> */}
                    {/* <Box><Trans i18key="mptMainDesc9" /></Box> */}
                </SerifWrapper>
            </Box>
        </Flex>
    );
});

LeftSide.displayName = 'LeftSide';
