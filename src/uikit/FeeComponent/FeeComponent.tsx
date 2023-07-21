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
    tooltipAtEnd = false,
    tooltipAlign = 'left',
    id,
    ...rest
}) => {
    const feeValue = Money.fromCoins(fee || 500000, wavesAsset);
    return (
        <Flex
            id={id}
            alignItems="center"
            justifyContent={tooltipAtEnd ? 'flex-end' : 'space-between'}
            {...rest}
        >
            <Flex
                mr="8px"
                alignItems="center"
            >
                <Text
                    variant="caption"
                    color="#B0BAC7"
                    mr={tooltipAtEnd ? '0' : '8px'}
                >
                    <Trans {...feeText} />
                </Text>
                {!tooltipAtEnd && (
                    <Help tooltipAlign={tooltipAlign}>
                        <Box
                            id={`${id}-text`}
                            minWidth="250px"
                        >
                            <Trans {...tooltipText} />
                        </Box>
                    </Help>
                )}
            </Flex>
            <Box
                id={`${id}-fee-value`}
                mr={tooltipAtEnd ? '8px' : '0'}
                color="text"
            >
                {feeValue
                    ? (
                        <>
                            <Text variant="body2">{isPercent ? fee : feeValue?.getTokens()?.toFormat()}</Text>
                            <Text
                                variant="body2"
                                ml={!isPercent ? '5px' : null}
                            >
                                {isPercent ? '%' : feeValue?.asset?.ticker || feeValue?.asset?.displayName || null}
                            </Text>
                        </>
                    )
                    : (
                        <Text color="text">...</Text>
                    )}
            </Box>
            {tooltipAtEnd && (
                <Help tooltipAlign="right">
                    <Box
                        id={`${id}-text`}
                        minWidth="250px"
                    >
                        <Trans {...tooltipText} />
                    </Box>
                </Help>
            )}
        </Flex>
    );
};

FeeComponent.displayName = 'FeeComponent';
