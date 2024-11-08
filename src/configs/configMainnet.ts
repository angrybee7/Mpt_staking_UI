import { TConfig } from '../stores/ConfigStore';

export default<TConfig> {
    apiUrl: {
        node: 'https://nodes.wavesnodes.com',
        balance: 'https://nodes.wavesnodes.com/addresses/balance',
        wavesBalance: 'https://nodes.wavesnodes.com/addresses/balance/details',
        assets: 'https://wx.network/api/v1/assets',
        assetsIcons: 'https://wx.network/static/icons/assets',
        rates: 'https://wx.network/api/v1/rates',
        nodeHeight: 'https://nodes.wavesnodes.com/blocks/height',
        signerWeb: 'https://wx.network/signer/',
        signerCloud: 'https://wx.network/signer-cloud/',
        stateSearch: 'https://wx.network/api/v1/state/search',
        stateEntries: 'https://wx.network/api/v1/state/entries',
        evaluate: 'https://nodes.wavesnodes.com/utils/script/evaluate',
    },
    contracts: {
        factory: '3PEV7YB8caXLgQPCuKHtWtFSDTjgtbAxgqZ',
        swap: '3PANnmCGrufT8SZY5u6BZUgZq4QTh5XdPMa',
        lpToken: '7scqyYoVsNrpWbTAc78eRqNVcYLxMPzZs8EQfX7ruJAg',
        leasing: '3PF1QWiN4A3CCJoKh1kGtqYqMNaBnRZbC6t',
        unitsDrop: '3PGfJPQ5oabMWfsA6r9KWZzMC1XpPkrHVjn',
    },
    network: {
        code: 'W'
    },
    assets: [
        { label: 'WAVES', id: 'WAVES' },
        { label: 'L2MP', id: '7scqyYoVsNrpWbTAc78eRqNVcYLxMPzZs8EQfX7ruJAg' },
        { label: 'XTN', id: 'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p' },
    ],
    nodes: 'https://configs.wx.network/leasing/mainnet-config.json',
};
