import * as React from 'react';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';
import { SkeletonSize } from './types';
import { getSize } from './helpers';

export const SkeletonIcon: React.FC<
    { size: SkeletonSize; hasAnimation?: boolean } & BoxProps
> = ({ size, hasAnimation, ...rest }) => {
    return (
        <Box
            width={getSize('icon', size)}
            height={getSize('icon', size)}
            borderRadius="50%"
            backgroundColor="#333842"
            position="relative"
            overflow="hidden"
            className={hasAnimation ? 'skeleton-component-animation' : ''}
            {...rest as any}
        />
    );
};

SkeletonIcon.displayName = 'SkeletonIcon';
