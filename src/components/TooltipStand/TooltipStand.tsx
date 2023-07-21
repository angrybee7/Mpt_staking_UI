import { FC } from 'react';
import { Box, Flex, Tooltip } from '@waves.exchange/wx-react-uikit';
import { WrapperTooltip } from '../../uikit/Tooltip/WrapperTooltip';

export const TooltipStand: FC = () => {
    return (
        <Box bg="#404040" p="20px" color="text">
            <Flex>
                <WrapperTooltip>
                    <Tooltip variant="info" label={(): React.ReactNode => <Box color="text">Tooltip Kit</Box>}>
                        <Flex>Label Kit</Flex>
                    </Tooltip>
                </WrapperTooltip>
            </Flex>
        </Box>
    );
};

TooltipStand.displayName = 'TooltipStand';
