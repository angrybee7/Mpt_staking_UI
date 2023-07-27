import * as React from 'react';
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    Text,
} from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SwapForm } from './SwapForm.tsx';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper';
import { Box } from '@waves.exchange/wx-react-uikit';

export const SwapModule: React.FC<{ hasXtn: boolean }> = ({ hasXtn }) => {
    return (
        <SerifWrapper>
            {hasXtn ? (
                <Accordion defaultIndex={0}>
                    <AccordionItem mb={0} isDisabled={!hasXtn}>
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
            ) : (
                <Box p={26}>
                    <Text variant="heading2">
                        <Trans i18key="swap" />
                    </Text>
                    <Box>
                        <Text variant="heading3" color="text">
                            <Trans i18key={'availableToSwap'} />
                        </Text>
                        <Text color="textsec" ml={4}>
                            0.00 XTN
                        </Text>
                    </Box>
                </Box>
            )}
        </SerifWrapper>
    );
};

SwapModule.displayName = 'SwapForm';
