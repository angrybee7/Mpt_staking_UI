import * as React from 'react';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';

type SerifWrapperProps = BoxProps & {
	variant?: 'primary' | 'error' | 'default';
}

const variants = {
    default: '#C6D8E2',
    error: '#F30909',
    primary: '#0983F3'
};

export const SerifWrapper: React.FC<SerifWrapperProps> = ({ variant = 'default', children, ...props }) => {
    const { sx, ...rest } = props;

    return (
        <Box
            position="relative"
            borderRight="1px solid"
            borderLeft="1px solid"
            borderColor={variants[variant] || variants.default}
            sx={{
                '&::before': {
                    content: '""',
                    display: 'block',
                    width: '10px',
                    height: '100%',
                    position: 'absolute',
                    top: '-2px',
                    left: '0',
                    borderTop: '2px solid',
                    borderBottom: '2px solid',
                    borderColor: variants[variant] || variants.default
                },
                '&::after': {
                    content: '""',
                    display: 'block',
                    width: '10px',
                    height: '100%',
                    position: 'absolute',
                    top: '-2px',
                    right: '0',
                    borderTop: '2px solid',
                    borderBottom: '2px solid',
                    borderColor: variants[variant] || variants.default
                },
                ...(sx ? props.sx as object : null)
            }}
            {...rest as any}
        >
            {children}
        </Box>
    );
};

SerifWrapper.displayName = 'SerifWrapper';

