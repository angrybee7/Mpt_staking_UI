import { IEvaluateParams, IEvaluateResponse } from './index';

export const evaluate = (evaluateUrl: string, { address, expr }: IEvaluateParams): Promise<IEvaluateResponse> => {
    return fetch(`${evaluateUrl}/${address}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body:  JSON.stringify({ expr })
    }).then((res) => res.json());
}
