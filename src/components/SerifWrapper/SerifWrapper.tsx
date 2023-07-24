import * as React from 'react';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';

export const SerifWrapper: React.FC<BoxProps> = ({ children, ...props }) => {
    return (
        <Box
            position="relative"
            borderRight="1px solid"
            borderLeft="1px solid"
            borderColor="#C6D8E2"
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
                    borderColor: '#C6D8E2'
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
                    borderColor: '#C6D8E2'
                }
            }}
            {...props as any}
        >
            {children}
        </Box>
    );
};

SerifWrapper.displayName = 'SerifWrapper';

