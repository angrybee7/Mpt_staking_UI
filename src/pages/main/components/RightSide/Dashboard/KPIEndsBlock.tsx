import * as React from 'react';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper';
import { BoxProps, Flex } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { BlocksToTime } from '../../../../../components/BlocksToTime';

interface IKPIEndsBlockProps {
	blocks: number;
}

export const KPIEndsBlock: React.FC<IKPIEndsBlockProps & BoxProps> = ({
	blocks,
	...rest
}) => {
	return (
		<SerifWrapper
			py={[16, 24]}
			px={24}
			{...rest}
		>
			<Flex
				flexDirection="column"
			>
				<Text
					as="div"
					variant="text1"
				>
					<Trans i18key="kpiPeriodEnds" />
				</Text>
				<Text
					as="div"
					fontSize={28}
					lineHeight="39px"
					fontWeight={500}
					color="main"
				>
					{'~ '}
					{BlocksToTime({
						blocks: Math.max(blocks, 0),
						options: {
							shortFormat: true,
							isZero: blocks <= 0,
						}
					})}
					{` (${Math.max(blocks, 0)} blocks)`}
				</Text>
			</Flex>
		</SerifWrapper>
	)
}

KPIEndsBlock.displayName = 'KPIEndsBlock';
