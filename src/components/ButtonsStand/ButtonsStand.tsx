import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { Button } from 'uikit';

export const ButtonsStand: React.FC = () => {
    return (
        <Flex flexDirection="column">
            <Flex mb={20}>
                <Button variant="primary" ml={20} onClick={() => console.log('primary hey')}>
					Primary
                </Button>

                <Button variant="primary" disabled ml={20} onClick={() => console.log('primary hey')}>
					Primary disabled
                </Button>
            </Flex>

            <Flex mb={20}>
                <Button variant="transparent" ml={20} onClick={() => console.log('transparent hey')}>
					Transparent
                </Button>

                <Button variant="transparent" disabled ml={20} onClick={() => console.log('transparent hey')}>
					Transparent
                </Button>
            </Flex>
        </Flex>
    );
};

ButtonsStand.displayName = 'ButtonsStand';
