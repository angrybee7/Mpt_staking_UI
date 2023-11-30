import * as React from 'react';
import { BoxProps, Placement, Select as WxSelect } from '@waves.exchange/wx-react-uikit';
import { SerifWrapper } from '../../../components/SerifWrapper/SerifWrapper.tsx';

export interface ISelectParams extends BoxProps {
	renderSelected: (options: {
		opened: boolean;
		isDisabled?: boolean;
		isError?: boolean;
	}) => React.ReactNode;
	isDisabled?: boolean;
	isError?: boolean;
	placement?: Placement;
	children?: React.ReactNode;
}

export const Select: React.FC<ISelectParams> = ({
	renderSelected,
	isError,
	isDisabled,
	placement,
	children,
	...boxProps
}) => {
	const {
		mx,
		my,
		mt,
		mr,
		mb,
		ml,
		width,
		maxWidth,
		...restProps
	} = boxProps;
	return (
		<SerifWrapper
			sx={{ mx, my, mt, mr, mb, ml, width, maxWidth, position: 'relative' } as any}
			variant={isError? 'error' : 'default'}
		>
			<WxSelect
				renderSelected={renderSelected}
				isDisabled={isDisabled}
				isError={isError}
				placement={placement}
				bg="#FFFFFF"
				{...restProps}
			>
				{children}
			</WxSelect>
		</SerifWrapper>
	)
}
