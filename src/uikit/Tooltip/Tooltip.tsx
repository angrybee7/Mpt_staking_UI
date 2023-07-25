import * as React from 'react';
import { Box, BoxProps, Tooltip as TooltipKit, TooltipProps } from '@waves.exchange/wx-react-uikit';

export const Tooltip: React.FC<BoxProps & TooltipProps> = ({ variant = 'info', label, children, ...rest }) => {
    const { sx, ...restProps } = rest;
    return (
        <Box
            sx={{
                // eslint-disable-next-line max-len
                '[data-popper-placement^="bottom"], [data-popper-placement^="top"], [data-popper-placement^="right"], [data-popper-placement^="left"]': {
                    backgroundColor: '#DCECF0',
                    border: '1px dashed #C6DAE6 !important',
                    borderRadius: '0 !important',
                    py: '12px',
                    px: '12px'
                },
                '[data-popper-arrow^="true"]': {
                    display: 'none'
                },
                ...(sx as Record<string, any>),
            }}
            {...(restProps as Record<string, any>)}
        >
            <TooltipKit variant={variant} label={label}>
                {children}
            </TooltipKit>
        </Box>
    );
};

Tooltip.displayName = 'Tooltip';
