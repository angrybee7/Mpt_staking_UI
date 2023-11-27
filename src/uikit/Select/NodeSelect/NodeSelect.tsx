import * as React from 'react';
import { ISelectParams, Select } from '../DefaultSelect';
import { INode } from '../../../stores/contract/nodesUtils.ts';
import { NodeSelected } from './NodeSelected.tsx';
import { NodesList } from './NodesList.tsx';

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
	React.useEffect((): void => {
		if (nodes?.length === 1) {
			onChangeNode(nodes[0]);
		}
	}, [onChangeNode, nodes]);
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
