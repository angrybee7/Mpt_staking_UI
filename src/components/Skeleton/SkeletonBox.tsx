import * as React from 'react';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';
import { SkeletonSize } from './types';
import { getSize } from './helpers';

export const SkeletonBox: React.FC<
    { size: SkeletonSize; hasAnimation?: boolean } & BoxProps
> = ({ size, hasAnimation, ...rest }) => {
    return (
        <Box
            position="relative"
            overflow="hidden"
            width="100%"
            height={getSize('box', size)}
            borderRadius="6px"
            backgroundColor="#333842"
            className={hasAnimation ? 'skeleton-component-animation' : ''}
            {...rest as any}
        />
    );
};
