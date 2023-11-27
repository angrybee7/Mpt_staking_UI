import * as React from 'react';
import { TFlexProps } from '@waves.exchange/wx-react-uikit';
import { ListWrapper } from '../DefaultSelect/ListWrapper.tsx';
import { INode } from '../../../stores/contract/nodesUtils.ts';
import { NodeOption } from './NodeOption.tsx';

interface INodesList {
	nodes: Array<INode>;
	onChangeNode: (node: INode) => void;
	isError?: boolean;
}

export const NodesList: React.FC<INodesList & TFlexProps> = ({
	nodes,
	onChangeNode,
	isError,
	...flexProps
}) => {
	return (
		<ListWrapper
			{...flexProps}
			isError={isError}
		>
			{nodes.map((node) => {
				return (
					<NodeOption
						key={node.address}
						node={node}
						onClick={onChangeNode}
						px={16}
						py={8}
					/>
				)
			})}
		</ListWrapper>
	)
}

NodesList.displayName = 'NodesList';
