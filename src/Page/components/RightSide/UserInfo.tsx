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
import ledger from '/src/img/ledger.svg';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { AppStoreContext } from '../../../App';
import { observer } from 'mobx-react-lite';
import { shortAddress } from '../../../utils';
import { SerifWrapper } from '../../../components/SerifWrapper/SerifWrapper.tsx';

export const UserInfo: FC<{
    setHeightUserInfoBlock: Dispatch<SetStateAction<number>>;
}> = observer(({ setHeightUserInfoBlock }) => {
    const { authStore } = useContext(AppStoreContext);
    const userTypes = { metamask, keeper, wx, ledger };
    const shortedAddress = useMemo(() => shortAddress(authStore.user.address), []);
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHeightUserInfoBlock(wrapper.current?.clientHeight);
    }, []);

    return (
        <Flex
            flexDirection="column"
            backgroundColor="bg"
            borderTop={['1px solid #C6DAE6', 'none']}
            pt="32px"
            sx={{
                px: ['20px', '60px'],
            }}
        >
            <SerifWrapper
                py={16}
                px={23}
                backgroundColor="#ffffff"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Flex alignItems="center">
                        <Box
                            width="28px"
                            height="28px"
                            backgroundImage={`url(${userTypes[authStore.user.type]})`}
                            backgroundPosition="center"
                            backgroundRepeat="no-repeat"
                        />
                        <Text
                            fontSize={15}
                            lineHeight="21px"
                            fontWeight={300}
                            color="text"
                            ml="12px"
                        >
                            <Box display={['inline-block', 'none']}>
                                {shortedAddress}
                            </Box>
                            <Box display={['none', 'inline-block']}>
                                {authStore.user?.address}
                            </Box>
                        </Text>
                    </Flex>
                    <Text
                        fontSize={15}
                        lineHeight="21px"
                        fontWeight={500}
                        color="#0983F3"
                        cursor="pointer"
                        onClick={authStore.logout.bind(authStore)}
                    >
                        <Trans i18key="logout" />
                    </Text>
                </Flex>
            </SerifWrapper>
        </Flex>
    );
});

UserInfo.displayName = 'UserInfo';
