import { AssetsStore } from './assets/AssetsStore';
import { ConfigStore } from './ConfigStore';
import { AuthStore } from './AuthStore';
import { BalanceStore } from './balance/BalanceStore';
import { NodeHeightStore } from './NodeHeightStore';
import { RatesStore } from './rates/RatesStore';
import { reaction } from 'mobx';
import { ProviderStore } from './ProviderStore';
import { ContractStore } from './contract/ContractStore.ts';

export class AppStore {

    public assetsStore: AssetsStore;
    public configStore: ConfigStore;
    public authStore: AuthStore;
    public balanceStore: BalanceStore;
    public nodeHeightStore: NodeHeightStore;
    public ratesStore: RatesStore;
    public providerStore: ProviderStore;
    public contractStore: ContractStore;

    constructor() {
        this.configStore = new ConfigStore();
        this.assetsStore = new AssetsStore(this);
        this.authStore = new AuthStore(this);
        this.contractStore = new ContractStore(this);

        reaction(
            () => this.assetsStore.assetsData.isLoading,
            () => {
                if (!this.assetsStore.assetsData.isLoading) {
                    this.providerStore = new ProviderStore(this);
                    this.balanceStore = new BalanceStore(this);
                    this.nodeHeightStore = new NodeHeightStore(this);
                    this.ratesStore = new RatesStore(this);
                }
            }
        );
    }

}
