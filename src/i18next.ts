import i18n from 'i18next';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .init({
        supportedLngs: ['en'],
        ns: ['app.page'],
        fallbackLng: 'en',
        defaultNS: 'app.page',
        debug: false,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        initImmediate: false,
        preload: false,
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;
