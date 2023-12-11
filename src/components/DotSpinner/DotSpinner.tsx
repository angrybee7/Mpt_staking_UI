import { FC } from 'react';
import { Flex, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { keyframes } from '@emotion/core';

const dotsAnimation1 = keyframes({ '0%': { opacity: 0 }, '19%': { opacity: 0 }, '20%': { opacity: 1 } });
const dotsAnimation2 = keyframes({ '0%': { opacity: 0 }, '49%': { opacity: 0 }, '50%': { opacity: 1 } });
const dotsAnimation3 = keyframes({ '0%': { opacity: 0 }, '79%': { opacity: 0 }, '80%': { opacity: 1 } });

export const DotSpinner: FC<TFlexProps> = ({ ...props }) => {
    return (
        <Flex {...props}>
            <Text sx={{ animation: `${dotsAnimation1} 2.5s linear infinite` }}>{'.'}</Text>
            <Text sx={{ animation: `${dotsAnimation2} 2.5s linear infinite` }}>{'.'}</Text>
            <Text sx={{ animation: `${dotsAnimation3} 2.5s linear infinite` }}>{'.'}</Text>
        </Flex>
    );
};

DotSpinner.displayName = 'DotSpinner';
