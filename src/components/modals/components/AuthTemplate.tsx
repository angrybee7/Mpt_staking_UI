import * as React from 'react';
import { ITransProps, Trans } from '@waves/ui-translator';
import { IIcon } from '@waves.exchange/wx-react-uikit/dist/esm/components/Icon/Icon';
import {
    DotLoader,
    ExternalLink,
    Flex,
    Icon,
} from '@waves.exchange/wx-react-uikit';
import { Text } from '../../../uikit/Text/Text';
import { Button } from '../../../uikit/Button/Button';
import {
    TYPE_DEVICES_NAMES,
    getKeeperWalletDeviceName,
    getMetamaskDeviceName,
} from '../../../utils/helpersInformationDevices';

export interface AuthTemplateProps {
    icon: IIcon;
    title: ITransProps;
    text: ITransProps;
    device?: TYPE_DEVICES_NAMES;
    onRetry?: () => Promise<any>;
    isShowRetry?: boolean;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({
    icon,
    title,
    text,
    onRetry,
    device,
    isShowRetry = true,
}) => {
    const wrapperRef = React.createRef<HTMLDivElement>();
    const [isPending, setIsPending] = React.useState(false);
    const handleRetry = async () => {
        setIsPending(true);
        await onRetry();
        setIsPending(false);
    };

    const currentUrlForDownload = React.useMemo((): string => {
        if (device === getKeeperWalletDeviceName()) {
            return 'https://keeper-wallet.app/#get-keeper';
        }

        if (device === getMetamaskDeviceName()) {
            return 'https://metamask.io/download';
        }

        return '';
    }, [device]);

    React.useEffect(() => {
        const reloadLink = wrapperRef.current.querySelector('.reload');
        const clickHandler = () => location.reload();
        if (reloadLink) {
            reloadLink.addEventListener('click', clickHandler);
        }

        return () => {
            if (reloadLink) {
                reloadLink.removeEventListener('click', clickHandler);
            }
        };
    }, []);

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            color="standard.$0"
            mt="30px"
            ref={wrapperRef}
        >
            <Icon icon={icon} size={82} mb="24px" />
            <Text variant="heading2" mb="24px" textAlign="center">
                <Trans {...title} />
            </Text>
            <Text variant="text2" mb="24px" textAlign="center">
                <Trans {...text} />
            </Text>
            {isShowRetry && (
                <Button
                    variantSize='large'
                    variant="primary"
                    onClick={handleRetry}
                    width="100%"
                    disabled={isPending}
                >
                    {isPending ? (
                        <Flex
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <DotLoader />
                        </Flex>
                    ) : (
                        <Trans i18key="retry" />
                    )}
                </Button>
            )}
            {currentUrlForDownload && (
                <ExternalLink
                    width="100%"
                    href={currentUrlForDownload}
                    rel="noopener noreferrer"
                >
                    <Button variant="primary" width="100%" position="relative">
                        <Trans i18key="install" />
                    </Button>
                </ExternalLink>
            )}
        </Flex>
    );
};

AuthTemplate.displayName = 'AuthTemplate';
