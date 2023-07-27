import React, { useContext } from 'react';

import { AccordionItemContext } from './AccordionItemContext';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';

const commonStyles = {
    fontSize: '$14',
    color: 'textsec',
    pr: 10,
    pl: 16,
    transition:
        'max-height .3s, padding-top .3s, padding-bottom .3s, margin-top .3s',
    overflow: 'hidden',
};

export const AccordionPanel: React.FC<BoxProps> = ({ children, ...rest }) => {
    const { isExpanded, isDisabled, variant } =
        useContext(AccordionItemContext);
    const styles = isExpanded
        ? {
            ...commonStyles,
            // maxHeight: 500,
            py: 12,
            pb: '24px',
        }
        : {
            ...commonStyles,
            maxHeight: 0,
            py: 0,
            pb: 0,
        };

    return (
        <Box
            aria-disabled={isDisabled}
            aria-expanded={isExpanded}
            px={variant === 'default' ? 0 : [16, null, 24]}
            mt={variant === 'default' ? 10 : 0}
            {...styles as any}
            {...rest}
        >
            <Box
                // maxHeight={476}
                pr={6}
                overflowY="auto"
                sx={{
                    '::-webkit-scrollbar': {
                        width: 4,
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: 'mediumGrey.$300',
                        borderRadius: 1.5,
                        width: 3,
                    },
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

AccordionPanel.displayName = 'AccordionPanel';
