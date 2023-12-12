import * as React from 'react';
import { DotLoader, Flex } from '@waves.exchange/wx-react-uikit';
import { observer } from 'mobx-react-lite';
import { AppStoreContext } from '../../App.tsx';
import { RightSide } from './components/RightSide/RightSide.tsx';
import { translate } from '@waves/ui-translator';

export const MainPageFC: React.FC = observer(() => {
	const { assetsStore } = React.useContext(AppStoreContext);
	return (
		assetsStore.assetsData.isLoading ? (
			<Flex
				height="100vh"
				width={['100%', '50%']}
				alignItems="center"
				justifyContent="center"
				bg="bg"
			>
				<DotLoader />
			</Flex>
		) : (
			<RightSide />
		)
	)
});

MainPageFC.displayName = 'MainPage';

export const MainPage = translate('app.page')(MainPageFC);
