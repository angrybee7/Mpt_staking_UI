import { FC } from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { FeeComponent } from 'uikit';

export const FeeStand: FC = () => {
    return (
        <Flex
            flexDirection="column"
            p="20px"
        >
            <Flex
                width="300px"
                flexDirection="column"
            >
                <FeeComponent mb="20px" />
                <FeeComponent mb="20px" />
            </Flex>
        </Flex>
    );
};

FeeStand.displayName = 'FeeStand';
