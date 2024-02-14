import * as React from 'react';
import { TFlexProps } from '@waves.exchange/wx-react-uikit';
import { ListWrapper } from '../DefaultSelect/ListWrapper.tsx';
import { NodeOption } from './NodeOption.tsx';
import { INode } from '../../../stores/utils/fetchNodeList.ts';

interface INodesList {
	nodes: Array<INode>;
	onChangeNode: (node: INode) => void;
	onClickManually?: (value: boolean) => void;
	isError?: boolean;
	isManually?: boolean;
	onChangeInput?: (value: string) => void;
}

export const NodesList: React.FC<INodesList & TFlexProps> = ({
    nodes,
    onChangeNode,
    onClickManually,
    isError,
    isManually,
    onChangeInput,
    ...flexProps
}) => {
    const onClickNode = React.useCallback((node: INode) => {
        if (isManually) {
            if (typeof onClickManually === 'function') {
                onClickManually(false);
            }
            if (typeof onChangeInput === 'function') {
                onChangeInput('');
            }
        }
        onChangeNode(node);
    }, [onChangeNode, onClickManually, isManually, onChangeInput]);

    const onManually = React.useCallback(() => {
        if (typeof onClickManually === 'function') {
            onClickManually(true);
        }
        onChangeNode(undefined);
    }, [onChangeNode, onClickManually]);

    return (
        <ListWrapper
            {...flexProps}
            isError={isError}
        >
            {(isManually || typeof onManually !== 'function') ? null : <NodeOption px={16} py={8} onClick={onManually} isManually={true} />}
            {nodes.map((node) => {
                return (
                    <NodeOption
                        key={node.address}
                        node={node}
                        onClick={onClickNode}
                        px={16}
                        py={8}
                    />
                );
            })}
        </ListWrapper>
    );
};

NodesList.displayName = 'NodesList';
