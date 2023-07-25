import { ChildStore } from '../ChildStore.ts';
import { FetchTracker } from '../utils/FetchTracker.ts';
import { IState } from '../../utils/search';
import { AppStore } from '../AppStore.ts';
import { search } from '../../utils/search/searchRequest.ts';
import { BLOCKS_PER_YEAR, filterObjectCommonContract, moneyFactory } from './utils.ts';
import { ICommonContractData, IUserAssets, IUserContractData } from './interface';
import { when } from 'mobx';
import { evaluate } from '../../utils/evaluate/evaluate.ts';
import { IEvaluateResponse } from '../../utils/evaluate';
import { ITuple, parseTupleData } from '../../utils/evaluate/utils.ts';
import { Money } from '@waves/data-entities';

const COMMON_DATA_POLLING_TIME = 60_000;

export class ContractStore extends ChildStore {

    public commonContractData: FetchTracker<ICommonContractData, IState>;
    public userContractData: FetchTracker<IUserContractData, IEvaluateResponse> = new FetchTracker();

    constructor(rs: AppStore) {
        super(rs);
        const searchUrl = this.rs.configStore.config.apiUrl.stateSearch;
        const evaluateUrl = this.rs.configStore.config.apiUrl.evaluate;
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
                // console.log(this.annual);
            }
        );

        when(
            () => this.rs.authStore.isAuthorized,
            () => {
                this.userContractData.setOptions({
                    fetchUrl: evaluateUrl,
                    fetcher: (evaluateUrl) =>
                        evaluate(evaluateUrl, { address: contractAddress, expr: `getUserAssetsREADONLY("${this.rs.authStore.user.address}")` }),
                    parser: this.userDataParser,
                    autoFetch: true,
                    refreshInterval: COMMON_DATA_POLLING_TIME
                })
            },
        )
    }

    public get annual(): string {
        // (((totalAssetAmount + emissionForYear) - totalAssetAmount) / totalAssetAmount) * 100%

        const { totalAssetAmount, emissionPerBlock } = this.commonContractData.data;

        if (!emissionPerBlock || !totalAssetAmount) {
            return '0';
        }
        return (emissionPerBlock.getTokens().mul(BLOCKS_PER_YEAR).div(totalAssetAmount.getTokens()))
            .mul(100)
            .toFixed(2);
    }

    private userDataParser = (data: IEvaluateResponse): IUserContractData => {
        const USER_ASSETS_VALUES = [
            'availableInternalLp',
            'availableToWithdraw',
            'currentInternalLPPrice',
            'userTotalStaked',
            'userTotalWithdrawn'
        ];
        const parsedTuple = parseTupleData<IUserAssets>(data as ITuple, USER_ASSETS_VALUES);
        const getLpAmount = moneyFactory(new Money(0, this.rs.assetsStore.LPToken));
        const getPrice = moneyFactory(new Money(0, this.rs.assetsStore.WAVES));
        return Object.keys(parsedTuple).reduce((acc, key) => {
            if (key === 'currentInternalLPPrice') {
                acc[key] = getPrice(parsedTuple[key]);
                return acc;
            }
            acc[key] = getLpAmount(parsedTuple[key]);
            return acc;
        }, {} as IUserContractData);
    }

    private contractDataParser = (data: IState): ICommonContractData => {
        const parseEntries = (key: string, value: string | number): Partial<ICommonContractData> => {
            switch (true) {
                case key.includes('totalAssetAmount'):
                    return { totalAssetAmount: new Money(0, this.rs.assetsStore.LPToken).cloneWithTokens(value) };
                case key.includes('emissionPerBlock'):
                    return { emissionPerBlock: new Money(0, this.rs.assetsStore.LPToken).cloneWithTokens(value) };
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
