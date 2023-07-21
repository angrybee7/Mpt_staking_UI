import { FC } from 'react';
import { Flex, FormattedInput, Text } from '@waves.exchange/wx-react-uikit';
import { WrapperFormattedInput } from '../../uikit/FormattedInput/WrapperFormattedInput';
import { SetAmountButtons } from '../../uikit/SetAmountButtons/SetAmountButtons';
import { InputErrors } from '../../uikit/InputErrors/InputErrors';

export const FormattedInputStand: FC = () => {
    return (
        <Flex flexDirection="column" bg="#404040" p="20px">
            <WrapperFormattedInput maxWidth="300px" width="100%" mb="20px">
                <FormattedInput
                    formatSeparator=","
                    decimals={8}
                    tag="WAVES"
                    value="100"
                />
            </WrapperFormattedInput>
            <WrapperFormattedInput maxWidth="300px" width="100%" mb="20px">
                <FormattedInput
                    formatSeparator=","
                    decimals={8}
                    tag="WAVES"
                    aria-invalid="true"
                />
            </WrapperFormattedInput>
            <Flex flexDirection="column" maxWidth="300px" color="wdtextsec">
                <Flex justifyContent="space-between" mb="6px">
                    <Text variant="caption">I send</Text>{' '}
                    <SetAmountButtons
                        presets={['max']}
                        onClick={() => console.log('setMaxAmount')}
                    />
                </Flex>
                <WrapperFormattedInput>
                    <FormattedInput
                        formatSeparator=","
                        decimals={8}
                        tag="WAVES"
                        aria-invalid="true"
                    />
                </WrapperFormattedInput>
                <InputErrors error="required" />
            </Flex>
        </Flex>
    );
};

FormattedInputStand.displayName = 'FormattedInputStand';
