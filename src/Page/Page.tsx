import { FC } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { translate } from '@waves/ui-translator';
import { LeftSide } from './components/LeftSide/LeftSide';
import { RightSide } from './components/RightSide/RightSide';
import mainBg from '../img/mainBg.svg';

const PageFC: FC = () => {
    return (
        <Box height="100%" position="relative" sx={{ px: ['0', '40px'] }}>
            <Box
                position="absolute"
                top={0}
                left={0}
                display={['none', 'block']}
                width="100%"
                height="100vh"
                backgroundImage={`url(${mainBg})`}
                backgroundRepeat="no-repeat"
                backgroundPosition="bottom"
            />
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
