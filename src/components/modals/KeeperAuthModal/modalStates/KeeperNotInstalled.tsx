import * as React from 'react';
import { AuthTemplate, AuthTemplateProps } from '../../components/AuthTemplate';
import { keeperCalm } from './icons';
import { getKeeperWalletDeviceName } from '../../../../utils/helpersInformationDevices';

interface KeeperNotInstalledProps {
    onRetry: AuthTemplateProps['onRetry'];
}

export const KeeperNotInstalled: React.FC<KeeperNotInstalledProps> = ({
    onRetry,
}) => {
    return (
        <AuthTemplate
            icon={keeperCalm}
            title={{
                i18key: 'connectionFailed.title',
            }}
            text={{
                i18key: 'connectionFailed.descKeeperWallet',
            }}
            onRetry={onRetry}
            isShowRetry={false}
            device={getKeeperWalletDeviceName()}
        />
    );
};

KeeperNotInstalled.displayName = 'KeeperNotInstalled';
