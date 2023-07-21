import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { Box } from '@waves.exchange/wx-react-uikit';
import { ModalStyled } from '../../Modal/ModalStyled';
import { AuthTemplate, AuthTemplateProps } from '../components/AuthTemplate';
import { AUTH_DEVICE_STATES } from '../AuthModal/hooks/useAuth';
import { translate } from '@waves/ui-translator';
import { metamaskCalm, metamaskRed } from './icons';
import { getMetamaskDeviceName } from '../../../utils/helpersInformationDevices';

export interface MetamaskAuthModalProps {
    modalState: AUTH_DEVICE_STATES;
    onRetry?: AuthTemplateProps['onRetry'];
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
        >
            {(() => {
                switch (modalState) {
                    case AUTH_DEVICE_STATES.notInstalled:
                        return <AuthTemplate
                            icon={metamaskRed}
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
                            device={getMetamaskDeviceName()}
                        />;
                    case AUTH_DEVICE_STATES.approveConnection:
                        return <AuthTemplate
                            icon={metamaskCalm}
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
                            icon={metamaskCalm}
                            title={{ i18key: 'signCustomData.title' }}
                            text={{
                                i18key: 'signCustomData.desc',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            onRetry={onRetry}
                        />;
                    case AUTH_DEVICE_STATES.switchNetwork:
                        return <AuthTemplate
                            icon={metamaskCalm}
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
                            icon={metamaskRed}
                            title={{
                                i18key: 'connectionRejected.title',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            text={{
                                i18key: 'connectionRejected.desc',
                                i18Params: { device: getMetamaskDeviceName() },
                            }}
                            onRetry={onRetry}
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
