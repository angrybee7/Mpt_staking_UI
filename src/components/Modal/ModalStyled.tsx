import * as React from 'react';
import { Modal, ModalProps } from './Modal';
import { Box, Icon, BoxProps } from '@waves.exchange/wx-react-uikit';
import { modalManager } from '../../services/modalManager';
import { SerifWrapper } from '../SerifWrapper/SerifWrapper.tsx';
import { iconClose } from '../../img/icons/iconClose.tsx';

export type TModalStyledVariant = 'default' | 'error';
type TModalStyled = ModalProps & BoxProps & { stateVariant?: TModalStyledVariant }

export const ModalStyled: React.FC<TModalStyled> = ({
    children,
    stateVariant = 'default',
    ...props
}) => {
    return (
        <Modal {...props}>
            <Box
                p={21}
                backgroundSize="contain"
                backgroundColor="bg"
                backgroundRepeat="no-repeat"
            >
                <SerifWrapper
                    variant={stateVariant as TModalStyledVariant}
                    px={26}
                >
                    <Icon
                        cursor="pointer"
                        icon={iconClose}
                        size={18}
                        sx={{ float: 'right' }}
                        onClick={() =>
                            modalManager.closeModal(props.modalName, 'close')
                        }
                    />
                    <Box>{children}</Box>
                </SerifWrapper>
            </Box>
        </Modal>
    );
};

ModalStyled.displayName = 'ModalStyled';
