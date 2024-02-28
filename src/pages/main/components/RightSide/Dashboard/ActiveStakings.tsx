import * as React from 'react';
import { Button, Text, Tooltip } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { AddressAvatar, Box, Flex } from '@waves.exchange/wx-react-uikit';
import { BalanceRow } from '../../../../../components/BalanceComponent/BalanceRow.tsx';
import { AppStoreContext } from '../../../../../App.tsx';
import { shortAddress } from '../../../../../utils';
import { observer } from 'mobx-react-lite';
import { modalManager } from '../../../../../services/modalManager.ts';
import { MODAL_NAMES } from '../../../../../components/ModalContainer/MODAL_NAMES.ts';

export const ActiveStakings: React.FC = observer(() => {
    const {
		contractStore,
		assetsStore,
	} = React.useContext(AppStoreContext);

    const {
        currentLeased,
        nextLeased
    } = React.useMemo(() => {
        return ({
            currentLeased: contractStore.totalLeased?.current?.getTokens(),
            nextLeased: contractStore.totalLeased?.next?.getTokens(),
        });
    }, [contractStore.totalLeased]);

	const {
		currentToClaim,
		nextToClaim
	} = React.useMemo(() => {
		return ({
			currentToClaim: contractStore.userContractData.data?.currentPeriodAvailableToClaim?.getTokens(),
			nextToClaim: contractStore.userContractData.data?.nextPeriodAvailableToClaim?.getTokens(),
		});
	}, [contractStore.userContractData.data]);

	const onClickUnstake = React.useCallback((address: string) => {
		modalManager.openModal(
			MODAL_NAMES.unstake,
			{ address }
		);
	}, []);

	const onClickClaim = React.useCallback(() => {
		modalManager.openModal(MODAL_NAMES.claim);
	}, []);

    return (
        <SerifWrapper>
			<Box
				sx={{
					py: '24px',
					px:['16px', '24px']
				}}
			>
				<Text
					as="div"
					variant="heading2"
					mb="16px"
				>
					<Trans i18key="activeStakings" />
				</Text>
				<BalanceRow
					// balance={currentLeased?.eq(nextLeased) ?
					//     currentLeased?.toFormat() :
					//     `${currentLeased?.toFormat()} / ${nextLeased?.toFormat()}`
					// }
					balance={`${currentLeased?.toFormat()} / ${nextLeased?.toFormat()}`}
					label={{ i18key: 'totalStaked' }}
					helpTrans={{ i18key: 'totalStakedTooltip' }}
					ticker={assetsStore.LPToken.displayName}
					mb="24px"
				/>
				{contractStore.rewrittenUserNodes.map(({
					   currentLeasingAmount,
					   nextLeasingAmount,
					   nodeAddress
				   }) => {
					const isEq = currentLeasingAmount.getTokens().eq(nextLeasingAmount.getTokens());
					return (
						<SerifWrapper
							key={nodeAddress}
							mb="24px"
							backgroundColor="#ffffff"
						>
							<Box
								sx={{
									py: ['20px', '24px'],
									px:['20px', '24px']
								}}
							>
								<BalanceRow
									balance={isEq ?
										currentLeasingAmount.getTokens().toFormat() :
										`${currentLeasingAmount.getTokens().toFormat()} / ${nextLeasingAmount.getTokens().toFormat()}`
									}
									ticker={assetsStore.LPToken.displayName}
									mb="12px"
								/>
								<Flex alignItems="center" mb="12px">
									<AddressAvatar
										address={nodeAddress}
										variantSize="small"
										tooltipLabels={{ scriptText: '', keepertText: '', ledgerText: '' }}
										display="block"
										width={24}
										height={24}
										mr={8}
									/>
									<Text
										variant="text1"
										color="textsec"
										fontFamily="Sfmono"
									>
										<Text display={['none', 'block']}>
											{nodeAddress}
										</Text>
										<Text display={['block', 'none']}>
											{shortAddress(nodeAddress)}
										</Text>
									</Text>
								</Flex>
								<Button
									variant="transparent"
									variantSize="large"
									width="100%"
									disabled={nextLeasingAmount.getTokens().isZero()}
									boxShadow="0px 8px 20px 0px #3C63AF2B"
									wrapperProps={{ variant: 'default' }}
									onClick={() => onClickUnstake(nodeAddress)}
								>
									<Trans i18key="unstake" />
								</Button>
							</Box>
						</SerifWrapper>
					)
				})}
				{currentToClaim?.gt(0) || nextToClaim?.gt(0) ?
					<SerifWrapper
						mt="40px"
						backgroundColor="#ffffff"
					>
						<Box
							sx={{
								px: ['16px', '24px'],
								py: ['16px', '20px'],
						}}
						>
							<Text
								as="div"
								variant="heading4"
								fontFamily="Sfmono-light"
								color="text"
								sx={{ mb: '8px' }}
							>
								<Trans i18key="unstaked" />
							</Text>
							<BalanceRow
								// balance={currentToClaim?.eq(nextToClaim) ?
								// 	currentToClaim?.toFormat() :
								// 	`${currentToClaim?.toFormat()} / ${nextToClaim?.toFormat()}`
								// }
								balance={`${currentToClaim?.toFormat()} / ${nextToClaim?.toFormat()}`}
								ticker={assetsStore.LPToken.displayName}
								mb="12px"
							/>
							<Tooltip
								variant="info"
								alignSelf="center"
								width="100%"
								placement="top"
								label={(): React.ReactNode => {
									return <Trans i18key="claimTooltip" />;
								}}
								isOpen={
									currentToClaim?.eq(0) && nextToClaim?.gt(0) ?
										undefined :
										false
								}
								sx={{
									' div': {
										maxWidth: 'none'
									}
								}}
							>
								<Box>
									<Button
										variant="transparent"
										variantSize="large"
										width="100%"
										disabled={currentToClaim?.eq(0)}
										boxShadow="0px 8px 20px 0px #3C63AF2B"
										wrapperProps={{ variant: 'default' }}
										onClick={onClickClaim}
									>
										<Trans i18key="claim" />
									</Button>
								</Box>
							</Tooltip>
						</Box>
					</SerifWrapper> :
					null
				}
			</Box>
        </SerifWrapper>
    );
});

ActiveStakings.displayName = 'ActiveStakings';
