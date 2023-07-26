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
        evaluate: 'https://nodes-testnet.wavesnodes.com/utils/script/evaluate',
    },
    contracts: {
        factory: '3MpMuGN8rW9EpPwzETAQz88Pe9TQhSwiriq',
		swap: '3MyXFjhxofZUKbHj3p8TUgZwDEPNzq7YNo3',
        lpToken: 'EMAMLxDnv3xiz8RXg8Btj33jcEw3wLczL3JKYYmuubpc'
    },
    network: {
        code: 'T'
    },
    assets: [
        { label: 'WAVES', id: 'WAVES' },
        { label: 'WX', id: 'EMAMLxDnv3xiz8RXg8Btj33jcEw3wLczL3JKYYmuubpc' },
        { label: 'XTN', id: '25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT' },
    ]
};
