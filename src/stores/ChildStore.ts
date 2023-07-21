import { AppStore } from './AppStore';

export class ChildStore {

    protected rs: AppStore;

    constructor(rs: AppStore) {
        this.rs = rs;
    }
}
