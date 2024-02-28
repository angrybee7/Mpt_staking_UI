import * as React from 'react';
import { Box, Flex, Input, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { ITransProps, Trans } from '@waves/ui-translator';
import { NodeOption } from './NodeOption.tsx';
import { SelectedWrapper } from 'uikit';
import { INode } from '../../../stores/utils/fetchNodeList.ts';
import edit from '../../../img/edit.svg';

interface INodeSelected {
	opened: boolean;
	selected?: INode;
	placeholderTrans?: ITransProps;
    isManually?: boolean;
    onChangeInput?: (value: string) => void;
    inputValue?: string;
}

export const NodeSelected: React.FC<INodeSelected & TFlexProps> = ({
    opened,
    selected,
    placeholderTrans = { i18key: 'selectNode' },
    isManually,
    onChangeInput,
    inputValue,
    ...flexProps
}) => {
    return (
        <SelectedWrapper
            opened={opened}
            label={isManually ? '' : <Trans i18key="stakingNode" />}
            px={isManually ? 24 : 16}
            {...flexProps}
        >
            {isManually ?
                <Flex alignItems="center">
                    <Box
                        width="24px"
                        height="24px"
                        borderRadius="50%"
                        overflow="hidden"
                        backgroundImage={`url(${edit})`}
                        mr={8}
                    />
                    <Box position="absolute" left="56px" right="50px">
                        <Text variant="text2" color="text">
                            <Trans i18key="EnterNodeAddress" />
                        </Text>
                        <Box onClick={(e) => e.stopPropagation()}>
                            <Input
                                value={inputValue}
                                onChange={(e) => onChangeInput(e.target.value)}
                                p="0 !important"
                                border="none !important"
                                height="24px !important"
                                backgroundColor="#ffffff !important"
                                fontFamily="Sfmono"
                                placeholder='000000000000'
                            />
                        </Box>
                    </Box>
                </Flex> :
                selected ?
                    <NodeOption node={selected} /> :
                    <Text variant="heading4" fontWeight={600} color="text">
                        <Trans {...placeholderTrans} />
                    </Text>
            }
        </SelectedWrapper>
    );
};

NodeSelected.displayName = 'NodeSelected';
