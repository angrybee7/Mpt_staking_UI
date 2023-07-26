interface IEvaluateParams {
    address: string; // Address of the deployed dApp contract
    expr: string; // Expression to evaluate
}

export interface IEvaluateResponse extends IEvaluateParams {
    complexity: number;
    result?: {
        type: string;
        value: unknown;
    };
    error?: number;
    message?: string;
}
