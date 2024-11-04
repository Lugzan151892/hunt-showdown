// export interface ISteamBannedUser {
// 	avatar: string;
// 	avatarfull: string;
// 	avatarhash: string;
// 	avatarmedium: string;
// 	communityvisibilitystate: number;
// 	lastlogoff: number;
// 	personaname: string;
// 	personastate: number;
// 	personastateflags: number;
// 	primaryclanid: string;
// 	profilestate: number;
// 	profileurl: string;
// 	steamid: string;
// 	timecreated: number;
// 	banned: boolean;
// }

export interface ISteamBannedUser {
	avatar: string;
	avatarFull: string;
	avatarMedium: string;
	banned: boolean;
	comment: string;
	commentPermission: number;
	communityVisibilityState: number;
	createdAt: string;
	id: number;
	lastlogoff: null;
	personaName: string;
	personastateflags: number;
	primaryclanid: string;
	profileState: number;
	profileUrl: string;
	steamId: string;
	timecreated: number;
	updatedAt: string;
	personastate: number;
}

export interface ISteamBannedUsersResponse extends COMMON.IDefaultResponse {
	bannedUsers: ISteamBannedUser[];
}

export as namespace BANNED;
