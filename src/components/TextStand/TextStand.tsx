import { FC } from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { Text } from '../../uikit/Text/Text';

export const TextStand: FC = () => {
    return (
        <Flex flexDirection="column" bg="#404040" p="20px">
            <Text as="div" variant="heading1" color="text" mb="12px">variant heading1</Text>
            <Text as="div" variant="heading2" color="text" mb="12px">variant heading2</Text>
            <Text as="div" variant="heading3" color="text" mb="12px">variant heading3</Text>
            <Text as="div" variant="text1" color="text" mb="12px">variant text1</Text>
            <Text as="div" variant="text2" color="text" mb="12px">variant text2</Text>
        </Flex>
    );
};

TextStand.displayName = 'TextStand';
