import * as React from 'react';
import { Box, Flex, Icon } from '@waves.exchange/wx-react-uikit';
import { UserInfo } from '../main/components/RightSide/UserInfo.tsx';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../../App.tsx';
import { SerifWrapper } from '../../components/SerifWrapper/SerifWrapper.tsx';
import { Button, Text } from 'uikit';
import { NavLink, useNavigate } from 'react-router-dom';
import { accordionArrow } from 'uikit';
import { Trans } from '@waves/ui-translator';
import { NodeOption } from 'uikit';
import { MobileTitle } from '../components/MobileTitle/MobileTitle.tsx';

export const StakingNodesPage: React.FC = observer(() => {
	const { authStore, configStore } = React.useContext(AppStoreContext);
	const navigate = useNavigate();
	return (
		<Flex
			flexDirection="column"
			width={['100%', '50%']}
		>
			<MobileTitle />
			{authStore.isAuthorized &&
				<UserInfo
					onLogout={() => navigate('/')}
				/>
			}
			<Flex
				flexDirection="column"
				flex={1}
			>
				<Flex
					flexDirection="column"
					backgroundColor="bg"
					sx={{
						flex: 1,
						px: ['20px', '60px'],
					}}
				>
					<Box
						width="100%"
						height={['0', '30px']}
						borderLeft={['none', '1px solid #C6DAE6']}
						sx={{ my: ['12px', '16px'] }}
					/>
					<SerifWrapper
						px={[8, 27]}
						py={[16, 24]}
						mb={[0, 24]}
					>
						<Flex
							flexDirection="row"
							alignItems="center"
							justifyContent="flex-start"
							mb={24}
						>
							<NavLink to='/'>
								<Button
									variant="transparent"
									variantSize="large"
									wrapperProps={{
										backgroundColor: 'standard.$0'
									}}
								>
									<Icon
										icon={accordionArrow}
										color="main"
										sx={{ transform: 'rotate(-90deg)', }}
										size={14}
									/>
								</Button>
							</NavLink>
							<Text
								variant="heading2"
								color="text"
								ml={16}
							>
								<Trans i18key="stakingNodes" />
							</Text>
						</Flex>
						<Flex
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
						>
							{configStore.nodeList.map((node) => {
								return (
									<SerifWrapper
										key={node.address}
										width="100%"
										py={[9, 14]}
										px={[14, 16]}
										backgroundColor="standard.$0"
										sx={{
											'&:not(:last-of-type)': {
												mb: 16
											}
										}}
									>
										<NodeOption node={node} />
									</SerifWrapper>
								)
							})}
						</Flex>
					</SerifWrapper>
				</Flex>
			</Flex>
		</Flex>
	)
})

StakingNodesPage.displayName = 'StakingNodesPage';
