import * as React from 'react';
import { Box, Flex } from '@waves.exchange/wx-react-uikit';
import mainBg from '../../../img/mainBg.svg';
import { LeftSide } from '../LeftSide/LeftSide.tsx';
import { Outlet } from 'react-router-dom';
import { translate } from '@waves/ui-translator';

export const MainLayoutFC: React.FC = () => {
	return (
		<Box height="100%" position="relative" sx={{ px: ['0', '40px'] }}>
			<Box
				position="absolute"
				top={0}
				left={0}
				display={['none', 'block']}
				width="100%"
				height="100vh"
				backgroundImage={`url(${mainBg})`}
				backgroundRepeat="no-repeat"
				backgroundPosition="bottom"
			/>
			<Flex
				position="relative"
				minHeight="100%"
				width="100%"
				flexDirection={['column-reverse', 'row']}
			>
				<LeftSide />
				<Outlet />
			</Flex>
		</Box>
	)
}

MainLayoutFC.displayName = 'MainLayout';

export const MainLayout = translate('app.page')(MainLayoutFC);
