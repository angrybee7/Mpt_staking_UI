import { createContext, useState } from 'react';
import i18n from './i18next';
import { ThemeProvider } from 'emotion-theming';
import { TranslateProvider } from '@waves/ui-translator';
import theme from './theme';
import { ModalContainer } from './components/ModalContainer/ModalContainer';
import { AppStore } from './stores/AppStore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './pages/main';
import { StakingNodesPage } from './pages/stakingNodes';
import { MainLayout } from './pages/components/MainLayout/MainLayout.tsx';

export const AppStoreContext = createContext<AppStore>(null);

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                index: true,
                element: <MainPage />,
            },
            {
                path: 'stakingnodes',
                element: <StakingNodesPage />,
            },
            {
                path: '*',
                element: <MainPage />,
            },
        ]
    },
]);

// eslint-disable-next-line react/display-name
function App() {
    const [appStore] = useState<AppStore>(() => new AppStore());

    return (
        <AppStoreContext.Provider value={appStore}>
            <ThemeProvider theme={theme}>
                <TranslateProvider i18n={i18n}>
                    {/*<Stand />*/}
                    <ModalContainer />
                    <RouterProvider router={router} />
                </TranslateProvider>
            </ThemeProvider>
        </AppStoreContext.Provider>
    );
}

export default App;
