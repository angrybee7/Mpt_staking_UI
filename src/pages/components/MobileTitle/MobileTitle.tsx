import * as React from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import logo from '/src/img/mpt-logo.svg';
import { Text } from 'uikit';
import { Trans } from '@waves/ui-translator';

export const MobileTitle: React.FC = () => {
	return (
		<Flex
			sx={{
				flexDirection: 'column',
				alignItems: 'center',
				py: '32px',
				px: '32px',
				display: ['flex', 'none']
			}}
		>
			<Box
				width="62px"
				height="62px"
				minHeight="62px"
				backgroundImage={`url(${logo})`}
				backgroundSize="100% 100%"
				sx={{
					mb: '24px'
				}}
			/>
			<Text
				as="div"
				fontSize="38px"
				lineHeight="42px"
				color="#1E1E1E"
				sx={{
					my: '0',
					fontWeight: 300,
					fontFamily: 'Sfmono-light',
					textAlign: 'center',
					display: ['block', 'none']
				}}
			>
				<Trans i18key="mptMainTitle" />
			</Text>
		</Flex>
	)
}

MobileTitle.displayName = 'MobileTitle';
