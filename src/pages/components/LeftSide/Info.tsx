import * as React from 'react';
import { SerifWrapper } from '../../../components/SerifWrapper/SerifWrapper';
import { Text } from 'uikit';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { observer } from 'mobx-react-lite';
import { Link, LinkProps } from './Link';
import { AppStoreContext } from '../../../App';
import { RatesStore } from '../../../stores/rates/RatesStore';
import { Money } from '@waves/data-entities';
import { TokenRow } from './TokenRow';
import { Trans } from '@waves/ui-translator';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

const MARKETS: LinkProps[] = [
    { text: 'WX.NETWORK', href: 'https://wx.network/swap/L2MP_USDT-ERC20' },
    { text: 'PUZZLE', href: 'https://puzzleswap.org/trade?asset1=7scqyYoVsNrpWbTAc78eRqNVcYLxMPzZs8EQfX7ruJAg' },
    { text: 'SWOPFI', href: 'https://swop.fi/exchange?from=WAVES&to=7scqyYoVsNrpWbTAc78eRqNVcYLxMPzZs8EQfX7ruJAg' },
    { text: 'UNISWAP', href: 'https://app.uniswap.org/explore/pools/ethereum/0x9a63D921244d67d4E856Dea80DFDF0d5765DD2ad' },
];

const BRIDGES: LinkProps[] = [
    { text: 'WAVES - ETHEREUM', href: 'https://app.allbridge.io/bridge?from=WAVE&to=ETH&asset=L2MP' },
    { text: 'WAVES - BSC', href: 'https://app.allbridge.io/bridge?from=WAVE&to=BSC&asset=L2MP' }
];

export const Info: React.FC = observer(() => {
    const { assetsStore, ratesStore } = React.useContext(AppStoreContext);
    const rateKey = `${assetsStore.LPToken?.id}/${RatesStore.baseAsset.id}`;
    const isMobile = useMediaQuery('screen and (max-width: 560px)');

    return (
        <>
            <SerifWrapper
                py='12px'
                px='12px'
                backgroundColor='bg'
                color='#1E1E1E'
                mb="24px"
                fontFamily="Sfmono-light"
            >
                <Text
                    as="div"
                    fontSize={['20px', '23px']}
                    lineHeight={['28px', '32px']}
                    color="#1E1E1E"
                    sx={{
                        fontWeight: 500,
                    }}
                >{'L2MP'}</Text>
                <Flex justifyContent="space-between" mb="8px" flexWrap="wrap">
                    <Flex alignItems="center" mr="8px" sx={{ whiteSpace: 'nowrap' }}>
                        <Text as="div" variant="heading4">
                            {'Issued:'}
                        </Text>
                        <Text
                            as="div"
                            fontSize={[23, 28]}
                            lineHeight={['32px', '39px']}
                            fontWeight={500}
                            color="main"
                            ml="4px"
                        >
                            {assetsStore.LPToken ?
                                ` ${new Money(
                                    assetsStore.LPToken?.quantity || 0, assetsStore.LPToken
                                ).getTokens().toFormat(isMobile ? 0 : undefined)}` :
                                '-'
                            }
                        </Text>
                    </Flex>
                    <Flex alignItems="center" sx={{ whiteSpace: 'nowrap' }}>
                        <Text as="div" variant="heading4">
                            {'Price: '}
                        </Text>
                        <Text
                            as="div"
                            fontSize={[23, 28]}
                            lineHeight={['32px', '39px']}
                            fontWeight={500}
                            color="main"
                            ml="4px"
                        >
                            {ratesStore ?
                                `$${ratesStore.rates?.data[rateKey]?.exchange?.roundTo(4, 3).toFormat()}` :
                                '-'
                            }
                        </Text>
                    </Flex>
                </Flex>
                <TokenRow label="wavesToken" blockchain="waves" />
                <TokenRow label="erc20Token" blockchain="erc20" />
                <TokenRow label="bep20Token" blockchain="bep20" />
            </SerifWrapper>
            <Flex mb="16px" flexWrap="wrap">
                <SerifWrapper
                    py='12px'
                    px='12px'
                    flex={1}
                    backgroundColor='bg'
                    color='#1E1E1E'
                    mb="8px"
                    mr="8px"
                    fontFamily="Sfmono-light"
                >
                    <Text
                        as="div"
                        fontSize={['20px', '23px']}
                        lineHeight={['28px', '32px']}
                        color="#1E1E1E"
                        mb="12px"
                        sx={{
                            fontWeight: 500,
                        }}
                    >
                        <Trans i18key="Markets" />
                    </Text>
                    {MARKETS.map((market) => <Link key={market.text} {...market} />)}
                </SerifWrapper>
                <SerifWrapper
                    py='12px'
                    px='12px'
                    flex={1}
                    backgroundColor='bg'
                    color='#1E1E1E'
                    mb="8px"
                    fontFamily="Sfmono-light"
                >
                    <Text
                        as="div"
                        fontSize={['20px', '23px']}
                        lineHeight={['28px', '32px']}
                        color="#1E1E1E"
                        mb="12px"
                        sx={{
                            fontWeight: 500,
                        }}
                    >
                        <Trans i18key="bridge" />
                    </Text>
                    {BRIDGES.map((bridge) => <Link key={bridge.text} {...bridge} />)}
                </SerifWrapper>
            </Flex>
        </>
    );
});

Info.displayName = 'Info';