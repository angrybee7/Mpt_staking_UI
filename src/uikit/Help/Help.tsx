/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {  BoxProps, Help as HelpKit } from '@waves.exchange/wx-react-uikit';
import { SerifWrapper } from '../../components/SerifWrapper/SerifWrapper';

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
        <SerifWrapper
            sx={{
                '[data-popper-placement^="bottom"], [data-popper-placement^="top"], [data-popper-placement^="right"], [data-popper-placement^="left"]': {
                    '& svg': {
                        color: 'text',
                    }
                },
                '& svg': {
                    'color': 'text',
                    'width': '20px',
                    'my': '-2px',
                    'mx': '-1px',
                    'position': 'relative',
                    'zIndex': 2,
                    '& circle': {
                        color: 'transparent'
                    }
                },
                '& > div:hover svg': {
                    color: 'text',
                },
                '&:before, &:after': {
                    width: '4px',
                    top: '-1px',
                    borderTop: '1px solid',
                    borderBottom: '1px solid',
                    borderColor: 'text'
                },
                'borderColor': 'text',
                '& > div': {
                    '[data-popper-placement^="bottom"], [data-popper-placement^="bottom-start"], [data-popper-placement^="top"], [data-popper-placement^="right"], [data-popper-placement^="left"]': {
                        backgroundColor: '#DCECF0',
                        border: '1px dashed #C6DAE6 !important',
                        borderRadius: '0 !important',
                        py: '12px',
                        px: '12px',
                        zIndex: 3
                    },
                    '[data-popper-arrow^="true"]': {
                        display: 'none'
                    },
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
        </SerifWrapper>
    );
};

Help.displayName = 'Help';
