import * as React from 'react';
import { Flex } from '@waves.exchange/wx-react-uikit';
import { ErrorMessage, Text } from 'uikit';
import { MultiErrorComponent } from 'uikit';

export const ErrorMessageStand: React.FC = () => {
	return (
		<Flex
			flexDirection="column"
			p={12}
		>
			<ErrorMessage
				transProps={{ i18key: 'rejectedByUserDevice', i18Params: { device: 'Metamask'} }}
				mb={12}
			/>
			<ErrorMessage mb={24}>
				<Text>
					Wrong network is selected in the Metamask. Choose the proper network and try again.
				</Text>
			</ErrorMessage>
			<MultiErrorComponent
				activeErrors={[
					{ i18key: 'havenotfee' },
					{ i18key: 'wrongNetworkError', i18Params: { device: 'Metamask'} }
				]}
			/>
		</Flex>
	)
}
