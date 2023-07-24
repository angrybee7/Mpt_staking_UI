import { FC } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { translate } from '@waves/ui-translator';
import { LeftSide } from './components/LeftSide/LeftSide';
import { MainBg } from './components/MainBg';
import { RightSide } from './components/RightSide/RightSide';

const PageFC: FC = () => {
    return (
        <Box height="100%" position="relative" sx={{ px: ['0', '40px'] }}>
            {/* <MainBg /> */}
            <Flex
                position="relative"
                minHeight="100%"
                width="100%"
                flexDirection={['column-reverse', 'row']}
            >
                <LeftSide />
                <RightSide />
            </Flex>
        </Box>
    );
};

PageFC.displayName = 'Page';
export const Page = translate('app.page')(PageFC);
