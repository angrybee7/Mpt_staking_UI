import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, Box, Flex } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SwapForm } from './SwapForm.tsx';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper';


export const SwapModule: React.FC = () => {

    return (
        <SerifWrapper mt={50}>
            <Accordion >
                <AccordionItem>
                    <AccordionHeader boxShadow={'none'}>
                        <Text>
                            <Trans i18key='swap'/>
                        </Text>
                    </AccordionHeader>
                    <AccordionPanel my={0} py={2}>
                        <SwapForm />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </SerifWrapper>
    );
}

SwapModule.displayName = 'SwapForm';
