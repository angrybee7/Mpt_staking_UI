import * as React from 'react';
import { Flex, TFlexProps, Text } from '@waves.exchange/wx-react-uikit';

interface IProps {
    onClick: (value: number | 'max') => void;
    presets?: Array<number | 'max'>;
    isDisabled?: boolean;
    isPercent?: boolean;
}

export const SetAmountButtons: React.FC<
    IProps & Omit<TFlexProps, 'onClick'>
> = ({
    onClick,
    presets = [100, 500, 'max'],
    isDisabled,
    isPercent,
    ...rest
}) => {
    return (
        <Flex
            color="wdtextsec"
            alignItems="flex-end"
            transition="0.3s"
            {...rest}
        >
            {presets.map((preset, i) => (
                <Text
                    key={preset}
                    variant="caption"
                    cursor={isDisabled ? 'default' : 'pointer'}
                    mx={i === 1 ? '12px' : 0}
                    sx={
                        isDisabled
                            ? {}
                            : {
                                'textTransform': 'uppercase',
                                ':hover': { color: 'standard.$0' },
                            }
                    }
                    onClick={(): void => (isDisabled ? null : onClick(preset))}
                >
                    {typeof preset === 'string'
                        ? preset.toUpperCase()
                        : `${preset}${isPercent ? '%' : ''}`}
                </Text>
            ))}
        </Flex>
    );
};

SetAmountButtons.displayName = 'SetAmountButtons';
