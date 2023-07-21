import * as React from 'react';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';

export const WrapperTooltip: React.FC<BoxProps> = ({ children, ...rest }) => {
    const { sx, ...restProps } = rest;
    return (
        <Box
            sx={{
                '[data-popper-placement^="bottom"]': {
                    backgroundColor: '#141D4B',
                },
                ...(sx as Record<string, any>),
            }}
            {...(restProps as Record<string, any>)}
        >
            {children}
        </Box>
    );
};

WrapperTooltip.displayName = 'WrapperTooltip';
