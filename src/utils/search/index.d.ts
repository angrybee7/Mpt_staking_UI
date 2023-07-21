export interface IStateData<T> {
    address: string;
    key: string;
    height: number;
    value: T;
}

export interface IState<T = string> {
    entries: Array<IStateData<T>>;
    has_next_page: boolean;
}
