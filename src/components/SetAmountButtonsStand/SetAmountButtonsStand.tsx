import { FC } from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { SetAmountButtons } from '../../uikit/SetAmountButtons/SetAmountButtons';

export const SetAmountButtonsStand: FC = () => {
    return (
        <Flex flexDirection="column" bg="#404040" p="20px">
            <SetAmountButtons
                presets={['max']}
                onClick={() => console.log('setMaxAmount')}
                mr="15px"
            />
        </Flex>
    );
};

SetAmountButtonsStand.displayName = 'SetAmountButtonsStand';
