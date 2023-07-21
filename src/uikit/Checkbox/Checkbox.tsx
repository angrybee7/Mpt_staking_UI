import { FC } from 'react';
import { Checkbox as CheckboxKit, ICheckboxProps } from '@waves.exchange/wx-react-uikit';

export const Checkbox: FC<ICheckboxProps> = ({ children, controlBoxStyles, ...props}) => {

    return (
        <CheckboxKit
            controlBoxStyles={{
                baseStyles: {
                    ...controlBoxStyles.baseStyles,
                    'backgroundColor': props.isChecked ? '#1F5AF6 !important' : 'transparent',
                    'borderColor': props.isChecked ? '#1F5AF6 !important' : (props.isInvalid ? 'textnegative' : '#E0E3E8 !important'),
                    'opacity': props.isDisabled ? '0.5' : '1',
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
