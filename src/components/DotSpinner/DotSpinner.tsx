import { FC } from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { Text } from '../../uikit/Text/Text';
import { keyframes } from '@emotion/core';

const dotsAnimation1 = keyframes({ '0%': { opacity: 0 }, '19%': { opacity: 0 }, '20%': { opacity: 1 } });
const dotsAnimation2 = keyframes({ '0%': { opacity: 0 }, '49%': { opacity: 0 }, '50%': { opacity: 1 } });
const dotsAnimation3 = keyframes({ '0%': { opacity: 0 }, '79%': { opacity: 0 }, '80%': { opacity: 1 } });

export const DotsAnimation: FC = () => {
    return (
        <Flex>
            <Text sx={{ animation: `${dotsAnimation1} 3s linear infinite` }}>{'.'}</Text>
            <Text sx={{ animation: `${dotsAnimation2} 3s linear infinite` }}>{'.'}</Text>
            <Text sx={{ animation: `${dotsAnimation3} 3s linear infinite` }}>{'.'}</Text>
        </Flex>
    );
};

DotsAnimation.displayName = 'DotsAnimation';
