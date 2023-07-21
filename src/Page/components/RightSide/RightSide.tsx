import { FC, useContext, useState } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { Treasury } from './common/Treasury';
import { DiagramBlock } from './common/DiagramBlock';
import { InfoBlock } from './common/InfoBlock';
import { ConnectBlock } from './ConnectBlock/ConnectBlock';
import { Dashboard } from './Dashboard/Dashboard';
import { UserInfo } from './UserInfo';
import { AppStoreContext } from '../../../App';
import { observer } from 'mobx-react-lite';

export const RightSide: FC = observer(() => {
    const { authStore } = useContext(AppStoreContext);
    const [heightUserInfoBlock, setHeightUserInfoBlock] = useState(0);

    return (
        <Box width={['100%', '60%']}>
            {authStore.isAuthorized && <UserInfo setHeightUserInfoBlock={setHeightUserInfoBlock} />}
            <Flex
                flexDirection="column"
                minHeight={`calc(100% - ${heightUserInfoBlock + 24}px)`}
                sx={{
                    mt: '24px',
                    py: ['16px', '32px'],
                    px: ['16px', '24px'],
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 16, 56, 0.7)',
                    backdropFilter: 'blur(8px)',
                }}
            >
                {authStore.isAuthorized ? <Dashboard /> : <ConnectBlock />}
            </Flex>
        </Box>
    );
});

RightSide.displayName = 'RightSide';
