import BigNumber from '@waves/bignumber';
import { timeUnitsTranslations } from './timeUnitsTranslations';
import { timeUnitsTransAccusativeCase } from './timeUnitsTransAccusativeCase';

interface IGetTranslationProps {
    value: number;
    key: string;
    isMinut?: boolean;
    accusativeCase?: boolean;
}

const getTranslation = ({ value, key, isMinut, accusativeCase }: IGetTranslationProps) => {
    const forms = accusativeCase ?
        timeUnitsTransAccusativeCase(key) :
        timeUnitsTranslations(key);
    const a = Math.abs(value) % 100;
    const b = a % 10;
    if (isMinut) {
        return forms[2]();
    }
    if (a > 10 && a < 20) {
        return forms[2]();
    }
    if (b > 1 && b < 5) {
        return forms[1]();
    }
    if (b === 1) {
        return forms[0]();
    }
    return forms[2]();
};

interface IGetTimeUnitTextProps extends IGetTranslationProps {
    shortFormat: boolean;
    isZero?: boolean;
}

export const getTimeUnitText = ({ value, key, shortFormat, isMinut, accusativeCase }: IGetTimeUnitTextProps): string => {
    const translation = getTranslation({ value, key, isMinut, accusativeCase });
    return shortFormat && translation ? translation[0] : translation;
};

export const getTimeUnitStr = ({ value, key, shortFormat, isMinut, accusativeCase, isZero }: IGetTimeUnitTextProps): string => {
    const valueTime = isZero ? new BigNumber(0).toFormat() : new BigNumber(value).toFormat();
    const formattedValue = `${valueTime}${!shortFormat ? ' ' : ''}${getTimeUnitText({ value, key, shortFormat, isMinut, accusativeCase })}`;

    if (isZero || value) {
        return formattedValue;
    }

    return '';
};
