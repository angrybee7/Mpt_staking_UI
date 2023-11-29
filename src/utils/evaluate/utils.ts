
export type TStringValue = {
    type: 'String';
    value: string;
};

export type TIntValue = {
    type: 'Int';
    value: number;
};

export type TArrayValue = Array<TIntValue | TStringValue>;

export type TArrayValues = {
    type: 'Array';
    value: TArrayValue;
}

export type TObjectValue = Record<string, TIntValue | TStringValue | TArrayValues>

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

type StringOrArrOrObj<T, K> = K extends string ?
    T :
    K extends object ? T : T[];

export function parseOrderedTupleValue(
    values: { ['_index']: TStringValue | TIntValue | TArrayValues },
    MAP: Array<string>
) {
    return Object.entries(values).reduce((acc, [valueKey, { type, value }]) => {
        const index = Number(valueKey.replace('_', ''));
        const key = MAP[index - 1];
        if (key) {
            acc[key] = type === 'Int' ?
                Number(value) :
                type === 'Array' ?
                    (value as TArrayValue).map(({ value }) => value) :
                    value;
        }
        return acc;
    }, Object.create(null));
}

export function parseTupleData<T, K = string | TArrayValue | TObjectValue | TArrayValues>(
    data: ITuple<K>,
    MAP: Array<string>,
    parseTupleFunc?: (tuple: K, MAP: Array<string>) => unknown
): StringOrArrOrObj<T, K> {
    const tupleValue = getTupleValue<K>(data);
    if (typeof parseTupleFunc === 'function') {
        return parseTupleFunc(tupleValue, MAP) as StringOrArrOrObj<T, K>;
    } else if (typeof tupleValue === 'string') {
        return parseSearchStr<T>(tupleValue, MAP) as StringOrArrOrObj<T, K>;
    } else if (Array.isArray(tupleValue)) {
        return parseArrOfSearchStr<T>(tupleValue as unknown as TArrayValue, MAP) as StringOrArrOrObj<T, K>;
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
