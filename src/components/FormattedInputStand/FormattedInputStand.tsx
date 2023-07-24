import { FC } from 'react';
import { Flex, Text } from '@waves.exchange/wx-react-uikit';
import { FormattedInput } from '../../uikit/FormattedInput/FormattedInput';
import { SetAmountButtons } from '../../uikit/SetAmountButtons/SetAmountButtons';
import { InputErrors } from '../../uikit/InputErrors/InputErrors';
import logo from '/src/img/mpt-logo.svg';

export const FormattedInputStand: FC = () => {
    return (
        <Flex flexDirection="column" p="20px">
            <FormattedInput
                iconUrl={logo}
                formatSeparator=","
                decimals={8}
                tag="WAVES"
                value="100"
                maxWidth="300px"
                width="100%"
                mb="20px"
            />
            <FormattedInput
                iconUrl={logo}
                formatSeparator=","
                decimals={8}
                tag="WAVES"
                aria-invalid="true"
                maxWidth="300px"
                width="100%"
                mb="20px"
            />
            <Flex flexDirection="column" maxWidth="300px" color="wdtextsec">
                <Flex justifyContent="space-between" mb="6px">
                    <Text variant="caption">I send</Text>{' '}
                </Flex>
                <FormattedInput
                    iconUrl={logo}
                    formatSeparator=","
                    decimals={8}
                    tag="WAVES"
                    aria-invalid="true"
                    onMax={() => console.log('setMaxAmount')}
                    placeholder='000000000000'
                />
                <InputErrors error="required" />
            </Flex>
        </Flex>
    );
};

FormattedInputStand.displayName = 'FormattedInputStand';
