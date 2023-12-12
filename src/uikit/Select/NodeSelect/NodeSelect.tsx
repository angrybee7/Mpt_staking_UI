import * as React from 'react';
import { ISelectParams, Select } from '../DefaultSelect';
import { NodeSelected } from './NodeSelected.tsx';
import { NodesList } from './NodesList.tsx';
import { INode } from '../../../stores/utils/fetchNodeList.ts';
import { Box, BoxProps } from '@waves.exchange/wx-react-uikit';
import { ITransProps, Trans } from '@waves/ui-translator';
import { NavLink } from 'react-router-dom';
import { Text } from 'uikit';

interface INodeSelectParams extends Omit<ISelectParams, 'renderSelected'> {
	nodes: Array<INode>;
	onChangeNode: (node: INode) => void;
	initialNode?: INode;
	selectedNode?: INode;
	boxProps?: BoxProps;
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
						/>
					)
				}}
				isError={isError}
				mb={16}
				{...selectProps}
			>
				<NodesList
					nodes={nodes}
					onChangeNode={onChangeNode}
					isError={isError}
				/>
			</Select>
			<NavLink to="/stakingnodes">
				<Text
					variant="heading4"
					color="main"
				>
					<Trans i18key="goToNodesPage" />
				</Text>
			</NavLink>
		</Box>
	)
}

NodeSelect.displayName = 'NodeSelect';
