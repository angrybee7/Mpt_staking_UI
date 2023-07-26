import * as React from 'react';
import { ITransProps, Trans } from '@waves/ui-translator';
import {
    ExternalLink,
    Flex,
} from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { Button } from 'uikit';
import {
    TYPE_DEVICES_NAMES,
    getKeeperWalletDeviceName,
    getMetamaskDeviceName,
} from '../../../utils/helpersInformationDevices';
import { DeviceIcon } from "./DeviceIcon.tsx";

export interface AuthTemplateProps {
    title: ITransProps;
    text: ITransProps;
    device: TYPE_DEVICES_NAMES;
    onRetry?: () => Promise<any>;
    isShowRetry?: boolean;
    variant?: 'default' | 'error';
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({
    title,
    text,
    onRetry,
    device,
    isShowRetry = true,
    variant = 'default'
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
            color="text"
            ref={wrapperRef}
        >
            <DeviceIcon
                device={device}
                variant={variant}
                mt={14}
                mb={24}
            />
            <Text
                fontSize={18}
                lineHeight="26px"
                fontWeight={700}
                mb="24px"
            >
                <Trans {...title} />
            </Text>
            <Text
                variant="text1"
                mb="24px"
                textAlign="justify"
                fontWeight={400}
            >
                <Trans {...text} />
            </Text>
            {isShowRetry && (
                <Button
                    variantSize="large"
                    variant="primary"
                    onClick={handleRetry}
                    width="200px"
                    disabled={isPending}
                >
                    {isPending ? (
                        <Trans i18key="waiting" />
                    ) : (
                        <Trans i18key="retry" />
                    )}
                </Button>
            )}
            {!isShowRetry && currentUrlForDownload && (
                <ExternalLink
                    width="100%"
                    href={currentUrlForDownload}
                    rel="noopener noreferrer"
                >
                    <Button
                        variantSize="large"
                        variant="primary"
                        width="200px"
                        position="relative"
                    >
                        <Trans i18key="install" />
                    </Button>
                </ExternalLink>
            )}
        </Flex>
    );
};

AuthTemplate.displayName = 'AuthTemplate';
