import { FC, memo } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import metamaskUrl from '/src/img/metamask.svg';
import keeperUrl from '/src/img/keeper.svg';
import wxUrl from '/src/img/wx.svg';

export const ConnectTypes: FC = memo(() => {
    return (
        <Flex mb="24px">
            <Flex width="48px" height="48px" justifyContent="center" alignItems="center" backgroundColor="#F0C78A" borderRadius="50%">
                <Box width="28px" height="28px" backgroundImage={`url(${metamaskUrl})`} />
            </Flex>
            <Flex
                width="48px"
                height="48px"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#313F5A"
                borderRadius="50%"
                ml="-5px"
                display={['none', 'flex']}
            >
                <Box width="23px" height="28px" backgroundImage={`url(${keeperUrl})`} />
            </Flex>
            <Flex
                width="48px"
                height="48px"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#0C2F57"
                borderRadius="50%"
                ml="-5px"
            >
                <Box width="28px" height="28px" backgroundImage={`url(${wxUrl})`} />
            </Flex>
        </Flex>
    );
});

ConnectTypes.displayName = 'ConnectTypes';
