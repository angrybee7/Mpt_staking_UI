import { ChildStore } from './ChildStore';
import { FetchTracker } from './utils/FetchTracker';

interface INodeHeightsResponse {
    height: number;
}

export class NodeHeightStore extends ChildStore {

    public heightData: FetchTracker<number, INodeHeightsResponse>;

    constructor(props) {
        super(props);

        const config = this.rs.configStore.config;
        this.heightData = new FetchTracker<number, INodeHeightsResponse>({
            fetchUrl: config.apiUrl.nodeHeight,
            parser: this.parser,
            autoFetch: true,
            refreshInterval: 60_000,
        });
    }

    private parser = (data: INodeHeightsResponse): number => {
        return data?.height;
    };

}
