import * as React from 'react';
import { SkeletonProps } from '../Skeleton/types';
import { Skeleton } from '../Skeleton';

export const WithSkeleton: React.FC<{ pending: boolean } & SkeletonProps> = ({
    pending,
    children,
    ...rest
}) => <>{pending ? <Skeleton {...rest} /> : children}</>;

/* eslint-disable max-len */
export const withSkeleton =
    (skeletonConfig: SkeletonProps) =>
    (Component) =>
    ({
        pending,
        children,
        ...props
    }: { pending: boolean; children: any } & any) =>
        (
            <WithSkeleton pending={pending} {...skeletonConfig}>
                <Component {...props}>{children}</Component>
            </WithSkeleton>
        );
