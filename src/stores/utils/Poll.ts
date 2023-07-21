import { Signal } from 'ts-utils';

export class Poll<T> {

    public signals: ISignals<T> = {
        requestSuccess: new Signal<T>(),
        requestError: new Signal<Error>()
    };

    public lastData: T | undefined;
    private readonly _timeout: number;
    private _api: IPollAPI<T>;
    private _timer: number | null = null;
    private _active = false;
    private _delayTimer: number | undefined;
    private _tries = 0;
    private _maxTries: number;
    private _errorTimeout: number | undefined;

    constructor(api: IPollAPI<T>, timeout: number, isStopped?: boolean, errorTimeout?: number, maxTries = 10) {
        this._api = api;
        this._timeout = timeout;
        this._errorTimeout = errorTimeout;
        this._maxTries = maxTries;

        if (!isStopped) {
            this._active = true;
            this._run(this._timer);
        }
    }

    public pause(): void {
        this._active = false;
        this._clear();
    }

    public delayPlay(time = 1000): void {
        clearTimeout(this._delayTimer);
        this._delayTimer = window.setTimeout(() => this.play(), time);
    }

    public play(): Promise<void> {
        this._active = true;
        this._clear();
        return this._run(this._timer);
    }

    public getDataPromise(): Promise<T> {
        if (this.lastData) {
            return Promise.resolve(this.lastData);
        } else {
            return new Promise((resolve, reject) => {
                const s = (data: T): void => {
                    resolve(data);
                     
                    this.signals.requestError.off(r);
                };
                const r = (data: unknown): void => {
                    reject(data);
                     
                    this.signals.requestSuccess.off(s);
                };
                this.signals.requestSuccess.once(s);
                this.signals.requestError.once(r);
            });
        }
    }

    public destroy(): void {
        this._active = false;
        this._clear();
        this._tries = 0;
    }

    public restart(): Promise<void> {
        this._active = true;
        return this._run(this._timer);
    }

    private _run(id: number | null): Promise<void> {
        try {
            return this._api.get().then((data) => {
                this._tries = 0;
                if (this._active && this._timer === id) {
                    if (this._api.set) {
                        this._api.set(data);
                    }
                    this.lastData = data;
                    this.signals.requestSuccess.dispatch(data);
                    this._setTimeout();
                }
            }, (e) => {
                this._tries++;
                if (this._active && this._timer === id) {
                    this.signals.requestError.dispatch(e);
                    this._setTimeout(true);
                }
            });
        } catch (e) {
            this._tries++;
            if (this._active && this._timer === id) {
                this.signals.requestError.dispatch(e as Error);
                this._setTimeout(true);
            }
            return Promise.reject(e);
        }
    }

    private _setTimeout(isError?: boolean): void {
        this._clear();
        let timeout;
        if (isError && this._errorTimeout && this._maxTries > this._tries) {
            timeout = this._errorTimeout;
        } else {
            timeout = this._timeout;
            this._tries = 0;
        }
        this._timer = window.setTimeout(() => this._run(this._timer), timeout);
    }

    private _clear(): void {
        clearTimeout(this._delayTimer);
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

}

export interface IPollAPI<T> {
    get: () => Promise<T>;
    set?: (data: T) => void;
}

export interface ISignals<T> {
    requestSuccess: Signal<T>;
    requestError: Signal<Error>;
}
