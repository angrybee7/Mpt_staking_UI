import * as React from 'react';
import { ISelectParams, Select } from '../DefaultSelect';
import { NodeSelected } from './NodeSelected.tsx';
import { NodesList } from './NodesList.tsx';
import { INode } from '../../../stores/utils/fetchNodeList.ts';

interface INodeSelectParams extends Omit<ISelectParams, 'renderSelected'> {
	nodes: Array<INode>;
	onChangeNode: (node: INode) => void;
	initialNode?: INode;
	selectedNode?: INode;
}

export const NodeSelect: React.FC<INodeSelectParams> = ({
	nodes,
	onChangeNode,
	initialNode,
	selectedNode,
	isError,
	...selectProps
}) => {
	const selectFirstNode = React.useCallback((): void => {
		if (
			nodes?.length === 1 &&
			!selectedNode
		) {
			onChangeNode(nodes[0]);
		}
	}, [onChangeNode, nodes, selectedNode]);

	React.useEffect((): void => {
		selectFirstNode();
	}, []);

	return (
		<Select
			renderSelected={({ opened }): React.ReactElement => {
				return (
					<NodeSelected
						opened={opened}
						selected={selectedNode || initialNode}
					/>
				)
			}}
			isError={isError}
			{...selectProps}
		>
			<NodesList
				nodes={nodes}
				onChangeNode={onChangeNode}
				isError={isError}
			/>
		</Select>
	)
}

NodeSelect.displayName = 'NodeSelect';
