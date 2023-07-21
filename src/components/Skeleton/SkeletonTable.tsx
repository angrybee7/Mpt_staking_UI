import { BoxProps, Flex, Box } from '@waves.exchange/wx-react-uikit';
import * as React from 'react';
import { SkeletonSize } from './types';
import { SkeletonText } from './SkeletonText';

export const SkeletonTable: React.FC<
    { size: SkeletonSize; hasAnimation: boolean } & BoxProps
> = ({ size, hasAnimation = true, ...rest }) => {
    return (
        <Box width="100%">
            <Flex px="12px" height="48px" alignItems="center">
                <SkeletonText
                    size={size}
                    hasAnimation={hasAnimation}
                    maxWidth="100%"
                    {...rest}
                />
            </Flex>
            <Flex px="12px" height="48px" alignItems="center" opacity={0.4}>
                <SkeletonText
                    size={size}
                    hasAnimation={hasAnimation}
                    maxWidth="100%"
                    {...rest}
                />
            </Flex>
            <Flex px="12px" height="48px" alignItems="center" opacity={0.1}>
                <SkeletonText
                    size={size}
                    hasAnimation={hasAnimation}
                    maxWidth="100%"
                    {...rest}
                />
            </Flex>
        </Box>
    );
};

SkeletonTable.displayName = 'SkeletonTable';
