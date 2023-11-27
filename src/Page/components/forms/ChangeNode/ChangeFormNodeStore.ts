import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import { BaseFormStore, FORM_STATE } from '../../../../stores/utils/BaseFormStore.ts';
import { AppStore } from '../../../../stores/AppStore.ts';
import { action, computed, makeObservable, observable } from 'mobx';
import { INode } from '../../../../stores/contract/nodesUtils.ts';

export class ChangeFormNodeStore extends BaseFormStore {

	public node: INode = this.rs.contractStore.userNode;

	public get isButtonDisabled(): boolean {
		return this.formState === FORM_STATE.pending;
	}

	constructor(rs: AppStore) {
		super(rs);
		makeObservable(this, {
			isButtonDisabled: computed,
			node: observable,
			setNode: action.bound,
		})
	}

	public get tx(): {
		call: InvokeScriptCall<string | number> | null;
		payment: Array<InvokeScriptPayment<string | number>> | null;
	} {
		return {
			call: {
				// todo
				function: 'changeNode',
				args: [
					{ type: 'string', value: this.node?.address },
				],
			},
			payment: [],
		};
	}

	public invoke = () => {
		const isFormValid = this.check();
		if (!isFormValid) {
			return;
		}
		this.sendTransaction(() =>
			this.rs.providerStore.sendInvoke(this.tx)
		).then(() => {
			this.reset();
		});
	};

	public check(): boolean {
		this.updateIsConfirmClicked(true);
		this.updateSignError(undefined);
		return this.isEnoughMoney && !!this.node;
	}

	public setNode(node: INode): void {
		this.node = node;
	}
}
