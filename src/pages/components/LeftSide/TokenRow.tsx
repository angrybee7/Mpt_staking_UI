import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { Link } from './Link';
import { Trans } from '@waves/ui-translator';

const tokensHash = {
    waves: {
        address: '7scqyYoVsNrpWbTAc78eRqNVcYLxMPzZs8EQfX7ruJAg',
        url: 'https://wavesexplorer.com/ru/assets/7scqyYoVsNrpWbTAc78eRqNVcYLxMPzZs8EQfX7ruJAg'
    },
    erc20: {
        address: '0x08709543199edd2c0fa6937651695d88eef1863f',
        url: 'https://etherscan.io/token/0x08709543199edd2c0fa6937651695d88eef1863f?a=0x588f96743caAcd6bbe1506dDBc86551311b6A3D3'
    },
    bep20: {
        address: '0x0556c743849d4313ca29b852a672322ae7cbe29c',
        url: 'https://bscscan.com/token/0x0556c743849d4313ca29b852a672322ae7cbe29c'
    }
};

export const TokenRow: React.FC<{ label: string; blockchain: keyof typeof tokensHash }> = ({ label, blockchain }) => {
    return (
        <Flex alignItems="baseline">
            <Text as="div" variant="heading4" sx={{ whiteSpace: 'nowrap' }}>
                <Trans i18key={label} />
            </Text>
            <Link href={tokensHash[blockchain].url} text={tokensHash[blockchain].address} />
        </Flex>
    );
};

TokenRow.displayName = 'TokenRow';