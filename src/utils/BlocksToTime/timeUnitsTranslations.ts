import { TranslateValue } from "@waves/ui-translator";

export const timeUnitsTranslations = (key: string) => {
    return [
        TranslateValue({
            i18nKey: `${key}.one`,
            ns: 'app.page'
        }),
        TranslateValue({
            i18nKey: `${key}.some`,
            ns: 'app.page'
        }),
        TranslateValue({
            i18nKey: `${key}.any`,
            ns: 'app.page'
        }),
    ];
};
