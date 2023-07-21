import {
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import metamask from '/src/img/metamask.svg';
import keeper from '/src/img/keeper.svg';
import wx from '/src/img/wx.svg';
import { Text } from 'uikit';
import { Button } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { AppStoreContext } from '../../../App';
import { observer } from 'mobx-react-lite';
import { shortAddress } from '../../../utils';

export const UserInfo: FC<{
    setHeightUserInfoBlock: Dispatch<SetStateAction<number>>;
}> = observer(({ setHeightUserInfoBlock }) => {
    const { authStore } = useContext(AppStoreContext);
    const userTypes = { metamask, keeper, wx };
    const shortedAddress = useMemo(() => shortAddress(authStore.user.address), []);
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHeightUserInfoBlock(wrapper.current?.clientHeight);
    }, []);

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            ref={wrapper}
            sx={{
                py: ['16px', '24px'],
                px: ['16px', '24px'],
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                borderTopLeftRadius: ['12px', '0'],
                borderTopRightRadius: ['12px', '0'],
                backgroundColor: 'rgba(0, 16, 56, 0.7)',
                backdropFilter: 'blur(8px)',
            }}
        >
            <Flex minWidth={[null, '120px']} alignItems="center">
                <Box
                    width="28px"
                    height="28px"
                    backgroundImage={`url(${userTypes[authStore.user.type]})`}
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                />
                <Text
                    variant="text1"
                    color="text"
                    ml="8px"
                    display={['block', 'none']}
                >
                    {shortedAddress}
                </Text>
            </Flex>
            <Text variant="text1" color="text" display={['none', 'block']}>
                {authStore.user?.address}
            </Text>
            <Button
                variant="transparent"
                px={['14px !important', '32px !important']}
                sx={{ display: 'flex', alignItems: 'center' }}
                onClick={authStore.logout.bind(authStore)}
            >
                <Trans i18key="logout" />
            </Button>
        </Flex>
    );
});

UserInfo.displayName = 'UserInfo';
