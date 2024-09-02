import * as React from 'react';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { Box } from '@waves.exchange/wx-react-uikit';
import { BalanceRow } from '../../../../../components/BalanceComponent/BalanceRow.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { observer } from 'mobx-react-lite';

export const ActiveStakings: React.FC = observer(() => {
    const {
        contractStore,
        assetsStore,
    } = React.useContext(AppStoreContext);

    const {
        currentLeased,
        nextLeased
    } = React.useMemo(() => {
        return ({
            currentLeased: contractStore.totalLeased?.current?.getTokens(),
            nextLeased: contractStore.totalLeased?.next?.getTokens(),
        });
    }, [contractStore.totalLeased]);

    return (
        <SerifWrapper>
            <Box
                sx={{
                    py: '24px',
                    px:['16px', '24px']
                }}
            >
                <Text
                    as="div"
                    variant="heading2"
                    mb="16px"
                >
                    <Trans i18key="activeStakings" />
                </Text>
                <BalanceRow
                    // balance={currentLeased?.eq(nextLeased) ?
                    //     currentLeased?.toFormat() :
                    //     `${currentLeased?.toFormat()} / ${nextLeased?.toFormat()}`
                    // }
                    balance={`${currentLeased?.toFormat()} / ${nextLeased?.toFormat()}`}
                    label={{ i18key: 'totalStaked' }}
                    helpTrans={{ i18key: 'totalStakedTooltip' }}
                    ticker={assetsStore.LPToken.displayName}
                    mb="24px"
                />
            </Box>
        </SerifWrapper>
    );
});

ActiveStakings.displayName = 'ActiveStakings';
