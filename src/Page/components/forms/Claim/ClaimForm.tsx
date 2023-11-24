import * as React from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import {
	Button,
	FeeComponent,
	MultiErrorComponent,
	Text,
	Tooltip,
} from 'uikit';
import { AppStoreContext } from '../../../../App';
import { Observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { SerifWrapper } from '../../../../components/SerifWrapper/SerifWrapper';
import { Trans } from '@waves/ui-translator';
import { BalanceRow } from '../../../../components/BalanceComponent/BalanceRow';
import { devices } from '../Stake/StakeForm.tsx';
import { FORM_STATE } from '../../../../stores/utils/BaseFormStore.ts';
import { DotSpinner } from '../../../../components/DotSpinner/DotSpinner.tsx';
import { ClaimStore } from './ClaimStore.ts';

export const ClaimForm: React.FC = () => {
	const rs = React.useContext(AppStoreContext);

	const claimStore = React.useMemo(() => {
		return new ClaimStore(rs);
	}, []);

	return (
		<Observer>
			{(): ReactElement => {
				return (
					<SerifWrapper px={['16px', '24px']} py="24px" as='form'>
						<Text as="div" variant="heading2" sx={{ mb: '16px' }}>
							<Trans i18key="availableForClaim" />
						</Text>
						<Flex flexDirection="column">
							<BalanceRow
								balance={claimStore.availableForClaim?.getTokens()?.gt(0) ?
									claimStore.availableForClaim?.getTokens()?.toFormat() :
									'0.00'
								}
								label={{ i18key: 'accrued' }}
								ticker={rs.assetsStore.LPToken?.displayName}
							/>
							<FeeComponent my="16px" />
							<MultiErrorComponent activeErrors={claimStore.activeErrors} />
							<Tooltip
								variant="info"
								label={(): React.ReactNode => {
									return <Trans i18key="claimIsUnavailable" />;
								}}
								isOpen={claimStore.isClaimAvailable ? false : undefined}
							>
								<Box
									maxWidth={
										claimStore.formState === FORM_STATE.pending ?
											'none' :
											['300px', '200px']
									}
								>
									<Button
										variant="primary"
										variantSize="large"
										onClick={claimStore.invoke}
										disabled={claimStore.isButtonDisabled}
										maxWidth={
											claimStore.formState === FORM_STATE.pending ?
												'none' :
												['300px', '200px']
										}
									>
										<Box fontSize={[devices[rs.authStore.user.type] ? '14px' : null, 'inherit']}>
											<Trans
												i18key={claimStore.formState === FORM_STATE.pending ?
													devices[rs.authStore.user.type] ? 'waitingConfirmation' : 'waiting' :
													'claim'
												}
												i18Params={{ device: devices[rs.authStore.user.type] }}
											/>
											{claimStore.formState === FORM_STATE.pending ?
												<DotSpinner display="inline" /> :
												null
											}
										</Box>
									</Button>
								</Box>
							</Tooltip>
						</Flex>
					</SerifWrapper>
				);
			}}
		</Observer>
	);
};

ClaimForm.displayName = 'ClaimForm';
