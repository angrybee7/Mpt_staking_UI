import { useEffect, useState } from 'react';

let touchstartX = 0;
let touchendX = 0;

let touchstartY = 0;
let touchendY = 0;

const SWIPE_THRESHOLD = 40;

const checkDirection = (): TSwipeDirection => {
    const xDiff = Math.abs(touchendX - touchstartX);
    const yDiff = Math.abs(touchendY - touchstartY);

    let _swipe: TSwipeDirection;

    const isRealSwipe = (): boolean => xDiff >= SWIPE_THRESHOLD || yDiff >= SWIPE_THRESHOLD;

    if (!isRealSwipe()) {
        return;
    }

    if (xDiff > yDiff) {
        if (touchendX < touchstartX) {
            _swipe = 'left';
        }
        if (touchendX > touchstartX) {
            _swipe = 'right';
        }
    } else if (yDiff > 0) {
        _swipe = 'down';
    } else {
        _swipe = 'up';
    }

    touchstartX = 0;
    touchendX = 0;

    touchstartY = 0;
    touchendY = 0;

    return _swipe;
};

export type TSwipeDirection = 'up' | 'down' | 'left' | 'right' | undefined;

export const useSwipe = (modalElement?: HTMLElement): {
    swipeDirection: TSwipeDirection;
    clearSwipe: () => void;
} => {
    const [swipeDirection, setSwipeDirection] = useState<TSwipeDirection>();

    const clearSwipe = (): void => {
        setSwipeDirection(undefined);
    };

    const onTouchStart = (e: TouchEvent): void => {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
    };

    const onTouchEnd = (e: TouchEvent): void => {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        setSwipeDirection(checkDirection());
    };

    useEffect(() => {
        if (modalElement) {
            modalElement.addEventListener('touchstart', onTouchStart);

            modalElement.addEventListener('touchend', onTouchEnd);
        }

        return () => {
            if (modalElement) {
                modalElement.removeEventListener('touchstart', onTouchStart);

                modalElement.removeEventListener('touchend', onTouchEnd);
            }
        };
    }, [modalElement]);

    return {
        swipeDirection,
        clearSwipe,
    };
};
