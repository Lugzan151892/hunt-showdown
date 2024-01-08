export type TTranslate = {
	name: string;
	translations: {
		[key: string]: string;
	};
	locale: string;
};

type TTranslateMain = {
	[key: string]: {
		[key: string]: string;
	};
};

interface IUserData {
	id: string;
	settings: {[key: string]: any},
	email: string;
}

export as namespace COMMON;
