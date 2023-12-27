export interface IHuntSettings {
	[key: string]: {
		[key: string]: {
			options: { id: number; text: string }[];
			text: string;
			type?: 'title' | 'checkbox';
		};
	};
}

export as namespace HUNT;
