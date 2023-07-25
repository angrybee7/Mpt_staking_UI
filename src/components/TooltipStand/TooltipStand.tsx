import { FC } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { Tooltip } from '../../uikit/Tooltip/Tooltip';

export const TooltipStand: FC = () => {
    return (
        <Box
            sx={{ p: '20px' }}
            color="text"
        >
            <Flex>
                <Tooltip variant="info" label={(): React.ReactNode => <Box color="text">Tooltip Kit</Box>}>
                    <Flex>Label Kit</Flex>
                </Tooltip>
            </Flex>
        </Box>
    );
};

TooltipStand.displayName = 'TooltipStand';
