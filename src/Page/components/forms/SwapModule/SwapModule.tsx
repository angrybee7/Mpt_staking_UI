import * as React from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Text
} from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SwapForm } from './SwapForm.tsx';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper';

export const SwapModule: React.FC = () => {
    return (
        <SerifWrapper>
            <Accordion>
                <AccordionItem mb={0}>
                    <AccordionHeader boxShadow={'none'}>
                        <Text variant="heading2">
                            <Trans i18key="swap" />
                        </Text>
                    </AccordionHeader>
                    <AccordionPanel my={0} py={2}>
                        <SwapForm />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </SerifWrapper>
    );
};

SwapModule.displayName = 'SwapForm';
