import * as React from 'react';
import { Text } from '@waves.exchange/wx-react-uikit';
import BigNumber from '@waves/bignumber';
import { Trans } from '@waves/ui-translator';

type TInputErrorState =
    'notEnoughFunds' |
    'minAmount' |
    'required' |
    'invalidAddress';
export type InputErrorsProps = {
    minAmount?: BigNumber;
    error?: TInputErrorState;
    assetName?: string;
};

export const InputErrors: React.FC<InputErrorsProps> = React.memo(
    ({ error, minAmount, assetName }) => {
        return (
            <>
                <Text
                    variant="caption"
                    color="error"
                    display="block"
                    sx={error ? { mt: '8px' } : null}
                >
                    {error === 'minAmount' && minAmount
                        ? (
                            <Trans
                                i18key="error.min"
                                i18Params={{
                                    amount: minAmount?.toFormat(),
                                    assetName,
                                }}
                            />
                        )
                        : null
                    }
                    {error === 'notEnoughFunds'
                        ? (
                            <Trans i18key="error.unsufficient" />
                        )
                        : null
                    }
                    {error === 'required'
                        ? (
                            <Trans i18key="error.required" />
                        )
                        : null
                    }
                    {error === 'invalidAddress'
                        ? (
                            <Trans i18key="error.invalidAddress" />
                        )
                        : null
                    }
                </Text>
            </>
        );
    }
);

InputErrors.displayName = 'InputErrors';
