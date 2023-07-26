import { FC } from 'react';
import {
    Text as TextKit,
    TTextProps as TextPropsKit,
} from '@waves.exchange/wx-react-uikit';
import { ResponsiveValue } from 'styled-system';

const variants = {
    heading1: {
        fontSize: '48px',
        lineHeight: '68px',
        fontWeight: '800',
    },
    heading2: {
        fontSize: '28px',
        lineHeight: '32px',
        fontWeight: '500',
    },
    heading3: {
        fontSize: '18px',
        lineHeight: '25px',
        fontWeight: '500',
    },
    heading4: {
        fontSize: '15px',
        lineHeight: '20px',
        fontWeight: '500',
    },
    text1: {
        fontSize: '13px',
        lineHeight: '18px',
        fontWeight: '500',
        fontFamily: 'Sfmono-light'
    },
    text2: {
        fontSize: '12px',
        lineHeight: '17px',
        fontWeight: '400',
    },
};

export type TTextVariant =
    | keyof typeof variants
    | (Array<keyof typeof variants | undefined | null> & 'heading1')
    | 'heading2'
    | 'heading4'
    | 'text1'
    | 'text2';

export type TextProps = TextPropsKit & { variant?: keyof typeof variants };
export type TColor = string & ResponsiveValue<string>;

export const Text: FC<TextProps> = ({ children, variant, ...props }) => {
    return (
        <TextKit {...variants[variant]} {...props}>
            {children}
        </TextKit>
    );
};

Text.displayName = 'Text';
