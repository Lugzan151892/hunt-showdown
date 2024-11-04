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
