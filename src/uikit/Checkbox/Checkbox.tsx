import { FC } from 'react';
import { Checkbox as CheckboxKit, ICheckboxProps } from '@waves.exchange/wx-react-uikit';

export const Checkbox: FC<ICheckboxProps> = ({ children, controlBoxStyles, ...props}) => {

    return (
        <CheckboxKit
            controlBoxStyles={{
                baseStyles: {
                    ...controlBoxStyles.baseStyles,
                    'borderColor': props.isInvalid ? 'error' : '#0983F3 !important',
                    'opacity': props.isDisabled ? '0.5' : '1',
                    'width': '26px',
                    'height': '26px',
                    ':hover': {
                        opacity: 0.8,
                    },
                }
            }}
            {...props}
        >
            {children}
        </CheckboxKit>
    );
};

Checkbox.displayName = 'Checkbox';
