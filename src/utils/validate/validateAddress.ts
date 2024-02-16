import { libs } from '@waves/waves-transactions';

export function isValidAddress(address: string, networkByte: number): boolean  {
	if (!address || typeof address !== 'string') {
		throw new Error('Missing or invalid address');
	}

	let addressBytes = libs.crypto.base58Decode(address);

	if (addressBytes[0] !== 1 || addressBytes[1] !== networkByte) {
		return false;
	}

	let key = addressBytes.slice(0, 22);
	let check = addressBytes.slice(22, 26);
	let keyHash = libs.crypto.keccak(libs.crypto.blake2b(key)).slice(0, 4);

	for (var i = 0; i < 4; i++) {
		if (check[i] !== keyHash[i]) {
			return false;
		}
	}
	return true;
};
