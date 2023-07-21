import { SkeletonSize, SkeletonTypes } from './types';

export const getSize = (type: SkeletonTypes, size?: SkeletonSize | null) => {
    const isIcon = type === 'icon';
    const isBox = type === 'box';
    switch (size) {
        case 'small':
            return isIcon ? '16px' : isBox ? '60px' : '10px';
        case 'large':
            return isIcon ? '30px' : isBox ? '100px' : '18px';
        case 'extraLarge':
            return isIcon ? '40px' : isBox ? '120px' : '22px';
        default:
            return isIcon ? '24px' : isBox ? '80px' : '14px';
    }
};
