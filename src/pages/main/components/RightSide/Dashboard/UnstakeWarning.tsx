import * as React from 'react';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { Flex, Icon } from '@waves.exchange/wx-react-uikit';
import { warning } from '../../../../../img/icons/warning.tsx';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../../../../../App.tsx';
import { BlocksToTime } from '../../../../../components/BlocksToTime';

export const UnstakeWarning: React.FC = observer(() => {
	const { contractStore } = React.useContext(AppStoreContext)
	return (
		<SerifWrapper
			variant="warning"
		>
			<Flex
				flexDirection="row"
				alignItems="center"
				py={[6, 5]}
				px={23}
				bg="standard.$0"
			>
				<Icon
					icon={warning}
					size={24}
					mr={14}
				/>
				<Text
					as="div"
					color="text"
					fontSize={15}
					lineHeight="21px"
					fontWeight={300}
				>
					{contractStore.totalAssetsContractData?.data.remainingBlocks === 0 ?
						<Trans i18key="unstakeUnavailable" /> :
						<Trans
							i18key="unstakeWillBeUnavailable"
							i18Params={{
								timer: BlocksToTime({
									blocks: Math.max(contractStore.totalAssetsContractData?.data.remainingBlocks, 0),
									options: {
										useYears: true,
										useMonth: true,
										useWeeks: true,
										showTime: true,
										shortFormat: true,
										isZero: Math.max(contractStore.totalAssetsContractData?.data.remainingBlocks, 0) === 0,
										split: ' '
									}
								})
							}}
						/>
					}
				</Text>
			</Flex>
		</SerifWrapper>
	)
})

UnstakeWarning.displayName = 'UnstakeWarning';
