import { TConfig } from '../stores/ConfigStore';

export default<TConfig> {
    apiUrl: {
        node: 'https://nodes-testnet.wavesnodes.com',
        balance: 'https://nodes-testnet.wavesnodes.com/addresses/balance',
        wavesBalance: 'https://nodes-testnet.wavesnodes.com/addresses/balance/details',
        assets: 'https://testnet.wx.network/api/v1/assets',
        assetsIcons: 'https://testnet.wx.network/static/icons/assets',
        rates: 'https://testnet.wx.network/api/v1/rates',
        nodeHeight: 'https://nodes-testnet.wavesnodes.com/blocks/height',
        signerWeb: 'https://testnet.wx.network/signer/',
        signerCloud: 'https://testnet.wx.network/signer-cloud/',
        stateSearch: 'https://testnet.wx.network/api/v1/state/search',
    },
    contracts: {},
    network: {
        code: 'T'
    },
    assets: [
        { label: 'WAVES', id: 'WAVES' }
    ]
};
