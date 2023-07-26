import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { Box } from '@waves.exchange/wx-react-uikit';
import { ModalStyled } from '../../Modal/ModalStyled';
import { Trans, translate } from '@waves/ui-translator';
import { Text } from 'uikit';

const LegalDisclaimerModalFC: React.FC<ModalProps> = ({ ...props }) => {
    return (
        <ModalStyled
            modalName={MODAL_NAMES.legalDisclaimer}
            stateVariant="default"
            width={['100%', '720px']}
            color="standard.$0"
            {...props}
        >
            <Box mt={14} px={15}>
                <Text
                    color="text"
                    fontSize={18}
                    lineHeight="26px"
                >
                    <Trans i18key="legalDisclaimer.title" />
                </Text>
            </Box>
            <Box
                mt={16}
                mb={14}
                textAlign="justify"
            >
                <Text
                    variant="text1"
                    color="text"
                >
                    <Trans i18key="legalDisclaimer.desc" />
                </Text>
            </Box>
        </ModalStyled>
    );
};

LegalDisclaimerModalFC.displayName = 'LegalDisclaimerModal';

export const LegalDisclaimerModal = translate('app.page')(
    LegalDisclaimerModalFC
);
