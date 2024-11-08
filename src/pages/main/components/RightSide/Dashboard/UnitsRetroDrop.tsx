import * as React from 'react';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper';
import { BoxProps, Flex } from '@waves.exchange/wx-react-uikit';
import { Button, Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { BlocksToTime } from '../../../../../components/BlocksToTime';
import { BalanceComponent } from '../../../../../components/BalanceComponent/BalanceComponent';
import { Money } from '@waves/data-entities';
import { ReactElement, useContext } from 'react';
import { observer, Observer } from 'mobx-react-lite';
import { AppStoreContext } from '../../../../../App';
import { UnitsDropClaimStore } from '../../../../../stores/UnitsDropClaimStore';

interface IUnitsRetroDropProps {
	blocks: number;
	forClaim: Money;
	claimed: Money;
}

export const UnitsRetroDrop: React.FC<IUnitsRetroDropProps & BoxProps> = observer(({
    blocks,
    forClaim,
    claimed,
    ...rest
}) => {
    const rs = useContext(AppStoreContext);
    const [justClaimed, setJustClaimed] = React.useState(false);

    const claim = React.useMemo(() => {
        return justClaimed || !forClaim || forClaim?.getTokens().isZero() ? '0.00' : forClaim?.getTokens().toFormat();
    } ,[justClaimed, forClaim]);

    const alreadyClaimed = React.useMemo(() => {
        return justClaimed && forClaim ?
            forClaim?.add(claimed)?.getTokens().toFormat() :
            (!claimed || claimed?.getTokens().isZero()) ? '0.00' : claimed?.getTokens().toFormat();
    } ,[justClaimed, forClaim, claimed]);

    const store = React.useMemo(() => {
        return new UnitsDropClaimStore({ rs });
    }, []);

    React.useEffect(() => {
        if (forClaim && forClaim?.getTokens().gt(0)) {
            setJustClaimed(false);
        }
    }, [forClaim]);

    const invoke = React.useCallback(() => {
        store.invoke()
            .then(() => {
                setJustClaimed(true);
            });
    }, [store.invoke]);

    if (!forClaim || !claimed || forClaim.add(claimed).getTokens().isZero()) {
        return null;
    }

    return (
        <Observer>
            {(): ReactElement => {
                return (
                    <SerifWrapper
                        py={[16, 24]}
                        px={24}
                        {...rest}
                    >
                        <Text as="div" variant="heading2" mb="16px">
                            <Trans i18key="unitsRetroDrop" />
                        </Text>
                        <Flex alignItems={[null, 'center']} flexDirection={['column', 'row']} flexWrap={[null, 'wrap']} mb="16px">
                            <BalanceComponent
                                balance={`${claim} / ${alreadyClaimed}`}
                                label={{ i18key: 'availableForClaim' }}
                                labelHelp={{ i18key: 'availableForClaimHelp' }}
                                ticker={forClaim?.asset.displayName || 'UNITS'}
                                variant={['medium']}
                                align="left"
                                flex={1}
                                mr={[null, '16px']}
                                mb={['16px', '8px']}
                                sx={{
                                    '& .balance_class': {
                                        whiteSpace: 'nowrap'
                                    }
                                }}
                            />
                            <Button
                                variant="transparent"
                                variantSize="large"
                                width={['100%', 'auto']}
                                minWidth={165}
                                maxWidth={['unset', 278]}
                                disabled={justClaimed || !forClaim || forClaim?.getTokens().isZero()}
                                onClick={invoke}
                                wrapperProps={{
                                    variant: 'default',
                                    backgroundColor: 'standard.$0'
                                }}
                            >
                                <Trans i18key="claim" />
                            </Button>
                        </Flex>
                        {typeof blocks === 'number' && blocks > 0 ?
                            <Flex
                                flexDirection="column"
                            >
                                <Text
                                    as="div"
                                    variant="text1"
                                >
                                    <Trans i18key="kpiPeriodEnds" />
                                </Text>
                                <Text
                                    as="div"
                                    fontSize={28}
                                    lineHeight="39px"
                                    fontWeight={500}
                                    color="main"
                                >
                                    {'~ '}
                                    {BlocksToTime({
                                        blocks: Math.max(blocks, 0),
                                        options: {
                                            shortFormat: true,
                                            isZero: blocks <= 0,
                                        }
                                    })}
                                    {` (${Math.max(blocks, 0)} blocks)`}
                                </Text>
                            </Flex> :
                            null
                        }
                    </SerifWrapper>
                );
            }}
        </Observer>
    );
});

UnitsRetroDrop.displayName = 'UnitsRetroDrop';
