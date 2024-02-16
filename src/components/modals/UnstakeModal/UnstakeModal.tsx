import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { ModalStyled } from '../../Modal/ModalStyled';
import { Trans, translate } from '@waves/ui-translator';
import { Button, FeeComponent, FormattedInput, InputErrors, Text } from 'uikit';
import { BalanceRow } from '../../BalanceComponent/BalanceRow';
import { Box } from '@waves.exchange/wx-react-uikit';

const UnstakeModalFC: React.FC<ModalProps & { store: any; address: string }> = ({ store, address, ...rest }) => {
    const [input, setInput] = React.useState('');

    return (
        <ModalStyled
            modalName={MODAL_NAMES.unstake}
            stateVariant="default"
            width={['100%', '720px']}
            color="standard.$0"
            {...rest}
        >
            <Box pb="12px">
                <Text
                    as="div"
                    variant="heading3"
                    color="text"
                    pt="12px"
                    pb="24px"
                >
                    <Trans i18key="unstake" />
                </Text>
                <BalanceRow
                    balance={store.nodes[address].availableForUnstaking.getTokens().toFormat()}
                    label={{ i18key: 'availableForUnstaking' }}
                    ticker={store.nodes[address].availableForUnstaking.asset.displayName}
                    mb="24px"
                />
                <FormattedInput
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    iconUrl={store.nodes[address].availableForUnstaking.asset.icon}
                    formatSeparator=","
                    decimals={store.nodes[address].availableForUnstaking.asset.precision}
                    tag={store.nodes[address].availableForUnstaking.asset.displayName}
                    aria-invalid={!!store?.error}
                    onPresetClick={() => null}
                    placeholder="000000000000"
                />
                <InputErrors error={store?.error} />
                <FeeComponent my="24px" />
                <Button
                    variant="primary"
                    variantSize="large"
                    width="100%"
                    boxShadow="0px 8px 20px 0px #3C63AF2B"
                    onClick={() => null}
                    wrapperProps={{ variant: 'default' }}
                >
                    <Trans i18key="unstake" />
                </Button>
            </Box>
        </ModalStyled>
    );
};

UnstakeModalFC.displayName = 'UnstakeModal';

export const UnstakeModal = translate('app.page')(UnstakeModalFC);
