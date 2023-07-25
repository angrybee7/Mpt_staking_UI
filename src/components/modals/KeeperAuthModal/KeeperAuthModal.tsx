import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { Box } from '@waves.exchange/wx-react-uikit';
import { ModalStyled, TModalStyledVariant } from '../../Modal/ModalStyled';
import { KeeperSignCustom } from './modalStates/KeeperSignCustom';
import { KeeperSwitchNetwork } from './modalStates/KeeperSwitchNetwork';
import { KeeperConnectionRejected } from './modalStates/KeeperConnectionRejected';
import { KeeperNoAccounts } from './modalStates/KeeperNoAccounts';
import { KeeperNoLogin } from './modalStates/KeeperNoLogin';
import { KeeperNotInstalled } from './modalStates/KeeperNotInstalled';
import { AuthTemplateProps } from '../components/AuthTemplate';
import { AUTH_DEVICE_STATES } from '../../../hooks/useAuth.ts';
import { translate } from '@waves/ui-translator';

export interface KeeperAuthModalProps {
    modalState: AUTH_DEVICE_STATES;
    onRetry?: AuthTemplateProps['onRetry'];
}

function getModalStateVariant(modalState: AUTH_DEVICE_STATES): TModalStyledVariant {
    switch (modalState) {
        case AUTH_DEVICE_STATES.notInstalled:
        case AUTH_DEVICE_STATES.connectionRejected:
        case AUTH_DEVICE_STATES.noAccounts:
            return 'error';
        default:
            return 'default';
    }
}

const KeeperAuthModalFC: React.FC<KeeperAuthModalProps & ModalProps> = ({
    onRetry,
    modalState,
    willClose,
    willOpen,
}) => {
    return (
        <ModalStyled
            modalName={MODAL_NAMES.keeperAuth}
            willClose={willClose}
            willOpen={willOpen}
            stateVariant={getModalStateVariant(modalState)}
        >
            {(() => {
                switch (modalState) {
                    case AUTH_DEVICE_STATES.notInstalled:
                        return <KeeperNotInstalled onRetry={onRetry} />;
                    case AUTH_DEVICE_STATES.signCustom:
                        return <KeeperSignCustom onRetry={onRetry} />;
                    case AUTH_DEVICE_STATES.switchNetwork:
                        return <KeeperSwitchNetwork onRetry={onRetry} />;
                    case AUTH_DEVICE_STATES.connectionRejected:
                        return <KeeperConnectionRejected onRetry={onRetry} />;
                    case AUTH_DEVICE_STATES.noAccounts:
                        return <KeeperNoAccounts onRetry={onRetry} />;
                    case AUTH_DEVICE_STATES.noLogin:
                        return <KeeperNoLogin onRetry={onRetry} />;
                    default:
                        return <Box>something went wrong</Box>;
                }
            })()}
        </ModalStyled>
    );
};

KeeperAuthModalFC.displayName = 'KeeperAuthModalFC';

export const KeeperAuthModal = translate('app.page')(KeeperAuthModalFC);
