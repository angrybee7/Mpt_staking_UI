import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { Box } from '@waves.exchange/wx-react-uikit';
import { ModalStyled, TModalStyledVariant } from '../../Modal/ModalStyled';
import { AuthTemplate, AuthTemplateProps } from '../components/AuthTemplate';
import { AUTH_DEVICE_STATES } from '../../../hooks/useAuth.ts';
import { translate } from '@waves/ui-translator';
import { getMetamaskDeviceName } from '../../../utils/helpersInformationDevices';

export interface MetamaskAuthModalProps {
    modalState: AUTH_DEVICE_STATES;
    onRetry?: AuthTemplateProps['onRetry'];
}

function getModalStateVariant(modalState: AUTH_DEVICE_STATES): TModalStyledVariant {
    switch (modalState) {
        case AUTH_DEVICE_STATES.notInstalled:
        case AUTH_DEVICE_STATES.connectionRejected:
            return 'error';
        default:
            return 'default';
    }
}

const MetamaskAuthModalFC: React.FC<MetamaskAuthModalProps & ModalProps> = ({
    onRetry,
    modalState,
    willClose,
    willOpen,
}) => {
    return (
        <ModalStyled
            modalName={MODAL_NAMES.metamaskAuth}
            willClose={willClose}
            willOpen={willOpen}
            sx={{
                '& > div': {
                    backgroundPosition: 'bottom',
                    backgroundSize: 'cover',
                },
            }}
            stateVariant={getModalStateVariant(modalState)}
        >
            {(() => {
                switch (modalState) {
                    case AUTH_DEVICE_STATES.notInstalled:
                        return <AuthTemplate
                            device={getMetamaskDeviceName()}
                            title={{
                                i18key: 'connectionFailed.title',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            text={{
                                i18key: 'connectionFailed.descMetaMask',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            onRetry={onRetry}
                            isShowRetry={false}
                            variant="error"
                        />;
                    case AUTH_DEVICE_STATES.approveConnection:
                        return <AuthTemplate
                            device={getMetamaskDeviceName()}
                            title={{
                                i18key: 'approveConnection.title',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            text={{
                                i18key: 'approveConnection.desc',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            onRetry={onRetry}
                        />;
                    case AUTH_DEVICE_STATES.signCustom:
                        return <AuthTemplate
                            device={getMetamaskDeviceName()}
                            title={{ i18key: 'signCustomData.title' }}
                            text={{
                                i18key: 'signCustomData.desc',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            onRetry={onRetry}
                        />;
                    case AUTH_DEVICE_STATES.switchNetwork:
                        return <AuthTemplate
                            device={getMetamaskDeviceName()}
                            title={{
                                i18key: 'switchNetwork.title',
                                i18Params: { network: 'Waves' },
                            }}
                            text={{
                                i18key: 'switchNetwork.desc',
                                i18Params: {
                                    network: 'Waves',
                                    device: getMetamaskDeviceName(),
                                },
                            }}
                            onRetry={onRetry}
                        />;
                    case AUTH_DEVICE_STATES.connectionRejected:
                        return <AuthTemplate
                            device={getMetamaskDeviceName()}
                            title={{
                                i18key: 'connectionRejected.title',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            text={{
                                i18key: 'connectionRejected.desc',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            onRetry={onRetry}
                            variant="error"
                        />;
                    default:
                        return <Box>something went wrong</Box>;
                }
            })()}
        </ModalStyled>
    );
};

MetamaskAuthModalFC.displayName = 'MetamaskAuthModalFC';

export const MetamaskAuthModal = translate('app.page')(MetamaskAuthModalFC);
