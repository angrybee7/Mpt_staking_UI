import * as React from 'react';
import { AuthTemplate, AuthTemplateProps } from '../../components/AuthTemplate';
import { keeperCalm } from './icons';
import { getKeeperWalletDeviceName } from '../../../../utils/helpersInformationDevices';
import { AppStoreContext } from '../../../../App';
import { remapNetwork } from '../../../../stores/ConfigStore';

interface KeeperSwitchNetworkProps {
    onRetry: AuthTemplateProps['onRetry'];
}

export const KeeperSwitchNetwork: React.FC<KeeperSwitchNetworkProps> = ({
    onRetry,
}) => {
    const { configStore } = React.useContext(AppStoreContext);
    return (
        <AuthTemplate
            icon={keeperCalm}
            title={{
                i18key: 'switchNetwork.title',
                i18Params: { network: remapNetwork[configStore.network] },
            }}
            text={{
                i18key: 'switchNetwork.desc',
                i18Params: {
                    network: remapNetwork[configStore.network],
                    device: getKeeperWalletDeviceName(),
                },
            }}
            onRetry={onRetry}
        />
    );
};

KeeperSwitchNetwork.displayName = 'KeeperSwitchNetwork';
