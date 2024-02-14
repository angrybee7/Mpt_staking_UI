import configs from '../configs';
import { fetchNodes, INode } from './utils/fetchNodeList.ts';
import { makeObservable, observable, runInAction } from 'mobx';

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
        swap: string;
        lpToken: string
    },
    network: {
        code: 'W' | 'T';
    }
    assets: Array<TAssetConfig>,
    nodes: string,
};

export const remapNetwork = {
    mainnet: 'Mainnet',
    testnet: 'Testnet',
};

export class ConfigStore {

    public config: TConfig;
    public network: string;
    public nodeList: Array<INode> = [];

    constructor() {
        this.network = import.meta.env.VITE_NETWORK;
        this.config =
            import.meta.env.VITE_NETWORK === 'testnet'
                ? configs.testnet
                : configs.mainnet;

        makeObservable(this, {
            nodeList: observable
        });

        this.fetchNodeList();
    }

    protected fetchNodeList(): Promise<void> {
        return fetchNodes(this.config.nodes)
            .then((nodes) => {
                runInAction(() => {
                    this.nodeList = nodes;
                });
            });
    }
}
