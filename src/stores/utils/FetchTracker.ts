import { action, makeObservable, observable, runInAction } from 'mobx';
import { Poll } from './Poll';

interface FetchTrackerProps<T, K> {
    fetchUrl: string;
    fetcher?: (url?: string, options?: RequestInit) => Promise<K>;
    preloadData?: T;
    refreshInterval?: number;
    options?: RequestInit;
    parser?: (data: K) => T;
    autoFetch?: boolean;
}

export class FetchTracker<T, K> {
    // T - data type, K - fetch response type

    public data: T = Object.create(null);
    public isLoading = true;
    public error: any;
    public isFirstLoad = true;

    private fetcher: FetchTrackerProps<T, K>['fetcher'] = (fetchUrl, options) =>
        fetch(fetchUrl, options).then(
            (res) => res.json() as unknown as Promise<K>
        );

    private poll: Poll<void> | undefined;
    private fetchUrl: FetchTrackerProps<T, K>['fetchUrl'];
    private options: FetchTrackerProps<T, K>['options'];
    private refreshInterval: FetchTrackerProps<T, K>['refreshInterval'];
    private parser: FetchTrackerProps<T, K>['parser'];

    constructor(args?: FetchTrackerProps<T, K>) {
        makeObservable(this, {
            data: observable,
            isLoading: observable,
            error: observable,
            setOptions: action,
        });

        if (args) {
            this.setOptions(args);
        }
    }

    public setOptions(args: FetchTrackerProps<T, K>) {
        const {
            fetchUrl,
            fetcher,
            options,
            parser,
            autoFetch = false,
            refreshInterval,
            preloadData,
        } = args;
        if (fetcher) {
            this.fetcher = fetcher;
        }

        if (preloadData) {
            this.data = preloadData;
        }
        this.fetchUrl = fetchUrl;
        this.options = options;
        this.parser = parser;
        this.refreshInterval = refreshInterval;

        if (autoFetch) {
            this.isLoading = true;
            this.load();
        }
    }

    public load(): Promise<void> {
        const _load = () =>
            this.fetcher(this.fetchUrl, this.options)
                .then((data) => {
                    runInAction(() => {
                        if (typeof this.parser === 'function') {
                            this.data = this.parser(data);
                        } else {
                            this.data = data as unknown as T;
                        }
                        this.error = null;
                        this.isLoading = false;
                        this.isFirstLoad = false;
                    });
                })
                .catch((e) => {
                    runInAction(() => {
                        this.error = e;
                        this.isFirstLoad = false;
                    });
                });

        if (typeof this.refreshInterval === 'number') {
            this.poll = new Poll<void>(
                {
                    get: () => _load(),
                    set: () => {
                        null;
                    },
                },
                this.refreshInterval,
                true
            );

            return this.poll.play();
        } else {
            return _load();
        }
    }

    off(): void {
        if (this.poll) {
            this.poll.destroy();
        }
    }
}
