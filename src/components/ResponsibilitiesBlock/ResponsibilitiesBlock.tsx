import * as React from 'react';
import { Flex, Icon, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { warning } from '../../img/icons/warning.tsx';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';

export const ResponsibilitiesBlock: React.FC<TFlexProps> = ({ ...flexProps }) => {
	return (
		<Flex
			flexDirection="row"
			alignItems="flex-start"
			{...flexProps}
		>
			<Icon
				icon={warning}
				size={24}
				mr={10}
			/>
			<Text
				as="div"
				color="text"
				variant="text1"
			>
				<Trans i18key="responsibilitiesWarning" />
			</Text>
		</Flex>
	)
}

ResponsibilitiesBlock.displayName = 'ResponsibilitiesBlock';
