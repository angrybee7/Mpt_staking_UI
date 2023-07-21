import * as React from 'react';
import { PlateNote, TPlateNote, Text } from '@waves.exchange/wx-react-uikit';
import { ITransProps, Trans } from '@waves/ui-translator';

type TMessageProps = {
    transProps?: ITransProps;
    type?: 'info' | 'warning' | 'error';
    isShow?: boolean;
} & TPlateNote;

const MessageFC: React.FC<TMessageProps> = ({
    transProps,
    type = 'error',
    isShow = true,
    children,
    ...rest
}) => {
    const color = React.useMemo(() => {
        switch (type) {
            case 'error':
                return 'wdred';
            case 'warning':
                return 'wdwarning';
            default:
                return 'wdtextsec';
        }
    }, [type]);

    if (!isShow) {
        return null;
    }

    return (
        <PlateNote
            type={type}
            borderColor="transparent"
            bg="rgba(246, 31, 31, 0.6)"
            {...rest}
        >
            <Text color={color} variant="body2">
                {transProps ? <Trans {...transProps} /> : null}
                {children}
            </Text>
        </PlateNote>
    );
};

MessageFC.displayName = 'ErrorPlate';
export const Message = React.memo(MessageFC);
