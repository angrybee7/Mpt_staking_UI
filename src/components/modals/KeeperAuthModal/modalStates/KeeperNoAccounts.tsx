import * as React from 'react';
import { AuthTemplate, AuthTemplateProps } from '../../components/AuthTemplate';
import { getKeeperWalletDeviceName } from '../../../../utils/helpersInformationDevices';

interface KeeperNoAccountsProps {
    onRetry: AuthTemplateProps['onRetry'];
}

export const KeeperNoAccounts: React.FC<KeeperNoAccountsProps> = ({
    onRetry,
}) => {
    return (
        <AuthTemplate
            device={getKeeperWalletDeviceName()}
            title={{
                i18key: 'noAccountsKeeperWallet.title',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            text={{
                i18key: 'noAccountsKeeperWallet.desc',
                i18Params: { device: getKeeperWalletDeviceName() },
            }}
            onRetry={onRetry}
            variant='error'
        />
    );
};

KeeperNoAccounts.displayName = 'KeeperNoAccounts';
