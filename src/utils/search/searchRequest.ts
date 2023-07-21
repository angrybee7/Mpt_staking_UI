import { IState } from './index';

export async function search<T = string>(
    url: string,
    filterObject: Record<string, any>,
    getFullState = false
): Promise<IState<T>> {
    // eslint-disable-next-line prefer-const
    let { entries, has_next_page } = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(filterObject),
    }).then((res) => res.json());

    if (getFullState && has_next_page) {
        const limit = filterObject?.limit || 100;
        let offset = filterObject?.offset || 0;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            offset += 100;
            const { entries: resEntries, has_next_page } = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({ ...filterObject, limit, offset }),
            }).then((res) => res.json());

            entries.push(...resEntries);

            if (!has_next_page) {
                break;
            }
        }

        has_next_page = false;
    }

    return { entries, has_next_page };
}

