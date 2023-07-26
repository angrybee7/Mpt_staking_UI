import * as React from 'react';
import { Box, Flex, Text } from '@waves.exchange/wx-react-uikit';
import { Button, FormattedInput, InputErrors } from 'uikit';
import { StakeStore } from './stakeStore.ts';
import { AppStoreContext } from '../../../App.tsx';
import { Observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { Money } from '@waves/data-entities';

export const StakeForm: React.FC = () => {
    const rs = React.useContext(AppStoreContext);

    const stakeStore = React.useMemo(() => {
        return new StakeStore({
            rs,
            inputMoney: new Money(0, rs.assetsStore.LPToken),
        });
    }, []);

    return (
        <Observer>
            {(): ReactElement => {
                return (
                    <Box as='form'>
                        <Text>
                            Stake
                        </Text>
                        <Flex flexDirection="column" maxWidth="300px" color="wdtextsec">
                            <Flex justifyContent="space-between" mb="6px">
                                <Text variant="caption">I send</Text>{' '}
                            </Flex>
                            <FormattedInput
                                value={stakeStore.inputString}
                                onChange={
                                    (e) => {
                                        stakeStore.onInputChange(
                                            e.target.value
                                        );
                                    }
                                }
                                iconUrl={rs.assetsStore.LPToken.icon}
                                formatSeparator=","
                                decimals={rs.assetsStore.LPToken.precision}
                                tag={rs.assetsStore.LPToken.displayName}
                                aria-invalid={!!stakeStore.amountError?.error}
                                onMax={stakeStore.onClickMaxAmount}
                                placeholder='000000000000'
                            />
                            <InputErrors error={stakeStore.amountError?.error}/>
                            <Button variant="primary" ml={20} onClick={stakeStore.invoke}>
                                Stake
                            </Button>
                        </Flex>
                    </Box>
                )
            }}
        </Observer>
    );
}

StakeForm.displayName = 'StakeForm';
