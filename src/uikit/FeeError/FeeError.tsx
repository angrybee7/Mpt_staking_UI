import * as React from 'react';
import { PlateNote, TPlateNote, Text } from '@waves.exchange/wx-react-uikit';
import { ITransProps, Trans } from '@waves/ui-translator';

interface IFeeError {
    transProps?: ITransProps;
}

export const FeeError: React.FC<IFeeError & TPlateNote> = ({
    transProps = {},
    ...rest
}) => {
    return (
        <PlateNote
            type="error"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            borderColor='transparent'
            bg='rgba(246, 31, 31, 0.6)'
            borderRadius='8px'
            sx={{
                '& > span': {
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                },
                ...((rest && rest.sx ? rest.sx : {}) as Record<string, any>),
            }}
            {...rest}
        >
            <Text color="wdred">
                <Trans i18key="havenotfee" {...transProps} />
            </Text>
        </PlateNote>
    );
};

FeeError.displayName = 'FeeError';
