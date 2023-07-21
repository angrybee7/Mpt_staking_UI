import * as React from 'react';
import { DotLoader, Flex } from '@waves.exchange/wx-react-uikit';
import { ITransProps, Trans } from '@waves/ui-translator';
import { TYPE_DEVICES_NAMES } from '../../utils/helpersInformationDevices';

export type TButtonContent = {
    isPending: boolean;
    isRetry: boolean;
    transText: ITransProps;
    isDevices?: boolean;
    currentDevice?: TYPE_DEVICES_NAMES;
    transRetry?: ITransProps;
};

export const ButtonContent: React.FC<TButtonContent> = ({
    isPending,
    isDevices,
    isRetry,
    transRetry = { i18key: 'tryAgain' },
    transText,
}) => {
    return (
        <>
            {isPending ? (
                <>
                    {isDevices ? (
                        <Flex
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <DotLoader />
                        </Flex>
                    ) : (
                        // TODO: Если надо уточнения пендинга с девайсом
                        // <Box>
                        //     <Box>
                        //         <Trans
                        //             i18key="waitingConfirmation"
                        //             i18Params={{
                        //                 device: currentDevice,
                        //             }}
                        //         />
                        //     </Box>
                        //     <Flex
                        //         flex={1}
                        //         alignItems="center"
                        //         justifyContent="center"
                        //         mb="15px"
                        //     >
                        //         <DotLoader />
                        //     </Flex>
                        // </Box>
                        <Flex
                            flex={1}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <DotLoader />
                        </Flex>
                    )}
                </>
            ) : isRetry ? (
                <Trans {...transRetry} />
            ) : (
                <Trans {...transText} />
            )}
        </>
    );
};

ButtonContent.displayName = 'ButtonContent';
