import { ChildStore } from '../ChildStore.ts';
import { FetchTracker } from '../utils/FetchTracker.ts';
import { IState } from '../../utils/search';
import { AppStore } from '../AppStore.ts';
import { search } from '../../utils/search/searchRequest.ts';
import { BLOCKS_PER_YEAR, filterObjectCommonContract, moneyFactory } from './utils.ts';
import { ICommonContractData, IUserAssets, IUserContractData } from './interface';
import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { evaluate } from '../../utils/evaluate/evaluate.ts';
import { IEvaluateResponse } from '../../utils/evaluate';
import { ITuple, parseOrderedTupleValue, parseTupleData } from '../../utils/evaluate/utils.ts';
import { Money } from '@waves/data-entities';
import { getNodes, INode } from './nodesUtils.ts';

const COMMON_DATA_POLLING_TIME = 60_000;

export class ContractStore extends ChildStore {

    public commonContractData: FetchTracker<ICommonContractData, IState>;
    public userContractData: FetchTracker<IUserContractData, IEvaluateResponse> = new FetchTracker();
    public nodes: Array<INode> = [];
    public userNode: INode;

    constructor(rs: AppStore) {
        super(rs);
        const searchUrl = this.rs.configStore.config.apiUrl.stateSearch;
        const evaluateUrl = this.rs.configStore.config.apiUrl.evaluate;
        const contractAddress = this.rs.configStore.config.contracts.factory;

        makeObservable(this, {
            availableForClaim: computed,
            nodes: observable,
            setNodes: action.bound,
            userNode: observable,
            setUserNode: action.bound,
        })

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

        reaction(
            () => this.rs.authStore.isAuthorized,
            () => {
                if (this.rs.authStore.isAuthorized) {
                    this.userContractData.setOptions({
                        fetchUrl: evaluateUrl,
                        fetcher: (evaluateUrl) =>
                            evaluate(evaluateUrl, { address: contractAddress, expr: `getUserAssetsREADONLY("${this.rs.authStore.user.address}")` }),
                        parser: this.userDataParser,
                        autoFetch: true,
                        refreshInterval: COMMON_DATA_POLLING_TIME
                    })
                    this.initNodes();
                } else {
                    this.userContractData.off();
                }
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

    public get availableForClaim(): Money {
        return this.userContractData.data?.userLockedInternalLpAmount || new Money(0, this.rs.assetsStore.LPToken);
    }

    public get totalStaked(): Money {
        const zeroMoney = new Money(0, this.rs.assetsStore.LPToken);
        return zeroMoney.cloneWithTokens(
            this.availableForClaim.getTokens()
                .add(this.userContractData.data.availableToWithdraw?.getTokens() || 0)
        )
    }

    public setNodes(nodes: Array<INode>): void {
        this.nodes = nodes;
    }

    public setUserNode(node: INode): void {
        this.userNode = node;
    }

    private userDataParser = (data: IEvaluateResponse): IUserContractData => {
        const USER_ASSETS_VALUES = [
            'availableInternalLp',
            'availableToWithdraw',
            'currentInternalLPPrice',
            'userTotalStaked',
            'userTotalWithdrawn',
            'userLockedInternalLpAmount',
            'userLockedTokenAmount',
            'userStakingNodes',
            'userStakingNodesShares',
        ];
        const parsedTuple = parseTupleData<IUserAssets>(
            data as ITuple,
            USER_ASSETS_VALUES,
            parseOrderedTupleValue
        );
        const getLpAmount = moneyFactory(new Money(0, this.rs.assetsStore.LPToken));
        const getPrice = moneyFactory(new Money(0, this.rs.assetsStore.WAVES));
        return Object.keys(parsedTuple).reduce((acc, key) => {
            if (key === 'currentInternalLPPrice' || key === 'userLockedTokenAmount') {
                acc[key] = getPrice(parsedTuple[key]);
                return acc;
            }

            if (key === 'userStakingNodes' || key === 'userStakingNodesShares') {
                acc[key] = parsedTuple[key];
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

    private initNodes(): void {
        getNodes()
            .then((nodes) => {
                this.nodes = nodes;
                this.userNode = nodes && nodes[1];
            })
    }
}
