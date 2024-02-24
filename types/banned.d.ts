export interface ISteamBannedUser {
	avatar: string;
	avatarfull: string;
	avatarhash: string;
	avatarmedium: string;
	communityvisibilitystate: number;
	lastlogoff: number;
	personaname: string;
	personastate: number;
	personastateflags: number;
	primaryclanid: string;
	profilestate: number;
	profileurl: string;
	steamid: string;
	timecreated: number;
	banned: boolean;
}

export interface ISteamBannedUsersResponse extends COMMON.IDefaultResponse {
    data: {
        players: ISteamBannedUser[]
    }
}

export as namespace BANNED;