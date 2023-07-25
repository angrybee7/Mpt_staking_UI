import * as React from 'react';
import { AuthTemplate, AuthTemplateProps } from '../../components/AuthTemplate';
import { getKeeperWalletDeviceName } from '../../../../utils/helpersInformationDevices';

interface KeeperNoLoginProps {
    onRetry: AuthTemplateProps['onRetry'];
}

export const KeeperNoLogin: React.FC<KeeperNoLoginProps> = ({ onRetry }) => {
    return (
        <AuthTemplate
            device={getKeeperWalletDeviceName()}
            title={{
                i18key: 'accountOrCreateNew.title',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            text={{
                i18key: 'accountOrCreateNew.desc',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            onRetry={onRetry}
        />
    );
};

KeeperNoLogin.displayName = 'KeeperNoLogin';
