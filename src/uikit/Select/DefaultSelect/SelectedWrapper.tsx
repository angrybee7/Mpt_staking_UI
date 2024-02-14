import * as React from 'react';
import { Flex, Icon, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { chevron } from '../../../img/icons/chevron.tsx';

interface ISelectedWrapper {
	opened: boolean;
	children: React.ReactNode;
	label?: React.ReactNode;
}

export const SelectedWrapper: React.FC<ISelectedWrapper & TFlexProps> = ({
	opened,
	children,
	label,
	...flexProps
}) => {
	return (
		<Flex
			flexDirection="column"
			alignItems="flex-start"
			justifyContent="center"
			px={16}
			py={14}
			{...flexProps}
		>
			<Text
				variant="text2"
				color="text"
				mb={2}
			>
				{label}
			</Text>
			<Flex
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
				width="100%"
			>
				{children}
				<Icon
					icon={chevron}
					color="icon"
					transition="transform .3s"
					sx={{
						transform: opened ? 'rotate(-180deg)' : 'rotate(0deg)',
					}}
					size={18}
					ml={8}
				/>
			</Flex>
		</Flex>
	)
}

SelectedWrapper.displayName = 'SelectedWrapper';
