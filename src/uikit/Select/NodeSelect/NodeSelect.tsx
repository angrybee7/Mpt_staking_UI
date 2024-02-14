import * as React from 'react';
import { ISelectParams, Select } from '../DefaultSelect';
import { NodeSelected } from './NodeSelected.tsx';
import { NodesList } from './NodesList.tsx';
import { INode } from '../../../stores/utils/fetchNodeList.ts';
import { Box, BoxProps, ExternalLink } from '@waves.exchange/wx-react-uikit';
import { ITransProps, Trans } from '@waves/ui-translator';
import { Text } from 'uikit';

interface INodeSelectParams extends Omit<ISelectParams, 'renderSelected'> {
	nodes: Array<INode>;
	onChangeNode: (node: INode) => void;
	initialNode?: INode;
	selectedNode?: INode;
	boxProps?: BoxProps;
	onChangeInput?: (value: string) => void;
	onClickManually?: (value: boolean) => void;
	manuallySelected?: boolean;
	inputValue?: string;
	placeholderTrans?: ITransProps;
}

export const NodeSelect: React.FC<INodeSelectParams> = ({
    nodes,
    onChangeNode,
    initialNode,
    selectedNode,
    isError,
    boxProps,
    placeholderTrans,
    onChangeInput,
    onClickManually,
    manuallySelected,
    inputValue,
    ...selectProps
}) => {
    return (
        <Box {...boxProps as any}>
            <Select
                renderSelected={({ opened }): React.ReactElement => {
                    return (
                        <NodeSelected
                            opened={opened}
                            selected={selectedNode || initialNode}
                            placeholderTrans={placeholderTrans}
                            isManually={manuallySelected}
                            inputValue={inputValue}
                            onChangeInput={onChangeInput}
                        />
                    );
                }}
                isError={isError}
                mb={16}
                {...selectProps}
            >
                <NodesList
                    nodes={nodes}
                    onChangeNode={onChangeNode}
                    onClickManually={onClickManually}
                    onChangeInput={onChangeInput}
                    isManually={manuallySelected}
                    isError={isError}
                />
            </Select>
            <ExternalLink
                href="https://wavescap.com/nodes"
                rel="noopener noreferrer"
            >
                <Text
                    variant="heading4"
                    color="main"
                >
                    <Trans i18key="goToWavescap" />
                </Text>
            </ExternalLink>
        </Box>
    );
};

NodeSelect.displayName = 'NodeSelect';
