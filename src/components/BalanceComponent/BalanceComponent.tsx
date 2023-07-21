import * as React from 'react';
import {
    LabelComponent,
    LabelComponentProps,
} from '../LabelComponent/LabelComponent';
import { BalanceContent, BalanceContentProps } from './BalanceContent';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';
import { getColor, getSize } from './helpers';
import { TColor, TTextVariant } from '../../uikit';

type BalanceComponentProps = BoxProps &
    Partial<Omit<LabelComponentProps, 'variant'>> &
    BalanceContentProps;

export const BalanceComponent: React.FC<BalanceComponentProps> = ({
    label,
    labelHelp,
    markerColor,
    iconUrl,
    balance,
    ticker,
    equivalent,
    variant = ['medium'],
    skeleton,
    mainContent,
    bottomContent,
    rightContent,
    align,
    ...rest
}) => {
    return (
        <Box
            backgroundColor="rgba(0, 6, 22, 0.5)"
            py="16px"
            borderRadius="8px"
            {...(rest as any)}
        >
            {label ? (
                <LabelComponent
                    label={label}
                    labelHelp={labelHelp}
                    markerColor={markerColor}
                    variant={getSize(variant, 'label') as TTextVariant}
                    colorTitle={getColor(variant, 'label') as TColor}
                    align={align}
                >
                    <BalanceContent
                        mainContent={mainContent}
                        bottomContent={bottomContent}
                        rightContent={rightContent}
                        balance={balance}
                        ticker={ticker}
                        equivalent={equivalent}
                        variant={variant}
                        skeleton={skeleton}
                        iconUrl={iconUrl}
                        align={align}
                    />
                </LabelComponent>
            ) : (
                <BalanceContent
                    mainContent={mainContent}
                    bottomContent={bottomContent}
                    rightContent={rightContent}
                    balance={balance}
                    ticker={ticker}
                    equivalent={equivalent}
                    variant={variant}
                    skeleton={skeleton}
                    iconUrl={iconUrl}
                    align={align}
                />
            )}
        </Box>
    );
};

BalanceComponent.displayName = 'BalanceComponent';
