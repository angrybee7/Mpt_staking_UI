import * as React from 'react';
import { AuthTemplate, AuthTemplateProps } from '../../components/AuthTemplate';
import { getKeeperWalletDeviceName } from '../../../../utils/helpersInformationDevices';

interface KeeperConnectionRejectedProps {
    onRetry: AuthTemplateProps['onRetry'];
}

export const KeeperConnectionRejected: React.FC<
    KeeperConnectionRejectedProps
> = ({ onRetry }) => {
    return (
        <AuthTemplate
            device={getKeeperWalletDeviceName()}
            title={{
                i18key: 'connectionRejected.title',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            text={{
                i18key: 'connectionRejected.desc',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            onRetry={onRetry}
            variant='error'
        />
    );
};

KeeperConnectionRejected.displayName = 'KeeperConnectionRejected';
