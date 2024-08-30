import { ChildStore } from '../ChildStore.ts';
import { FetchTracker } from '../utils/FetchTracker.ts';
import { IState } from '../../utils/search';
import { AppStore } from '../AppStore.ts';
import { search } from '../../utils/search/searchRequest.ts';
import { filterObjectUserLeasing, moneyFactory } from './utils.ts';
import { IUserAssets, IUserContractData, IUserData, IUserLeasingNodeData, IUserLeasingNodeDataRaw } from './interface';
import { computed, makeObservable, reaction } from 'mobx';
import { evaluate } from '../../utils/evaluate/evaluate.ts';
import { IEvaluateResponse } from '../../utils/evaluate';
import { ITuple, parseOrderedTupleValue, parseSearchStr, parseTupleData } from '../../utils/evaluate/utils.ts';
import { Money } from '@waves/data-entities';
import { INode } from '../utils/fetchNodeList.ts';
import { validate } from '../../utils';

const USER_DATA_POLLING_TIME = 20_000;

export class ContractStore extends ChildStore {

    public userContractData: FetchTracker<IUserData, [IEvaluateResponse, IState]> = new FetchTracker();

    public get totalLeased(): { current: Money, next: Money } {
        if (!this.userContractData?.data?.nodes) {
            return;
        }
        return this.rewrittenUserNodes.reduce((acc, leaseData) => {
            const { currentLeasingAmount, nextLeasingAmount } = leaseData;
            return ({
                current: acc.current.cloneWithTokens(
                    acc.current.getTokens().add(currentLeasingAmount.getTokens())
                ),
                next: acc.next.cloneWithTokens(
                    acc.next.getTokens().add(nextLeasingAmount.getTokens())
                )
            });
        }, {
            current: new Money(0, this.rs.assetsStore.LPToken),
            next: new Money(0, this.rs.assetsStore.LPToken)
        } as { current: Money, next: Money });
    }

    public get nodes(): Array<INode> {
        return this.rs.configStore.nodeList;
    }

    public get rewrittenUserNodes(): Array<IUserLeasingNodeData> {
        const currentHeight = this.rs.nodeHeightStore.heightData.data;
        if (!this.userContractData?.data?.nodes || !currentHeight) {
            return ([]);
        }

        return Object.values(this.userContractData.data.nodes)
            .reduce((acc, data) => {
                const rewrittenData = currentHeight > data.nextPeriodHeight ?
                    ({
                        ...data,
                        currentLeasingAmount: data.nextLeasingAmount.cloneWithTokens(data.nextLeasingAmount.getTokens())
                    }) :
                    data;

                if (rewrittenData.currentLeasingAmount.getTokens().lte(0) && rewrittenData.nextLeasingAmount.getTokens().lte(0)) {
                    return acc;
                }
                acc.push(rewrittenData);
                return acc;
            }, []);
    }

    constructor(rs: AppStore) {
        super(rs);
        const searchUrl = this.rs.configStore.config.apiUrl.stateSearch;
        const evaluateUrl = this.rs.configStore.config.apiUrl.evaluate;
        const leasingAddress = this.rs.configStore.config.contracts.leasing;

        makeObservable(this, {
            nodes: computed,
            totalLeased: computed,
            rewrittenUserNodes: computed,
        });

        reaction(
            () => this.rs.authStore.isAuthorized,
            () => {
                if (this.rs.authStore.isAuthorized) {
                    this.userContractData.setOptions({
                        fetchUrl: evaluateUrl,
                        fetcher: (evaluateUrl) => {
                            return Promise.all([
                                evaluate(
                                    evaluateUrl,
                                    {
                                        address: leasingAddress,
                                        expr: `getUserDataREADONLY("${this.rs.authStore.user.address}")`
                                    }
                                ),
                                search(
                                    searchUrl,
                                    filterObjectUserLeasing({
                                        contractAddress: leasingAddress,
                                        userAddress: this.rs.authStore.user.address
                                    }),
                                    true
                                )
                            ]);
                        },
                        parser: this.userDataParser,
                        autoFetch: true,
                        refreshInterval: USER_DATA_POLLING_TIME
                    });
                } else {
                    this.userContractData.off();
                }
            },
        );
    }

    private userDataParser = ([data, searchData]: [IEvaluateResponse, IState]): IUserData => {
        const USER_ASSETS_VALUES = [
            'currentPeriodStart',
            'currentPeriodAvailableToClaim',
            'nextPeriodStart',
            'nextPeriodAvailableToClaim',
            'totalLeasedAmount',
            'currentHeight',
        ];
        const parsedTuple = parseTupleData<IUserAssets>(
            data as ITuple,
            USER_ASSETS_VALUES,
            parseOrderedTupleValue
        );
        const getLpAmount = moneyFactory(new Money(0, this.rs.assetsStore.LPToken));
        const contractData = Object.keys(parsedTuple).reduce((acc, key) => {
            if (
                key === 'currentPeriodAvailableToClaim' ||
                key === 'nextPeriodAvailableToClaim' ||
                key === 'totalLeasedAmount'
            ) {
                acc[key] = getLpAmount(parsedTuple[key]);
                return acc;
            }
            acc[key] = parsedTuple[key];
            return acc;
        }, {} as IUserContractData);

        const LEASING_VALUES = [
            'currentPeriodHeight',
            'currentLeasingAmount',
            'nextPeriodHeight',
            'nextLeasingAmount'
        ];
        const leasingData = (searchData?.entries || []).reduce(
            (acc, entry) => {
                const { key, value } = entry;
                const parsedKey = key.split('__');

                if (parsedKey[0] !== '%s%s' || typeof value !== 'string') {
                    return acc;
                }
                let nodeAddress;
                try {
                    const value = parsedKey[1];
                    validate.address(value, this.rs.configStore.config.network.code.charCodeAt(0));
                    nodeAddress = parsedKey[1];
                } catch (e) {
                    console.error(e);
                }
                if (!nodeAddress) {
                    return acc;
                }
                const parsedValue = parseSearchStr<IUserLeasingNodeDataRaw>(value, LEASING_VALUES);
                acc[nodeAddress] = {
                    nodeAddress,
                    currentPeriodHeight: parsedValue.currentPeriodHeight,
                    currentLeasingAmount: getLpAmount(parsedValue.currentLeasingAmount),
                    nextPeriodHeight: parsedValue.nextPeriodHeight,
                    nextLeasingAmount: getLpAmount(parsedValue.nextLeasingAmount),
                };

                return acc;
            },
            Object.create(null)
        );

        return ({
            ...contractData,
            nodes: { ...leasingData }
        });
    };
}
