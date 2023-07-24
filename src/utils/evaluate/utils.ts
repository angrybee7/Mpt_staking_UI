
export type TStringValue = {
    type: 'String';
    value: string;
};

export type TIntValue = {
    type: 'Int';
    value: number;
};

export type TArrayValue = Array<TIntValue | TStringValue>;

export type TObjectValue = Record<string, TIntValue | TStringValue>

export interface ITupleValue<TValue = string | TArrayValue | TObjectValue> {
    '_1': {
        type: string;
        value: Array<unknown>;
    };
    '_2': {
        type: 'String' | 'Array' | 'Tuple';
        value: TValue;
    };
}

export interface ITuple<TValue = string> {
    address: string;
    complexity: number;
    expr: string;
    result: {
        type: 'Tuple';
        value: ITupleValue<TValue>;
    };
    error?: number;
}

export function parseSearchStr<T>(value: string, MAP: Array<string>): T {
    const data = value.split('__');
    const placeholder = data[0];
    return data.splice(1)
        .reduce((acc, item, index) => {
            const type = placeholder[index * 2] + placeholder[index * 2 + 1];
            acc[MAP[index]] = type === '%s' ? item : Number(item);
            return acc;
        }, Object.create(null));
}

export function parseArrOfSearchStr<T>(values: TArrayValue, MAP: Array<string>): T[] {
    return values.map(({ value }) => parseSearchStr<T>(value.toString(), MAP));
}

export const getTupleValue = <T = string | TArrayValue>(data: ITuple<T>): T => { // todo something like ITupleValue['_2']['value']
    // eslint-disable-next-line dot-notation
    return data.result.value['_2'].value;
};

type StringOrArr<T, K> = K extends string
    ? T
    : T[];

export function parseTupleData<T, K = string | TArrayValue | TObjectValue>(
    data: ITuple<K>, MAP: Array<string>
): StringOrArr<T, K> {
    const tupleValue = getTupleValue<K>(data);
    if (typeof tupleValue === 'string') {
        return parseSearchStr<T>(tupleValue, MAP) as StringOrArr<T, K>;
    } else if (Array.isArray(tupleValue)) {
        return parseArrOfSearchStr<T>(tupleValue as unknown as TArrayValue, MAP) as StringOrArr<T, K>;
    } else {
        return Object.values(tupleValue).reduce((acc, { type, value }, i) => {
            const key = MAP[i];
            if (key) {
                acc[key] = type === 'Int' ? Number(value) : value;
            }
            return acc;
        }, Object.create(null));
    }
}
