import { getTimeUnitStr } from './helpers';

interface IOptions {
    split?: string; // разделитель
    useYears?: boolean; // начать выводить с года
    useMonth?: boolean; // начать выводить с месяцев
    useWeeks?: boolean; // начать выводить с недель
    useDays?: boolean; // начать выводить с дней
    useHours?: boolean; // начать выводить с часов
    shortFormat?: boolean; // использовать формат 2w${split}3d${split}4h${split}5m
    isMinut?: boolean; // вывод текста в множественном числе 'минут'
    isZero?: boolean; // вывод нуля в значении времени
    showTime?: boolean; // показывать часы и минуты
    accusativeCase?: boolean; // вывод текста в винительном падеже
}

interface IBlocksToTime {
    blocks: number; // 1 block = 1 minute
    options?: IOptions;
}

const M = 60;
const H = 24;
const D = H * M;
const W = D * 7;
const MONTH = D * 30.42;
const Y = D * 365;

export const BlocksToTime = ({ blocks, options }: IBlocksToTime) => {
    const {
        split = ', ',
        useYears = true,
        useMonth = true,
        useWeeks = true,
        useDays = true,
        useHours = true,
        shortFormat = false,
        isMinut = false,
        isZero = false,
        showTime = true,
        accusativeCase = false
    } = { ...options };

    const years = useYears ? Math.floor(blocks / Y) : 0;
    const months = useMonth && useYears ? Math.floor((blocks - years * Y) / MONTH) : 0;
    const restBlocks = blocks - years * Y - months * MONTH;
    const d = {
        years,
        months,
        weeks: useWeeks && useDays && useHours ? Math.floor(restBlocks / W) : 0,
        days: useDays && useHours ? Math.floor((useWeeks ? (restBlocks % W) : restBlocks) / D) : 0,
        hours: useHours ? Math.floor((useDays ? (restBlocks % D) : restBlocks) / M) : 0,
        minutes: useHours ? Math.floor(restBlocks % M) : (restBlocks)
    };
    const commonParams = { shortFormat, isMinut, accusativeCase };

    return [
        getTimeUnitStr({ value: d.years, key: 'years', ...commonParams }),
        getTimeUnitStr({ value: d.months, key: 'months', ...commonParams }),
        getTimeUnitStr({ value: d.weeks, key: 'weeks', ...commonParams }),
        getTimeUnitStr({ value: d.days, key: 'days', ...commonParams }),
        showTime ? getTimeUnitStr({ value: d.hours, key: 'hours', ...commonParams }) : null,
        showTime ? getTimeUnitStr({ value: d.minutes, key: 'minutes', ...commonParams, isZero }) : null
    ].filter((item) => !!item).join(split);
};
