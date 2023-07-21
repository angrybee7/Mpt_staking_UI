import { TFlexProps } from '@waves.exchange/wx-react-uikit';

export type SkeletonTypes = 'text' | 'icon' | 'table' | 'box' | 'composit';

export type SkeletonSize = 'small' | 'large' | 'extraLarge' | 'normal';

export type SkeletonConfig = TFlexProps & {
    type: SkeletonTypes;
    size?: SkeletonSize | null;
    skeletonConfig?: Array<SkeletonConfig>;
    hasAnimation?: boolean;
};

export type SkeletonProps = SkeletonConfig & TFlexProps;
