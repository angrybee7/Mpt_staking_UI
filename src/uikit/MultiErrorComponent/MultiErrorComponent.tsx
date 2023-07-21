import * as React from 'react';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';
import { FeeError } from '../FeeError/FeeError';
import { Message } from '../Message/Message';
import { ITransProps } from '@waves/ui-translator';
import { toArray } from '../../utils';

type MultiErrorComponentProps = BoxProps & {
    activeErrors: ITransProps[] | ITransProps;
};

export const MultiErrorComponent: React.FC<MultiErrorComponentProps> = ({
    activeErrors,
    ...rest
}) => {
    return (
        <Box width="100%" {...rest as any}>
            {activeErrors &&
                toArray(activeErrors).map((error) => {
                    if (error.i18key === 'noEnoughFee') {
                        return (
                            <FeeError
                                key={error.i18key}
                                width="100%"
                                mb={['16px', '16px', '24px']}
                            />
                        );
                    } else {
                        return (
                            <Message
                                key={error.i18key}
                                width="100%"
                                transProps={error}
                                mb={['16px', '16px', '24px']}
                            />
                        );
                    }
                })}
        </Box>
    );
};

MultiErrorComponent.displayName = 'MultiErrorComponent';
