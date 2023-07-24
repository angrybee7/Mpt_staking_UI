import { IEvaluateParams } from './index';

export const evaluate = ({ address, expr }: IEvaluateParams): Promise<string> => {
    return fetch(`${evaluate}/${address}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:  JSON.stringify({ expr })
    }).then((res) => res.json());
}
