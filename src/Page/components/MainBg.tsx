import { Box } from '@waves.exchange/wx-react-uikit';
import { FC, memo } from 'react';

export const MainBg: FC = memo(() => {
    return (
        <Box
            backgroundImage={`url(${''})`}
            backgroundSize="100% 100%"
            width="100%"
            height="100%"
            top="0"
            left="0"
            position="absolute"
        >
            <Box
                backgroundImage={`url(${''})`}
                backgroundSize="100% 100%"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height={['30%', '80%']}
            />
            <Box
                backgroundImage={`url(${''})`}
                backgroundSize="100% 100%"
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                height={['130%', '30%']}
            />
        </Box>
    );
});

MainBg.displayName = 'MainBg';
