import {
    AccordionItemProvider,
    IAccordionItemContext,
} from './AccordionItemContext';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { TVariant } from './Accordion';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';

export type IAccordionItem = BoxProps & {
    isOpen?: boolean;
    isDisabled?: boolean;
    variant?: TVariant;
    onChange?: (isExpanded: boolean) => void;
};

export const AccordionItem = forwardRef<HTMLDivElement, IAccordionItem>(
    (
        {
            isOpen = false,
            isDisabled = false,
            children,
            variant = 'default',
            onChange,
            ...rest
        },
        ref
    ) => {
        const [isExpanded, setIsExpanded] = useState(isOpen);

        useEffect(() => {
            setIsExpanded(isOpen);
        }, [isOpen]);

        const onToggle = useCallback(() => {
            setIsExpanded(!isExpanded);
            if (typeof onChange === 'function') {
                onChange(!isExpanded);
            }
        }, [isExpanded, onChange]);

        const context: IAccordionItemContext = {
            isExpanded,
            isDisabled,
            onToggle,
            variant,
        };

        const stylesByVariant = (): BoxProps => {
            switch (variant) {
                case 'faq':
                    return {
                        position: 'relative',
                        zIndex: 1,
                        borderRadius: isExpanded ? 8 : 0,
                        bg: isExpanded ? 'bgsec' : 'bg',
                        borderBottom: isExpanded ? 'none' : '1px solid',
                        borderColor: 'divider',
                    };
                case 'transparent-faq':
                    return {
                        position: 'relative',
                        zIndex: 1,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    };
                default:
                    return { mb: 10 };
            }
        };

        return (
            <AccordionItemProvider context={context}>
                <Box {...stylesByVariant() as any} ref={ref} {...rest}>
                    {children}
                </Box>
            </AccordionItemProvider>
        );
    }
);

AccordionItem.displayName = 'AccordionItem';
