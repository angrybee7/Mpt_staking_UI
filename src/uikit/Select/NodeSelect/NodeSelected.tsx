import * as React from 'react';
import { TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { NodeOption } from './NodeOption.tsx';
import { SelectedWrapper } from 'uikit';
import { INode } from '../../../stores/utils/fetchNodeList.ts';

interface INodeSelected {
	opened: boolean;
	selected?: INode;
}

export const NodeSelected: React.FC<INodeSelected & TFlexProps> = ({
	opened,
	selected,
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
					variant="heading3"
					color="text"
				>
					<Trans i18key="selectNode" />
				</Text>
			}
		</SelectedWrapper>
	)
}

NodeSelected.displayName = 'NodeSelected';
