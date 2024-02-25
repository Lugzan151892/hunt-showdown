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
	hunt_settings: {[key: string]: any},
	username: string;
	spectated_users: Array<string>
}

export interface IDefaultResponse {
	error: boolean;
	status: number;
}

export as namespace COMMON;
