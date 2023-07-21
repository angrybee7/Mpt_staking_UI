import * as React from 'react';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';

export const WrapperFormattedInput: React.FC<BoxProps> = ({
    children,
    ...rest
}) => {
    const { sx, ...restProps } = rest;
    return (
        <Box
            sx={{
                'input': {
                    '&[aria-invalid="true"]': {
                        '&, &:hover, &:focus': {
                            borderColor: 'wddanger',
                        },
                    },
                    '&:focus:not(:disabled)': {
                        borderColor: '#1F5AF6',
                    }
                },
                '& *': {
                    fontSize: '14px !important',
                    lineHeight: '20px !important',
                },
                'span': {
                    color: 'wdtextsec'
                },
                ...(sx as Record<string, any>),
            }}
            {...(restProps as Record<string, any>)}
        >
            {children}
        </Box>
    );
};

WrapperFormattedInput.displayName = 'WrapperFormattedInput';
