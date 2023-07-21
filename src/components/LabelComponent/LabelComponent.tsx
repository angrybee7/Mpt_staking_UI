import * as React from 'react';
import { Box, Flex, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { getAlign } from '../../components/BalanceComponent/helpers';
import { ITransProps, Trans } from '@waves/ui-translator';
import { Help } from '../../uikit/Help/Help';
import { TColor, Text, TTextVariant } from '../../uikit';

export type LabelComponentProps = {
    label: ITransProps;
    labelHelp?: ITransProps | (() => React.ReactElement);
    markerColor?: Readonly<string>;
    variant?: TTextVariant;
    align?: 'left' | 'center' | 'right';
    colorTitle?: TColor;
};

export const LabelComponent: React.FC<TFlexProps & LabelComponentProps> = ({
    label,
    labelHelp,
    markerColor,
    variant = 'text2',
    colorTitle = 'wdtextsec',
    align,
    children,
    ...rest
}) => {
    return (
        <Flex
            flexDirection="column"
            alignItems={[
                align ? getAlign(align) : 'center',
                null,
                null,
                getAlign(align),
            ]}
            {...rest as any}
        >
            <Flex alignItems="center" mb={children ? '6px' : '0'}>
                {markerColor ? (
                    <Box
                        width="6px"
                        height="6px"
                        borderRadius="50%"
                        backgroundColor={markerColor}
                        mr="6px"
                    />
                ) : null}
                <Text
                    as="div"
                    variant={variant}
                    color={colorTitle}
                    mr={labelHelp ? '6px' : '0'}
                    className="label_component"
                >
                    <Trans
                        i18key={label.i18key}
                        i18Params={label?.i18Params}
                        {...(label.ns ? { ns: label.ns } : null)}
                    />
                </Text>
                {labelHelp ? (
                    <Help>
                        {typeof labelHelp === 'function' ? (
                            labelHelp()
                        ) : (
                            <Box width="max-content" maxWidth="260px">
                                <Trans
                                    i18key={labelHelp.i18key}
                                    i18Params={labelHelp?.i18Params}
                                    {...(label.ns ? { ns: label.ns } : null)}
                                />
                            </Box>
                        )}
                    </Help>
                ) : null}
            </Flex>
            {children}
        </Flex>
    );
};

LabelComponent.displayName = 'LabelComponent';
