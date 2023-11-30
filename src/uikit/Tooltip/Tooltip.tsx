import * as React from 'react';
import { Box, BoxProps, Tooltip as TooltipKit, TooltipProps } from '@waves.exchange/wx-react-uikit';

export const Tooltip: React.FC<BoxProps & TooltipProps> = ({
    variant = 'info',
    label,
    isOpen,
    isDefaultOpen,
    offset,
    children,
    display,
    ...rest
}) => {
    const { sx, ...restProps } = rest;
    return (
        <Box
            sx={{
                // eslint-disable-next-line max-len
                '[data-popper-placement^="bottom"], [data-popper-placement^="top"], [data-popper-placement^="right"], [data-popper-placement^="left"], [data-tooltip-element="true"]': {
                    position: 'absolute',
                    backgroundColor: '#DCECF0',
                    border: '1px dashed #C6DAE6 !important',
                    borderRadius: '0 !important',
                    py: '12px',
                    px: '12px',
                    display: display as any,
                },
                '[data-popper-arrow^="true"]': {
                    display: 'none'
                },
                ...(sx as Record<string, any>),
            }}
            {...(restProps as Record<string, any>)}
        >
            <TooltipKit
                variant={variant}
                label={label}
                isOpen={isOpen}
                isDefaultOpen={isDefaultOpen}
                offset={offset}
                data-tooltip-element
            >
                {children}
            </TooltipKit>
        </Box>
    );
};

Tooltip.displayName = 'Tooltip';
