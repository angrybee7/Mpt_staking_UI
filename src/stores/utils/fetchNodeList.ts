export interface INode {
	address: string;
	name: string;
	img: string;
}

export function fetchNodes(url: string): Promise<Array<INode>> {
	return fetch(url)
		.then((res) => res.json())
		.then((data) => {
			return data.map((nodeConfig) => {
				return ({
					address: nodeConfig.address,
					name: nodeConfig.name,
					img: nodeConfig.icons && nodeConfig.icons['32x32'],
				})
			});
		})
}
