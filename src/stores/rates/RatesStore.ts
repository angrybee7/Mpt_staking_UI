import { ChildStore } from '../ChildStore';
import { AppStore } from '../AppStore';
import { FetchTracker } from '../utils/FetchTracker';
import { IRatesResponse, TRatesHash } from './index';
import { reaction } from 'mobx';
import { createBaseAsset, getPair } from '../../utils/dataEntriesUtils';
import { BigNumber } from '@waves/bignumber';

export class RatesStore extends ChildStore {
    rates: FetchTracker<TRatesHash, IRatesResponse>;

    constructor(rs: AppStore) {
        super(rs);

        this.rates = new FetchTracker<TRatesHash, IRatesResponse>({
            fetchUrl: `${this.rs.configStore.config.apiUrl.rates}`,
            options: {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: this.getRatesBody(),
            },
            parser: this.ratesParser,
            refreshInterval: 30_000,
            autoFetch: true,
        });

        reaction(
            () => this.rs.assetsStore.assetsData.isLoading,
            () => {
                if (!this.rs.assetsStore.assetsData.isLoading) {
                    this.rates.load();
                }
            }
        );
    }

    public static get baseAsset() {
        return createBaseAsset({
            name: 'USD',
            id: 'USD',
            precision: 2,
        });
    }

    public off() {
        this.rates.off();
    }

    private ratesParser({ data }: IRatesResponse): TRatesHash {
        return data.reduce<TRatesHash>((acc, item) => {
            acc[item.pair] = {
                exchange: new BigNumber(item.data.exchange),
                heuristic: new BigNumber(item.data.heuristic),
            };
            return acc;
        }, Object.create(null));
    }

    private getRatesBody(): string {
        const assetsIds = this.rs.configStore.config.assets.map(
            (asset) => asset.id
        );
        const toAsset = 'USD';
        const pairs = assetsIds.map((assetId) => getPair(assetId, toAsset));
        return JSON.stringify({ pairs });
    }
}
