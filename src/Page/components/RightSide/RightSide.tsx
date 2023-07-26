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
        <Flex flexDirection="column" width={['100%', '50%']}>
            {authStore.isAuthorized && <UserInfo setHeightUserInfoBlock={setHeightUserInfoBlock} />}
            <Flex flexDirection="column" flex={1}>
                {authStore.isAuthorized ? <Dashboard /> : <ConnectBlock />}
            </Flex>
        </Flex>
    );
});

RightSide.displayName = 'RightSide';
