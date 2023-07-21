import { FC } from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { InputErrors } from '../../uikit/InputErrors/InputErrors';
import BigNumber from '@waves/bignumber';

export const InputErrorsStand: FC = () => {
    return (
        <Flex
            flexDirection="column"
            bg="#404040"
            p="20px"
            sx={{
                span: {
                    mt: '10px',
                },
            }}
        >
            <InputErrors error="notEnoughFunds" />
            <InputErrors error="required" />
            <InputErrors
                error="minAmount"
                minAmount={new BigNumber(10)}
                assetName="WAVES"
            />
        </Flex>
    );
};

InputErrorsStand.displayName = 'InputErrorsStand';
