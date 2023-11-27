import keeperUrl from '/src/img/keeper.svg';

export interface INode {
	address: string;
	name: string;
	img: string;
}

export function getNodes(): Promise<Array<INode>> {
	return Promise.resolve([
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih1',
			name: 'Node 1',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih2',
			name: 'Node 2 Node 2 Node 2',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih3',
			name: 'Node 3',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih4',
			name: 'Node 4',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih5',
			name: 'Node 5',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih6',
			name: 'Node 6',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih7',
			name: 'Node 7',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih8',
			name: 'Node 8',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih9',
			name: 'Node 9',
			img: keeperUrl
		},
		{
			address: '3Mqtn6v9na7hgbRXbuwNCH28rAr44VxB4ih10',
			name: 'Node 10',
			img: keeperUrl
		},
	])
}
