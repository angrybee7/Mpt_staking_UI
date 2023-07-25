import * as React from 'react';
import { Button, Flex, Input, Text } from '@waves.exchange/wx-react-uikit';
import { SerifWrapper } from './SerifWrapper.tsx';
import { Trans } from '@waves/ui-translator';

export const SerifWrapperExamples: React.FC = () => {
	const [value, setValue] = React.useState('Nothing');
	return (
		<Flex
			flexDirection="column"
			bg="#fff"
			p={32}
		>
			<SerifWrapper
				mb={32}
				p={24}
				backgroundColor="bg"
			>
				<Text color="#1E1E1E">
					<Trans i18key="legalDisclaimer.desc1" />
				</Text>
			</SerifWrapper>

			<SerifWrapper
				mb={32}
				backgroundColor="bg"
				width="fit-content"
			>
				<Button
					sx={{
						backgroundColor: "transparent !important"
					}}
				>
					<Text color="#1E1E1E">
						<Trans i18key="continue" />
					</Text>
				</Button>
			</SerifWrapper>

			<SerifWrapper
				mb={32}
				p={24}
				backgroundColor="bg"
			>
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					sx={{
						backgroundColor: "transparent !important",
						color: '#1E1E1E !important'
					}}
				/>
			</SerifWrapper>
		</Flex>
	)
}
