import {
    Box,
    BoxAsElement,
    BoxProps,
} from '@waves.exchange/wx-react-uikit';
import { sizes, variants } from './styles';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';
import { variant } from 'styled-system';

export type TVariant = keyof typeof variants;

type ButtonSpecificProps = {
	variant?: TVariant;
	children: ReactNode
};

export type TButtonProps = BoxProps<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement>
	> &
	ButtonSpecificProps;

export const Button = styled(Box as unknown as BoxAsElement<'button', TButtonProps>)(
    {
        'cursor': 'pointer',
        ':disabled': {
            cursor: 'not-allowed',
        },
    },
    variant({
        prop: 'variant',
        variants,
    }),
    variant({
        prop: 'variantSize',
        variants: sizes,
    })
);

Button.defaultProps = {
    as: 'button',
    type: 'button',
    border: 0,
    borderRadius: '44px',
    transition: 'default',
    fontWeight: 500,
    variant: 'primary',
    variantSize: 'default',
};

