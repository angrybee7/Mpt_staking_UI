import React, { FC, createContext } from 'react';
import { TAccordionVariant } from './Accordion';

export interface IAccordionItemContext {
    isExpanded: boolean;
    isDisabled: boolean;
    onToggle: () => void;
    variant: TAccordionVariant;
}

interface IAccordionItemProvider {
    context: IAccordionItemContext;
    children: React.ReactElement;
}

export const AccordionItemContext = createContext<IAccordionItemContext>({
    isExpanded: false,
    isDisabled: false,
    onToggle: () => void 0,
    variant: 'default',
});

export const AccordionItemProvider: FC<IAccordionItemProvider> = ({
    context,
    children,
}) => {
    return (
        <AccordionItemContext.Provider value={context}>
            {children}
        </AccordionItemContext.Provider>
    );
};
