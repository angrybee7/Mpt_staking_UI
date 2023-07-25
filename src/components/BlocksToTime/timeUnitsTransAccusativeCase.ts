import { TranslateValue } from "@waves/ui-translator";

export const timeUnitsTransAccusativeCase = (key: string) => {
    const needAccusative = (key === 'weeks' || key === 'minutes') ? 'AccusativeCase' : '';
    return [
        TranslateValue({
            i18nKey: `${key}.one${needAccusative}`,
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
