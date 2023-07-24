import configs from '../configs';

export type TAssetConfig = { label: string; id: string };

export type TConfig = {
    apiUrl: {
        node: string,
        balance: string,
        wavesBalance: string,
        assets: string,
        assetsIcons: string,
        rates: string,
        nodeHeight: string,
        signerWeb: string,
        signerCloud: string,
        stateSearch: string
        evaluate: string;
    },
    contracts: {
        factory: string;
        calculator: string;
        lpToken: string
    },
    network: {
        code: 'W' | 'T';
    }
    assets: Array<TAssetConfig>
};

export const remapNetwork = {
    mainnet: 'Mainnet',
    testnet: 'Testnet',
};

export class ConfigStore {

    public config: TConfig;
    public network: string;

    constructor() {
        this.network = import.meta.env.VITE_NETWORK;
        this.config =
            import.meta.env.VITE_NETWORK === 'testnet'
                ? configs.testnet
                : configs.mainnet;
    }
}
