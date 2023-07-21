import * as React from 'react';
import { useSwipe } from './useSwipe';
import { Box } from '@waves.exchange/wx-react-uikit';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useClicks } from './useClicks';
import { useEscape } from './useEsc';
import { MODAL_NAMES } from '../ModalContainer/MODAL_NAMES';
import { modalManager } from '../../services/modalManager';

type TVariant = 'large' | 'small';

export interface ModalProps {
    modalName: keyof typeof MODAL_NAMES;
    willOpen: boolean;
    willClose: boolean;
    children: React.ReactNode;
    variant?: TVariant;
    hasClickOut?: boolean;
    hasESCOut?: boolean;
    hideBg?: boolean;
    fadeLength?: number;
}

const bgStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
};

function getWidth(variant: TVariant, isMobile: boolean): string {
    if (isMobile) {
        return '100%';
    }
    switch (variant) {
        case 'large':
            return '840px';
        case 'small':
        default:
            return '460px';
    }
}

const getModalStyles = (isMobile: boolean, isVisible: boolean): Record<any, any> => {
    if (isMobile) {
        return {
            transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        };
    }
    return {
        opacity: isVisible ? 1 : 0,
    };
};

export const Modal: React.FC<ModalProps> = ({
    modalName,
    hasClickOut = true,
    hasESCOut = true,
    hideBg,
    willClose,
    willOpen,
    variant = 'small',
    children,
    fadeLength = 200,
    ...rest
}) => {
    const isMobile = useMediaQuery('screen and (max-width: 1280px)');
    const [overlayColor, setOverlayColor] = React.useState('rgb(67, 73, 95, 0.3)');
    const [isVisible, setIsVisible] = React.useState(false);
    const modalRef = React.useRef<HTMLElement>();

    const width = getWidth(variant, isMobile);
    const modalStyles = getModalStyles(isMobile, isVisible);

    const { onMouseUp, onMouseDown } = useClicks(hasClickOut, modalName);
    useEscape(hasESCOut, modalName);

    const { swipeDirection, clearSwipe } = useSwipe(modalRef.current);

    React.useEffect(() => {
        if (document.querySelectorAll('[target="_back_"]').length > 1) {
            setOverlayColor('transparent');
        }
    }, []);

    React.useEffect(() => {
        if (willClose) {
            setIsVisible(false);
        }
    }, [willClose]);

    React.useEffect(() => {
        setTimeout(() => {
            if (willOpen) {
                setIsVisible(true);
            }
        }, 1);
    }, [willOpen]);

    React.useEffect(() => {
        if (swipeDirection === 'down') {
            modalManager.closeModal(modalName, 'abort');
        }
        clearSwipe();
    }, [swipeDirection, clearSwipe]);

    return (
        <Box
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /*
            // @ts-ignore */
            target="_back_"
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            sx={{
                ...bgStyle,
                backgroundColor: hideBg ? 'rgba(0,0,0,0)' : overlayColor,
                userSelect: isVisible ? 'auto' : 'none',
                transition: `${fadeLength}ms`,
                backdropFilter: 'blur(10px)'
            } as any}
            opacity={isVisible ? 1 : 0}
        >
            <Box
                ref={modalRef}
                position={['absolute', 'unset']}
                bottom={[0, 'unset']}
                width={width}
                maxHeight={['calc(100% - 60px)', 'calc(100% - 60px)', 'calc(100% - 60px)', '90%']}
                maxWidth={['100%', '100%', '100%', '100%', '80%']}
                mx="auto"
                borderBottomLeftRadius={[null, '20px']}
                borderBottomRightRadius={[null, '20px']}
                borderTopRightRadius={20}
                borderTopLeftRadius={20}
                overflow="auto"
                bg={'#1841bd'}
                sx={{
                    transition: `${fadeLength}ms`,
                    ...modalStyles,
                }}
                {...(rest as any)}
            >
                {children}
            </Box>
        </Box>
    );
};

Modal.displayName = 'WxModal';

