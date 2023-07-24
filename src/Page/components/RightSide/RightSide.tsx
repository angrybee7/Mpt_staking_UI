import { FC, useContext, useState } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { ConnectBlock } from './ConnectBlock/ConnectBlock';
import { Dashboard } from './Dashboard/Dashboard';
import { UserInfo } from './UserInfo';
import { AppStoreContext } from '../../../App';
import { observer } from 'mobx-react-lite';

export const RightSide: FC = observer(() => {
    const { authStore } = useContext(AppStoreContext);
    const [heightUserInfoBlock, setHeightUserInfoBlock] = useState(0);

    return (
        <Box width={['100%', '50%']}>
            {authStore.isAuthorized && <UserInfo setHeightUserInfoBlock={setHeightUserInfoBlock} />}
            <Flex
                flexDirection="column"
                minHeight={`calc(100% - ${heightUserInfoBlock + 24}px)`}
            >
                {authStore.isAuthorized ? <Dashboard /> : <ConnectBlock />}
            </Flex>
        </Box>
    );
});

RightSide.displayName = 'RightSide';
