import { InvokeScriptCall, InvokeScriptPayment } from '@waves/ts-types';
import { BaseFormStore, FORM_STATE } from '../../../../stores/utils/BaseFormStore.ts';
import { AppStore } from '../../../../stores/AppStore.ts';
import { computed, makeObservable } from 'mobx';
import { Money } from '@waves/data-entities';

export class ClaimStore extends BaseFormStore {

	public get availableForClaim(): Money {
		return this.rs.contractStore.availableForClaim || new Money(0, this.rs.assetsStore.LPToken);
	}

	public get isClaimAvailable(): boolean {
		// todo
		return false;
	}

	public get isButtonDisabled(): boolean {
		return (
			this.formState === FORM_STATE.pending ||
			this.availableForClaim.getTokens().isZero() ||
			!this.isClaimAvailable
		)
	}

	constructor(rs: AppStore) {
		super(rs);
		makeObservable(this, {
			availableForClaim: computed,
			isClaimAvailable: computed,
			isButtonDisabled: computed,
		})
	}

	public get tx(): {
		call: InvokeScriptCall<string | number> | null;
		payment: Array<InvokeScriptPayment<string | number>> | null;
	} {
		return {
			call: {
				// todo
				function: 'claim',
				args: [],
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
		return !(!this.isEnoughMoney || this.availableForClaim.getTokens().isZero());
	}
}
