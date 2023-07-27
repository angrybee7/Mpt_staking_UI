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
import { BalanceRow } from '../../../../components/BalanceComponent/BalanceRow.tsx';

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
                <Box sx={{ py: '24px', px:['16px', '24px'] }}>
                    <Text as="div" variant="heading2" mb="16px">
                        <Trans i18key="swap" />
                    </Text>
                    <BalanceRow
                        balance={'0.00'}
                        label={{ i18key: 'availableToSwap' }}
                        ticker="XTN"
                    />
                </Box>
            )}
        </SerifWrapper>
    );
};

SwapModule.displayName = 'SwapForm';
