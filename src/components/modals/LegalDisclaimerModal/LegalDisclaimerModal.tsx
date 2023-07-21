import * as React from 'react';
import { MODAL_NAMES } from '../../ModalContainer/MODAL_NAMES';
import { ModalProps } from '../../Modal/Modal';
import { Box } from '@waves.exchange/wx-react-uikit';
import { ModalStyled } from '../../Modal/ModalStyled';
import { Trans, translate } from '@waves/ui-translator';
import { Text } from '../../../uikit';

const LegalDisclaimerModalFC: React.FC<ModalProps> = ({ ...props }) => {
    return (
        <ModalStyled
            modalName={MODAL_NAMES.legalDisclaimer}
            width={['100%', '720px']}
            color="standard.$0"
            sx={{
                '& > div': {
                    backgroundPosition: 'center -300px',
                },
            }}
            {...props}
        >
            <Box mt="30px" mb="16px">
                <Text variant="heading2">
                    <Trans i18key="legalDisclaimer.title" />
                </Text>
            </Box>
            <Text as="div">
                <Text as="div" variant="text2" sx={{ whiteSpace: 'pre-line' }}>
                    <Trans i18key="legalDisclaimer.desc1" />
                </Text>
                <Text as="ul" variant="text2" sx={{ '> li': { marginBottom: '6px' } }}>
                    <Trans i18key="legalDisclaimer.desc2" />
                    <Text as="li">
                        <Trans i18key="legalDisclaimer.desc3" />
                        <Text
                            as="ul"
                            sx={{
                                'p': '0px',
                                'pt': '2px',
                                'pl': '10px',
                                '&': {
                                    listStyle: 'none',
                                },
                                'li': {
                                    marginBottom: '2px'
                                },
                                '& li::before': {
                                    content: "'-'",
                                    position: 'relative',
                                    left: '-5px',
                                },
                            }}
                        >
                            <Trans i18key="legalDisclaimer.desc4" />
                        </Text>
                    </Text>
                </Text>

                <Text variant="text2">
                    <Trans i18key="legalDisclaimer.desc5" />
                </Text>
            </Text>
        </ModalStyled>
    );
};

LegalDisclaimerModalFC.displayName = 'LegalDisclaimerModal';

export const LegalDisclaimerModal = translate('app.page')(
    LegalDisclaimerModalFC
);
