import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { getAlign, getColor, getSize } from './helpers';
import { WithSkeleton } from '../../components/WithSkeleton';
import { BalanceSimple, BalanceSimpleProps } from './BalanceSimple';
import { BalanceIcon } from './BalanceIcon';
import { TColor, TTextVariant, Text } from '../../uikit';

export type TBalanceContentSize = 'medium';
export type BalanceContentProps = BalanceSimpleProps & {
    equivalent?: string;
    align?: 'left' | 'center' | 'right';
    mainContent?: (props) => React.ReactElement;
    bottomContent?: (props) => React.ReactElement;
    rightContent?: (props) => React.ReactElement;
};

export const BalanceContent: React.FC<BalanceContentProps> = ({
    iconUrl,
    balance,
    ticker,
    equivalent,
    variant: variantsArray,
    skeleton = { pending: false, type: 'text' },
    align = 'left',
    mainContent,
    bottomContent,
    rightContent,
}) => {
    return (
        <Flex
            flexDirection="column"
            alignItems={['center', null, null, getAlign(align)]}
        >
            <Flex
                data-testid="balance-content-component"
                mb={bottomContent ? '6px' : '0'}
                alignItems="center"
            >
                {mainContent ? (
                    <>
                        <BalanceIcon
                            iconUrl={iconUrl}
                            variantsArray={variantsArray}
                        />
                        <WithSkeleton width="70px" {...skeleton}>
                            {mainContent({
                                variant: getSize(variantsArray, 'balance'),
                                color: getColor(variantsArray, 'balance'),
                            })}
                        </WithSkeleton>
                    </>
                ) : (
                    <BalanceSimple
                        iconUrl={iconUrl}
                        skeleton={skeleton}
                        balance={balance}
                        ticker={ticker}
                        variant={variantsArray}
                    />
                )}
                {rightContent ? (
                    rightContent({
                        variant: getSize(variantsArray, 'equivalent'),
                        color: getColor(variantsArray, 'equivalent'),
                        ml: '4px',
                    })
                ) : equivalent ? (
                    <Text
                        as="div"
                        variant={getSize(variantsArray, 'equivalent') as TTextVariant}
                        color={getColor(variantsArray, 'equivalent') as TColor}
                        ml="4px"
                    >
                        {equivalent}
                    </Text>
                ) : null}
            </Flex>
            {bottomContent &&
                bottomContent({
                    variant: 'text2',
                    color: 'wdtextsec',
                })}
        </Flex>
    );
};

BalanceContent.displayName = 'BalanceContent';
