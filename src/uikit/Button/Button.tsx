import {
    Box,
    BoxAsElement,
    BoxProps,
} from '@waves.exchange/wx-react-uikit';
import { sizes, variants } from './styles';
import { ButtonHTMLAttributes, ReactNode, FC } from 'react';
import styled from '@emotion/styled';
import { variant } from 'styled-system';
import { SerifWrapper } from '../../components/SerifWrapper/SerifWrapper';

export type TVariant = keyof typeof variants;
export type TVariantSize = keyof typeof sizes;

type ButtonSpecificProps = {
	children: ReactNode
    variant?: TVariant;
    variantSize?: TVariantSize;
};

export type TButtonProps = BoxProps<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement>
	> &
	ButtonSpecificProps;

export const ButtonFC = styled(Box as unknown as BoxAsElement<'button', TButtonProps>)(
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

export const Button: FC<TButtonProps> = ({ children, ...props }) => {
    const { mx, my, mt, mr, mb, ml, width, maxWidth, disabled, ...rest } = props;
    return (
        <SerifWrapper
            sx={{ mx, my, mt, mr, mb, ml, width, maxWidth } as any}
            variant={'primary'}
            disabled={disabled}
        >
            <ButtonFC
                {...rest}
                disabled={disabled}
                width="100%"
                fontFamily="Sfmono"
            >
                {children}
            </ButtonFC>
        </SerifWrapper>
    );
};

Button.displayName = 'Button';

ButtonFC.defaultProps = {
    as: 'button',
    type: 'button',
    border: 0,
    transition: 'default',
    fontWeight: 500,
    variant: 'primary',
    variantSize: 'default',
};

