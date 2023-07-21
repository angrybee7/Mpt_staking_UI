import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { SkeletonProps } from './types';
import { GetSkeleton } from './GetSkeleton';

export const Skeleton: React.FC<SkeletonProps> = ({
    type,
    size = 'normal',
    skeletonConfig,
    hasAnimation = true,
    ...rest
}) => {
    if (type === 'composit') {
        return (
            <Flex width="100%" {...rest}>
                {skeletonConfig.map(
                    ({ type, size, skeletonConfig, ...rest }, i) => (
                        <Skeleton
                            key={`${type}${i}`}
                            type={type}
                            size={size}
                            skeletonConfig={skeletonConfig}
                            {...rest as any}
                        />
                    )
                )}
            </Flex>
        );
    }

    return (
        <GetSkeleton
            type={type}
            size={size}
            hasAnimation={hasAnimation}
            {...rest as any}
        />
    );
};

Skeleton.displayName = 'Skeleton';
