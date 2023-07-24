import { ChildStore } from '../ChildStore.ts';
import { FetchTracker } from '../utils/FetchTracker.ts';
import { IState } from '../../utils/search';
import { AppStore } from '../AppStore.ts';
import { search } from '../../utils/search/searchRequest.ts';
import { filterObjectCommonContract } from './utils.ts';
import BigNumber from '@waves/bignumber';
import { ICommonContractData, IUserContractData } from './interface';
import { when } from 'mobx';

const COMMON_DATA_POLLING_TIME = 60_000;

export class ContractStore extends ChildStore {
    public commonContractData: FetchTracker<ICommonContractData, IState>;
    public userContractData: FetchTracker<IUserContractData, IState> = new FetchTracker();

    constructor(rs: AppStore) {
        super(rs);
        const searchUrl = this.rs.configStore.config.apiUrl.stateSearch;
        const evaluate = this.rs.configStore.config.apiUrl.evaluate;
        const contractAddress = this.rs.configStore.config.contracts.factory;

        this.commonContractData = new FetchTracker<any, any>({
            fetchUrl: searchUrl,
            fetcher: (fetchUrl) =>
                search(
                    fetchUrl,
                    filterObjectCommonContract({ contractAddress }),
                    true
                ),
            refreshInterval: COMMON_DATA_POLLING_TIME,
            parser: this.contractDataParser,
            autoFetch: true,
        });

        when(
            () => this.commonContractData.isLoading !== true,
            () => {
                console.log(this.commonContractData.data);
            }
        );

        when(
            () => this.rs.authStore.isAuthorized,
            () => {
                this.userContractData.setOptions({
                    fetchUrl: evaluate,
                    fetcher: (url) => {

                    }
                })
            }
        )
    }

    private contractDataParser = (data: IState): ICommonContractData => {
        const parseEntries = (key: string, value: string | number) => {
            switch (true) {
                case key.includes('totalAssetAmount'):
                    return { totalAssetAmount: new BigNumber(value) };
                case key.includes('emissionPerBlock'):
                    return { emissionPerBlock: value };
                default:
                    return {};
            }
        };
        return data.entries.reduce(
            (acc, entry) => {
                const parsed = parseEntries(entry.key, entry.value);
                return { ...acc, ...parsed };
            },
            {
                totalAssetAmount: undefined,
                emissionPerBlock: undefined,
            }
        );
    };
}
