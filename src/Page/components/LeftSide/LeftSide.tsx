import { FC, memo } from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';

export const LeftSide: FC = memo(() => {
    return (
        <Flex
            width={['100%', '40%']}
            flexDirection="column"
            justifyContent="space-between"
            sx={{
                pt: ['16px', '40px'],
                pr: ['0', '40px'],
                pb: ['16px', '40px']
            }}
        >
            faq
        </Flex>
    );
});

LeftSide.displayName = 'LeftSide';
