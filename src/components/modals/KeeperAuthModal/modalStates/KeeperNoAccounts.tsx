import * as React from 'react';
import { AuthTemplate, AuthTemplateProps } from '../../components/AuthTemplate';
import { keeperRed } from './icons';
import { getKeeperWalletDeviceName } from '../../../../utils/helpersInformationDevices';

interface KeeperNoAccountsProps {
    onRetry: AuthTemplateProps['onRetry'];
}

export const KeeperNoAccounts: React.FC<KeeperNoAccountsProps> = ({
    onRetry,
}) => {
    return (
        <AuthTemplate
            icon={keeperRed}
            title={{
                i18key: 'noAccountsKeeperWallet.title',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            text={{
                i18key: 'noAccountsKeeperWallet.desc',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            onRetry={onRetry}
        />
    );
};

KeeperNoAccounts.displayName = 'KeeperNoAccounts';
