import { Box } from '@waves.exchange/wx-react-uikit';
import { CheckboxStand } from './CheckboxStand/CheckboxStand';
import { TextStand } from './TextStand/TextStand';
import { ButtonsStand } from './ButtonsStand/ButtonsStand';
import { modalManager } from '../services/modalManager';
import { MODAL_NAMES } from './ModalContainer/MODAL_NAMES';
import { DiagramStand } from './DiagramStand/DiagramStand';
import { FC } from 'react';
import { FeeStand } from './FeeStand/FeeStand';
import { HelpStand } from './HelpStand/HelpStand';
import { TooltipStand } from './TooltipStand/TooltipStand';
import { FormattedInputStand } from './FormattedInputStand/FormattedInputStand';
import { SetAmountButtonsStand } from './SetAmountButtonsStand/SetAmountButtonsStand';
import { InputErrorsStand } from './InputErrorsStand/InputErrorsStand';
import { translate } from '@waves/ui-translator';

const StandFC: FC = () => (
    <Box>
        <Box
            onClick={() => {
                modalManager.openModal(MODAL_NAMES.authModal, undefined, 500);
            }}
        >
            Waves Dao
        </Box>
        <ButtonsStand />
        <CheckboxStand />
        <TextStand />
        <DiagramStand />
        <FeeStand />
        <HelpStand />
        <TooltipStand />
        <FormattedInputStand />
        <SetAmountButtonsStand />
        <InputErrorsStand />
    </Box>
);

StandFC.displayName = 'Stand';

export const Stand = translate('app.page')(StandFC);
