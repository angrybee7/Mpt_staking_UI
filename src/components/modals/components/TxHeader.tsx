import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { ITransProps, Trans } from '@waves/ui-translator';

interface TxHeaderProps {
    icon: string;
    title: ITransProps;
    subtitle?: ITransProps;
}

export const TxHeader: React.FC<TxHeaderProps> = ({
    icon,
    title,
    subtitle,
}) => {
    return (
        <>
            <Flex
                mt="30px"
                width="82px"
                height="82px"
                marginLeft="auto"
                marginRight="auto"
                alignItems="center"
                justifyContent="center"
                backgroundColor="wdBlackButton"
                borderRadius="70px"
                mb="24px"
            >
                <img src={icon} alt="icon" width="41" height="41" />
            </Flex>

            <Text
                variant="heading2"
                as="div"
                textAlign="center"
                color="standard.$0"
                mb="2px"
            >
                <Trans {...title} />
            </Text>
            {subtitle ? (
                <Text
                    variant="text2"
                    as="div"
                    textAlign="center"
                    color="wdtextsec"
                    mb="24px"
                    sx={{
                        '.available': {
                            color: 'standard.$0',
                        },
                    }}
                >
                    <Trans {...subtitle} />
                </Text>
            ) : null}
        </>
    );
};

TxHeader.displayName = 'TxHeader';
