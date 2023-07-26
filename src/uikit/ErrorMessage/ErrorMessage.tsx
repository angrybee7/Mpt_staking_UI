import * as React from 'react';
import { Text, BoxProps, Box } from '@waves.exchange/wx-react-uikit';
import { ITransProps, Trans } from '@waves/ui-translator';

interface IErrorMessageProps extends BoxProps {
	children?: React.ReactNode;
	transProps?: ITransProps;
}

const ErrorMessageFC: React.FC<IErrorMessageProps> = ({
	transProps,
	children,
	...rest
}) => {
	return (
		<Box {...rest as any}>
			<Text
				position="relative"
				color="error"
				fontSize={13}
				lineHeight="18px"
				pl={12}
				sx={{
					'&::before': {
						content: '""',
						display: 'block',
						width: '3px',
						height: '5px',
						backgroundColor: 'error',
						position: 'absolute',
						top: '9px',
						left: '0',
						transform: 'translate(0, -50%)',
					}
				}}
			>
				{transProps ? <Trans {...transProps} /> : null}
				{children}
			</Text>
		</Box>
	);
};

ErrorMessageFC.displayName = 'ErrorMessage';
export const ErrorMessage = React.memo(ErrorMessageFC);
