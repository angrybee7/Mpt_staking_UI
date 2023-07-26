import * as React from 'react';
import { Box, Flex, Text, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { ITransProps, Trans } from '@waves/ui-translator';
import { wavesAsset } from '../../services/assets';
import { Money } from '@waves/data-entities';
import { Help } from '../Help/Help';

type TFeeComponentProps = TFlexProps & {
    fee?: string | number;
    feeText?: ITransProps;
    tooltipText?: ITransProps;
    isPercent?: boolean;
    tooltipAlign?: 'left' | 'center' | 'right' | 'auto';
    tooltipAtEnd?: boolean;
    id?: string;
};

export const FeeComponent: React.FC<TFeeComponentProps> = ({
    fee,
    feeText = { i18key: 'transactionFee' },
    tooltipText = { i18key: 'transactionFeeTooltip' },
    isPercent = false,
    tooltipAlign = 'left',
    id,
    ...rest
}) => {
    const feeValue = Money.fromCoins(fee || 500000, wavesAsset);
    return (
        <Flex
            id={id}
            alignItems="center"
            {...rest}
        >
            <Flex mr="8px" alignItems="center">
                <Text
                    variant="15px"
                    lineHeight="20px"
                    fontFamily="Sfmono-light"
                    color="text"
                >
                    <Trans {...feeText} />
                </Text>{':'}
                <Box id={`${id}-fee-value`} sx={{ mx: '8px' }} color="main">
                    {feeValue
                        ? (
                            <>
                                <Text fontSize="15px" lineHeight="20px">{isPercent ? fee : feeValue?.getTokens()?.toFormat()}</Text>
                                <Text fontSize="15px" lineHeight="20px" sx={{ ml: '4px' }}>
                                    {isPercent ? '%' : feeValue?.asset?.ticker || feeValue?.asset?.displayName || null}
                                </Text>
                            </>
                        )
                        : (
                            <Text color="text">...</Text>
                        )}
                </Box>
                <Help tooltipAlign={tooltipAlign}>
                    <Box id={`${id}-text`} minWidth="250px">
                        <Trans {...tooltipText} />
                    </Box>
                </Help>
            </Flex>
        </Flex>
    );
};

FeeComponent.displayName = 'FeeComponent';
