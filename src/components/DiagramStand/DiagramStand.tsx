import { FC } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { Diagram } from '../../uikit/Diagram/Diagram';

export const DiagramStand: FC = () => {
    const dataProps = [{ color: '#03A500', value: 0.5 }, { color: '#1F5AF6', value: 0.5 }, { color: '#E74F61', value: 5 }];
    return (
        <Flex flexDirection="column" bg="#404040">
            <Flex mb={20} p="20px">
                <Box sx={{ mr: '20px' }}>
                    <Box sx={{ mb: '16px' }} color="text">Default  Diagram</Box>
                    <Diagram dataProps={dataProps} />
                </Box>
                <Box sx={{ mr: '20px' }}>
                    <Box sx={{ mb: '16px' }} color="text">Without Data Diagram</Box>
                    <Diagram dataProps={[]} />
                </Box>
                <Box sx={{ mr: '20px' }}>
                    <Box sx={{ mb: '16px' }} color="text">Partially empty Diagram</Box>
                    <Diagram dataProps={dataProps} totalValue={10} />
                </Box>
            </Flex>
            <Flex mb={20} p="20px">
                <Box sx={{ mr: '20px' }}>
                    <Box sx={{ mb: '16px' }} color="text">Custom Diagram</Box>
                    <Diagram dataProps={dataProps}  heightChart={150} widthChart={150} lineWidth={4} width={150} height={150} />
                </Box>
                <Box sx={{ mr: '20px' }}>
                    <Box sx={{ mb: '16px' }} color="text">Custom Diagram</Box>
                    <Diagram dataProps={dataProps}  heightChart={50} widthChart={50} lineWidth={100} width={50} height={50} />
                </Box>
            </Flex>
        </Flex>
    );
};

DiagramStand.displayName = 'DiagramStand';