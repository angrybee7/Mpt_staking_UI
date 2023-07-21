import { FC } from 'react';
import { Box, Flex, Text } from '@waves.exchange/wx-react-uikit';
import { Help } from '../../uikit/Help/Help';

export const HelpStand: FC = () => {
    return (
        <Flex flexDirection="column" bg="#404040" p="20px">
            <Flex width="300px" flexDirection="column" color="text">
                <Flex>
                    <Text mr="8px">Help</Text>
                    <Help>
                        <Box minWidth="250px">
              A transaction fee is a fee that an account owner pays to send a transaction in the Waves blockchain.
                        </Box>
                    </Help>
                </Flex>
            </Flex>
        </Flex>
    );
};

HelpStand.displayName = 'HelpStand';
