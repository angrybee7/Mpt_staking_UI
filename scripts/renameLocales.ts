const { join } = require('path');
const { readdirSync, writeFileSync, rmdirSync, rmSync } = require('fs');
const { readJSONSync } = require('fs-extra');

const localePath = '../public/locales';

export function renameLocales() {
	const version = readJSONSync('package.json').version;
	const langFolders = readdirSync(join(__dirname, localePath));
	for (let i = 0; i < langFolders.length; i++) {
		const lang = langFolders[i];
		const files = readdirSync(join(__dirname, localePath, lang));
		for (let j = 0; j < files.length; j++) {
			const fileName = files[j];
			const nextFileName = `${files[j].replace('.json', '').split('_')[0]}_${version}.json`
			if (fileName !== nextFileName) {
				writeFileSync(
					join(__dirname, localePath, lang, nextFileName),
					JSON.stringify(readJSONSync(join(__dirname, localePath, lang, fileName)), null, 2)
				);
				rmSync(join(__dirname, localePath, lang, fileName));
			}
		}
	}
}
