import * as React from 'react';
import { Box, Flex, Icon, TFlexProps } from '@waves.exchange/wx-react-uikit';
import keeper from '/src/img/keeper.svg';
import metamask from '/src/img/metamask.svg';
import { cross } from '../../../img/icons/cross.tsx';
import { DEVICES_FULL_NAMES, TYPE_DEVICES_NAMES } from '../../../utils/helpersInformationDevices.tsx';

interface IDeviceIcon extends TFlexProps {
	device: TYPE_DEVICES_NAMES;
	variant?: 'default' | 'error';
}

export const DeviceIcon: React.FC<IDeviceIcon> = ({
	device,
	variant = 'default',
	...rest
}) => {
	const { deviceIconUrl } = React.useMemo(() => {
		switch (device) {
			case DEVICES_FULL_NAMES.KeeperWallet:
				return ({ deviceIconUrl: keeper });
			case DEVICES_FULL_NAMES.MetaMask:
				return ({ deviceIconUrl: metamask });
			default:
				return ({ deviceIconUrl: keeper });
		}
	}, []);

	return (
		<Flex
			alignItems="center"
			justifyContent="center"
			position="relative"
			borderRadius="100%"
			width="48px"
			height="48px"
			{...(rest as any)}
		>
			{deviceIconUrl && (
				<Box
					width="100%"
					height="100%"
					backgroundImage={`url(${deviceIconUrl})`}
					backgroundPosition="center"
					backgroundRepeat="no-repeat"
					backgroundSize="contain"
				/>
			)}

			{variant === 'error' && (
				<Icon
					icon={cross}
					size={30}
					position="absolute"
					right={-14}
					bottom={-9}
				/>
			)}
		</Flex>
	);
};

Icon.displayName = 'Icon';
