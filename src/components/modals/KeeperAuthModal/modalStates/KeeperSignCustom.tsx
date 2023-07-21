import * as React from 'react';
import { AuthTemplate, AuthTemplateProps } from '../../components/AuthTemplate';
import { keeperCalm } from './icons';
import { getKeeperWalletDeviceName } from '../../../../utils/helpersInformationDevices';

interface KeeperSignCustomProps {
    onRetry: AuthTemplateProps['onRetry'];
}

export const KeeperSignCustom: React.FC<KeeperSignCustomProps> = ({
    onRetry,
}) => {
    return (
        <AuthTemplate
            icon={keeperCalm}
            title={{
                i18key: 'signCustomData.title',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            text={{
                i18key: 'signCustomData.desc',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            onRetry={onRetry}
        />
    );
};

KeeperSignCustom.displayName = 'KeeperSignCustom';
