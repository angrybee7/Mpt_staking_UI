import { Asset } from '@waves/data-entities';
import { FetchTracker } from '../utils/FetchTracker';
import { AssetWithMeta, IAssetsResponse, IExpandedAssetJson } from './interface';
import { AppStore } from '../AppStore';
import { ChildStore } from '../ChildStore';


export class AssetsStore extends ChildStore {
    // ключами будут id & displayName токена
    public assetsData: FetchTracker<Record<string, AssetWithMeta>, IAssetsResponse>;

    constructor(rs: AppStore) {
        super(rs);
        const config = this.rs.configStore.config;
        const assetsIds = config.assets.map(a => a.id);
        this.assetsData = new FetchTracker<Record<string, AssetWithMeta>, IAssetsResponse>({
            fetchUrl: `${config.apiUrl.assets}?ids=${assetsIds.join('&ids=')}`,
            parser: this.assetsParser,
            autoFetch: true
        });
    }

    public get XTN(): AssetWithMeta {
        return this.rs.assetsStore.assetsData.data['XTN'];
    }

    public get WAVES(): AssetWithMeta {
        return this.rs.assetsStore.assetsData.data['WAVES'];
    }

    public get LPToken(): AssetWithMeta {
        return this.rs.assetsStore.assetsData.data[this.rs.configStore.config.contracts.lpToken];
    }

    private assetsParser = ({ data }: IAssetsResponse): Record<string, AssetWithMeta> => {
        return data
            .map(this.transformAsset)
            .filter(Boolean)
            .reduce((acc, asset) => {
                acc[(asset as AssetWithMeta).id] = asset;
                acc[(asset as AssetWithMeta).displayName] = asset;
                return acc;
            }, Object.create(null));
    };

    private transformAsset = (data: IExpandedAssetJson): AssetWithMeta | null | undefined => {
        if (data === null) {
            return null;
        } else
            return Object.assign(new Asset(({
                ...data.data,
                ticker: data.data.ticker || '',
                hasScript: data.data.hasScript,
            })), {
                icon:`${ this.rs.configStore.config.apiUrl.assetsIcons}/${data.data.id}.svg`,
                meta: {
                    ... data.metadata,
                    oracleData: data.metadata.oracle_data,
                    hasImage: data.metadata.has_image,
                    sponsorBalance: data.metadata.sponsor_balance
                },
            });
    };

}
