import { TBalanceContentSize } from './BalanceContent';

export const getAlign = (align: 'left' | 'center' | 'right'): string => {
    switch (align) {
        case 'center':
            return 'center';
        case 'right':
            return 'flex-end';
        default:
            return 'flex-start';
    }
};

const stylesByVariant: Record<TBalanceContentSize, any> = {
    medium: {
        iconSize: '24px',
        label: { size: 'text2', color: 'wdtextsec' },
        balance: { size: 'text1', color: 'text' },
        ticker: { size: 'text1', color: 'wdtextsec' },
        equivalent: { size: 'text1', color: 'wdtextsec' },
        labelVariant: 'text2',
    },
};

export const getSize = (
    variantsArray: Array<TBalanceContentSize>,
    element: string
): Array<string> => {
    if (variantsArray.length === 1) {
        return stylesByVariant[variantsArray[0]][element].size;
    }
    return variantsArray.map((variant, i) => {
        const newSize = stylesByVariant[variant][element].size;
        if (i === 0) {
            return newSize;
        }
        const prevBreakpointSize =
            stylesByVariant[variantsArray[i - 1]][element].size;
        if (prevBreakpointSize === newSize) {
            return null;
        }

        return newSize;
    });
};

export const getColor = (
    variantsArray: Array<TBalanceContentSize>,
    element: string
): Array<string> => {
    return stylesByVariant[variantsArray[0]][element].color;
};

export const getIconSize = (
    variantsArray: Array<TBalanceContentSize>
): Array<string> => {
    if (variantsArray.length === 1) {
        return stylesByVariant[variantsArray[0]].iconSize;
    }
    return variantsArray.map((variant, i) => {
        const newIconSize = stylesByVariant[variant].iconSize;
        if (i === 0) {
            return newIconSize;
        }
        const prevBreakpointIconSize =
            stylesByVariant[variantsArray[i - 1]].iconSize;
        if (prevBreakpointIconSize === newIconSize) {
            return null;
        }

        return newIconSize;
    });
};
