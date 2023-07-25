import { FC, useState } from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import { Checkbox } from '../../uikit/Checkbox/Checkbox';

export const CheckboxStand: FC = () => {
    const [checked, setChecked] = useState(false);
    return (
        <Flex flexDirection="column" bg="#404040">
            <Flex mb={20} p="20px">
                <Box sx={{ mr: '20px' }}>
                    <Checkbox
                        controlBoxStyles={{ baseStyles: { marginRight: '8px' } }}
                        isChecked={checked}
                        isInvalid={false}
                        onChange={(e) => setChecked(e.target.checked)}
                        color="text"
                    >
                        Checkbox default
                    </Checkbox>
                </Box>
                <Box sx={{ mr: '20px' }}>
                    <Checkbox
                        controlBoxStyles={{ baseStyles: { marginRight: '8px' } }}
                        isChecked={checked}
                        isInvalid={true}
                        onChange={(e) => setChecked(e.target.checked)}
                        color="text"
                    >
                        Checkbox error
                    </Checkbox>
                </Box>
                <Box sx={{ mr: '20px' }}>
                    <Checkbox
                        controlBoxStyles={{ baseStyles: { marginRight: '8px' } }}
                        isChecked={checked}
                        isInvalid={false}
                        isDisabled={true}
                        onChange={(e) => setChecked(e.target.checked)}
                        color="text"
                    >
                        Checkbox disabled
                    </Checkbox>
                </Box>
            </Flex>
        </Flex>
    );
};

CheckboxStand.displayName = 'CheckboxStand';
