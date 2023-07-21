/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Box, BoxProps, Help as HelpKit } from '@waves.exchange/wx-react-uikit';

type TWrapperHelp = BoxProps & {
    tooltipAlign?: 'left' | 'center' | 'right' | 'auto';
    direction?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
};

export const Help: React.FC<TWrapperHelp> = ({
    children,
    tooltipAlign = 'left',
    direction = 'bottom',
    ...rest
}) => {
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
            {/* @ts-ignore */}
            <HelpKit
                colors={{ active: '#B0BAC7' }}
                direction={direction}
                align={tooltipAlign}
            >
                {children}
            </HelpKit>
        </Box>
    );
};

Help.displayName = 'Help';
