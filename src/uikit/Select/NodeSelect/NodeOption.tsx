import * as React from 'react';
import { Box, Flex, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { Text } from 'uikit';
import { shortAddress } from '../../../utils';
import { INode } from '../../../stores/utils/fetchNodeList.ts';

interface INodeOption {
	node: INode;
	onClick?: (node: INode) => void;
}

const getAddress = (address: string): string => {
	const elem = document.getElementById(`node-option-container-${address}`);
	if (!elem) {
		return address;
	}
	const children = elem.children;
	const containerWidth = elem.getBoundingClientRect().width;
	const innerWidth = [...children].reduce((acc, child) => {
		const width = child.getBoundingClientRect().width;
		return acc + width;
	}, 0);
	if (innerWidth > containerWidth) {
		return shortAddress(address);
	} else {
		return address;
	}
}

export const NodeOption: React.FC<INodeOption & Omit<TFlexProps, 'onClick'>> = ({
	node,
	onClick,
	...flexProps
}) => {
	const handleClick = React.useCallback((): void => {
		if (typeof onClick === 'function') {
			onClick(node);
		}
	}, [onClick, node]);

	const [_address, setAddress] = React.useState<string>('');

	React.useEffect((): void => {
		setAddress(getAddress(node.address));
	}, [node.address]);

	return (
		<Flex
			id={`node-option-container-${node.address}`}
			flexDirection="row"
			alignItems="flex-start"
			justifyContent="flex-start"
			flexWrap="wrap"
			width="100%"
			onClick={handleClick}
			sx={
				onClick ?
					{
						'&:hover': {
							bg: 'bg'
						},
						cursor: 'pointer'
					} : {}
			}
			{...flexProps}
		>
			<Box
				width={24}
				height={24}
				backgroundImage={`url(${node.img})`}
				backgroundRepeat="no-repeat"
				backgroundSize="contain"
				mr={8}
				mb={4}
			/>
			<Flex
				flexDirection="column"
				alignItems="flex-start"
				justifyContent="flex-start"
				mr={8}
			>
				<Text
					variant="heading3"
					color="text"
				>
					{node.name}
				</Text>
				<Text
					variant="text1"
					color="textsec"
					fontFamily="Sfmono"
				>
					{_address || node.address}
				</Text>
			</Flex>
		</Flex>
	)
}

NodeOption.displayName = 'NodeOption';
