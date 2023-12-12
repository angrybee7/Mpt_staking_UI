import * as React from 'react';
import { TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { ITransProps, Trans } from '@waves/ui-translator';
import { NodeOption } from './NodeOption.tsx';
import { SelectedWrapper } from 'uikit';
import { INode } from '../../../stores/utils/fetchNodeList.ts';

interface INodeSelected {
	opened: boolean;
	selected?: INode;
	placeholderTrans?: ITransProps;
}

export const NodeSelected: React.FC<INodeSelected & TFlexProps> = ({
	opened,
	selected,
	placeholderTrans = { i18key: 'selectNode' },
	...flexProps
}) => {
	return (
		<SelectedWrapper
			opened={opened}
			label={<Trans i18key="stakingNode" />}
			{...flexProps}
		>
			{selected ?
				<NodeOption
					node={selected}
				/> :
				<Text
					fontSize={15}
					lineHeight="20px"
					fontWeight={600}
					color="text"
				>
					<Trans {...placeholderTrans} />
				</Text>
			}
		</SelectedWrapper>
	)
}

NodeSelected.displayName = 'NodeSelected';
