import * as React from 'react';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';
import { ITransProps } from '@waves/ui-translator';
import { toArray } from '../../utils';
import { ErrorMessage } from 'uikit';

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
                    return (
                        <ErrorMessage
                            key={error.i18key}
                            width="100%"
                            transProps={error}
                            mb={16}
                        />
                    );
                })}
        </Box>
    );
};

MultiErrorComponent.displayName = 'MultiErrorComponent';
