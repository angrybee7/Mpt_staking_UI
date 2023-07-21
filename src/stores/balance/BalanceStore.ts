import {
    IBalance,
    TNodeBalanceResponse,
    IWavesBalanceResponse,
} from './interface';
import { FetchTracker } from '../utils/FetchTracker';
import { ChildStore } from '../ChildStore';
import { AppStore } from '../AppStore';
import { computed, makeObservable, reaction } from 'mobx';
import { Money } from '@waves/data-entities';

const POLLING_TIME = 10_000;

export class BalanceStore extends ChildStore {
    private wavesBalance:
        | FetchTracker<Record<string, IBalance>, IWavesBalanceResponse>
        | undefined;
    private otherBalance:
        | FetchTracker<Record<string, IBalance>, TNodeBalanceResponse>
        | undefined;

    constructor(rs: AppStore) {
        super(rs);

        makeObservable(this, {
            balances: computed,
        });

        reaction(
            () => [
                this.rs.assetsStore.assetsData.isLoading,
                this.rs.authStore.isAuthorized,
            ],
            () => {
                if (this.rs.assetsStore.assetsData.isLoading) {
                    return;
                }
                if (this.rs.authStore.isAuthorized) {
                    this.loadBalances();
                } else {
                    this.off();
                }
            }
        );
    }

    public get balances(): Record<string, IBalance> {
        return Object.assign(
            this.wavesBalance?.data || Object.create(null),
            this.otherBalance?.data || Object.create(null)
        );
    }

    public get wavesLpBalance(): IBalance['balance'] {
        return this.balances[this.rs.assetsStore.LPToken.id]?.balance;
    }

    public off() {
        this.wavesBalance?.off();
        this.otherBalance?.off();

        this.wavesBalance = undefined;
        this.otherBalance = undefined;
    }

    public loadBalances() {
        this.wavesBalance = new FetchTracker<
            Record<string, IBalance>,
            IWavesBalanceResponse
        >({
            fetchUrl: `${this.rs.configStore.config.apiUrl.node}/addresses/balance/details/${this.rs.authStore.user?.address}`,
            parser: this.wavesBalancesParser,
            autoFetch: true,
            refreshInterval: POLLING_TIME,
        });

        this.otherBalance = new FetchTracker<
            Record<string, IBalance>,
            TNodeBalanceResponse
        >({
            fetchUrl: `${this.rs.configStore.config.apiUrl.node}/assets/balance/${this.rs.authStore.user?.address}`,
            options: {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ids: this.rs.configStore.config.assets
                        .filter((a) => a.label !== 'WAVES')
                        .map((a) => a.id),
                }),
            },
            autoFetch: true,
            refreshInterval: POLLING_TIME,
            parser: this.otherBalancesParser,
        });
    }

    private wavesBalancesParser = (
        wavesBalance: IWavesBalanceResponse
    ): Record<string, IBalance> => {
        return {
            WAVES: {
                asset: this.rs.assetsStore.WAVES,
                balance: new Money(
                    wavesBalance.available,
                    this.rs.assetsStore.WAVES
                ),
            },
        };
    };

    private otherBalancesParser = (
        data: TNodeBalanceResponse
    ): Record<string, IBalance> => {
        return data.balances.reduce((acc, item) => {
            const asset = this.rs.assetsStore.assetsData.data[item.assetId];
            if (asset) {
                acc[item.assetId] = {
                    asset,
                    balance: new Money(item.balance, asset),
                };
            }
            return acc;
        }, Object.create(null));
    };
}
