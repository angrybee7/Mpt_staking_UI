import * as React from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import {
	Button,
	FeeComponent,
	MultiErrorComponent,
	NodeSelect,
	Text,
} from 'uikit';
import { AppStoreContext } from '../../../../../App.tsx';
import { Observer } from 'mobx-react-lite';
import { ReactElement } from 'react';
import { SerifWrapper } from '../../../../../components/SerifWrapper/SerifWrapper.tsx';
import { Trans } from '@waves/ui-translator';
import { devices } from '../Stake/StakeForm.tsx';
import { FORM_STATE } from '../../../../../stores/utils/BaseFormStore.ts';
import { DotSpinner } from '../../../../../components/DotSpinner/DotSpinner.tsx';
import { ChangeFormNodeStore } from './ChangeFormNodeStore.ts';
import { INode } from '../../../../../stores/utils/fetchNodeList.ts';

export const ChangeNodeForm: React.FC = () => {
	const rs = React.useContext(AppStoreContext);
	const [buttonVariant, setButtonVariant] = React.useState<'primary' | 'secondary'>('primary');

	const changeNodeStore = React.useMemo(() => {
		return new ChangeFormNodeStore(rs);
	}, []);

	const onChangeNode = React.useCallback((node: INode) => {
		changeNodeStore.setNode(node);
		setButtonVariant('secondary');
		setTimeout(() => {
			setButtonVariant('primary');
		}, 500);
	}, []);

	return (
		<Observer>
			{(): ReactElement => {
				return (
					<SerifWrapper px={['16px', '24px']} py="24px" as='form'>
						<Text as="div" variant="heading2" mb={16}>
							<Trans i18key="changeStakingNode" />
						</Text>
						<Text as="div" variant="text1" mb={8}>
							<Trans i18key="currentStakingNode" />
						</Text>
						{
							rs.contractStore.userNode ?
								<>
									<Text as="div" variant="heading3" mb={8}>
										{rs.contractStore.userNode?.name}
									</Text>
									<Text
										as="div"
										variant="text1"
										color="textsec"
										fontFamily="Sfmono"
										maxWidth={300}
										mb={16}
										sx={{
											overflowWrap: 'anywhere'
										}}
									>
										{rs.contractStore.userNode?.address}
									</Text>
								</> :
								<Text as="div" variant="heading3" mb={8}>
									<Trans i18key="noNodeSelected" />
								</Text>
						}
						<NodeSelect
							nodes={
								rs.contractStore.nodes.filter((node) => {
									return (
										node.address !== changeNodeStore.node?.address &&
										node.address !== rs.contractStore.userNode?.address
									);
								})
							}
							selectedNode={changeNodeStore.node}
							onChangeNode={onChangeNode}
							isError={changeNodeStore.isConfirmClicked && !changeNodeStore.node}
							placeholderTrans={{ i18key: 'selectNodeAndClick', ns: 'app.page' }}
						/>
						<Flex flexDirection="column">
							<FeeComponent my="16px" />
							<MultiErrorComponent activeErrors={changeNodeStore.activeErrors} />
							<Button
								variant={buttonVariant}
								variantSize="large"
								onClick={changeNodeStore.invoke}
								disabled={changeNodeStore.isButtonDisabled}
								maxWidth={
									changeNodeStore.formState === FORM_STATE.pending ?
										'none' :
										'322px'
								}
							>
								<Box fontSize={[devices[rs.authStore.user.type] ? '14px' : null, 'inherit']}>
									<Trans
										i18key={changeNodeStore.formState === FORM_STATE.pending ?
											devices[rs.authStore.user.type] ? 'waitingConfirmation' : 'waiting' :
											'changeStakingNode'
										}
										i18Params={{ device: devices[rs.authStore.user.type] }}
									/>
									{changeNodeStore.formState === FORM_STATE.pending ?
										<DotSpinner display="inline" /> :
										null
									}
								</Box>
							</Button>
						</Flex>
					</SerifWrapper>
				);
			}}
		</Observer>
	);
};

ChangeNodeForm.displayName = 'ChangeNodeForm';
