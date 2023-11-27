import * as React from 'react';
import { Box, Flex, TFlexProps } from '@waves.exchange/wx-react-uikit';
import { SerifWrapper } from '../../../components/SerifWrapper/SerifWrapper.tsx';

interface IListWrapper {
	children: React.ReactNode;
	isError?: boolean;
}

export const ListWrapper: React.FC<IListWrapper & TFlexProps> = ({
	children,
	isError,
	...flexProps
}) => {
	return (
		<SerifWrapper
			width="calc(100% + 2px)"
			left={-1}
			sx={{
				'&:before, &:after': {
					borderTop: 'none',
					height: 'calc(100% + 2px)'
				}
			}}
			variant={isError? 'error' : 'default'}
		>
			<Box
				maxHeight={230}
				overflow="auto"
			>
				<Flex
					flexDirection="column"
					alignItems="flex-start"
					justifyContent="center"
					bg="#FFFFFF"
					{...flexProps}
				>
					{children}
				</Flex>
			</Box>
		</SerifWrapper>
	)
}

ListWrapper.displayName = 'ListWrapper';
