import React, { useCallback, useContext } from 'react';

import { AccordionItemContext } from './AccordionItemContext';
import { Flex, Icon, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { accordionArrow } from './accordionArrow.tsx';

export type TAccordionHeader = Omit<TFlexProps, 'onClick'> & {
    onClick?: () => void;
};

export const AccordionHeader: React.FC<TAccordionHeader> = ({
    onClick,
    children,
    ...rest
}) => {
    const { onToggle, isExpanded, isDisabled, variant } =
        useContext(AccordionItemContext);
    const isDefault = variant === 'default';

    const handleClick = useCallback(() => {
        if (isDisabled) {
            return;
        }
        if (typeof onClick === 'function') {
            onClick();
        }
        onToggle();
    }, [isDisabled, onClick, onToggle]);

    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            px={isDefault ? 16 : [16, null, 24]}
            pb={isDefault ? 14 : isExpanded ? 12 : [16, null, 24]}
            pt={isDefault ? 14 : isExpanded ? 24 : [16, null, 24]}
            // backgroundColor={isExpanded ? 'main.$500' : 'main.$600'}
            borderRadius={isDefault ? '$4' : '0'}
            boxShadow={isDefault ? '0 2px 7px 0 rgba(0, 0, 0, .15)' : ''}
            transition="0.3s"
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            color="text"
            fontSize="$14"
            lineHeight="$24"
            // sx={
            //     !isDisabled
            //         ? {
            //               '&:hover': {
            //                   backgroundColor: 'main.$500',
            //                   boxShadow: '0 2px 7px 0 rgba(0, 0, 0, .12)',
            //               },
            //           }
            //         : {}
            // }
            sx={
                !isDefault
                    ? {
                        '&[aria-expanded="true"] path': {
                            stroke: 'main',
                        },
                    }
                    : {}
            }
            {...rest}
            aria-disabled={isDisabled}
            aria-expanded={isExpanded}
            onClick={handleClick}
        >
            {children}
            <Icon
                icon={accordionArrow}
                color="icon"
                transition="transform .3s"
                sx={{
                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-180deg)',
                }}
                size={14}
            />
        </Flex>
    );
};

AccordionHeader.displayName = 'AccordionHeader';
