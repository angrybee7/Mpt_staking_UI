import * as React from 'react';
import {
    Box,
    BoxProps,
    Flex,
    FormattedInput as FormattedInputKit,
    InputWithTagProps,
    Text
} from '@waves.exchange/wx-react-uikit';
import { SerifWrapper } from '../../components/SerifWrapper/SerifWrapper';
import { Trans } from '@waves/ui-translator';

export type TPreset = number | 'max';

type FormattedInputProps = InputWithTagProps & BoxProps & {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    formatSeparator: string;
    iconUrl: string;
    decimals: number;
    prefix?: string;
    lengthLimit?: number;
    maxValue?: number;
    presets?: Array<TPreset>;
    onPresetClick?: (preset: TPreset) => void;
};

export const FormattedInput: React.FC<FormattedInputProps> = (props) => {
    const [focus, setFocus] = React.useState(false);
    const {
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
        width,
        maxWidth,
        iconUrl,
        presets = [25, 50, 'max'],
        onPresetClick,
        ...rest
    } = props;

    const onFocus = React.useCallback(() => {
        setFocus(true);
    }, []);

    const onBlur = React.useCallback(() => {
        setFocus(false);
    }, []);

    const wrapperVariant = React.useMemo(() => {
        return props['aria-invalid'] ? 'error' : focus ? 'primary' : 'default';
    }, [props, focus]);

    return (
        <SerifWrapper
            sx={{ mx, my, mt, mr, mb, ml, width, maxWidth, position: 'relative' } as any}
            variant={wrapperVariant}
            backgroundColor="#FFFFFF"
        >
            <FormattedInputKit
                backgroundColor="transparent !important"
                border="none"
                height="72px !important"
                pr={`${typeof onPresetClick === 'function' ? '56px' : '0'} !important`}
                pl="68px !important"
                pt="32px !important"
                fontFamily="Sfmono"
                onFocus={onFocus}
                onBlur={onBlur}
                sx={{
                    '&:focus:not(:disabled)': {
                        backgroundColor: '#EBF5FF !important',
                    }
                }}
                {...rest as any}
                tag={null}
            />
            <Box
                width="32px"
                height="32px"
                backgroundImage={`url(${iconUrl})`}
                backgroundRepeat="no-repeat"
                backgroundSize="100% 100%"
                backgroundPosition="center center"
                position="absolute"
                top="50%"
                left="24px"
                sx={{
                    transform: 'translateY(-50%)'
                }}
            />
            <Text
                position="absolute"
                top="14px"
                left="68px"
                fontSize="12px"
                lineHeight="16px"
                color={props['aria-invalid'] ? 'error' : '#1E1E1E'}
            >
                <Trans i18key="enterAmount" />
            </Text>
            {typeof onPresetClick === 'function' ?
                <Flex
                    flexDirection="row"
                    position="absolute"
                    top="50%"
                    right="24px"
                >
                    {
                        presets.map((preset) => {
                            const formattedPreset = preset === 'max' ? 'max' : `${preset}%`;
                            return (
                                <Text
                                    key={formattedPreset}
                                    onClick={() => onPresetClick(preset)}
                                    display={
                                        preset === 'max' ?
                                            'unset' :
                                            ['none', 'unset']
                                    }
                                    color="#1E1E1E"
                                    fontSize="18px"
                                    lineHeight="26px"
                                    fontWeight={300}
                                    fontFamily="Sfmono-light"
                                    cursor="pointer"
                                    ml={8}
                                    sx={{
                                        transform: 'translateY(-50%)',
                                        '&:hover': {
                                            opacity: 0.8
                                        }
                                    }}
                                >
                                    <Trans i18key={`{${formattedPreset}}`} />
                                </Text>
                            )
                        })
                    }
                </Flex> :
                null
            }
        </SerifWrapper>
    );
};

FormattedInput.displayName = 'FormattedInput';
