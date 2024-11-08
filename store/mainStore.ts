import { defineStore } from 'pinia';
import api from '~/services/api';
import errorHandler from '~/utils/errorHandler';
type TInfoModalIconType = 'success' | 'error' | 'warning';
interface IInfoModalSettings {
	type: TInfoModalIconType;
	text: string;
	buttonText: string;
	redirect: string;
	errorStatus?: number;
}

const defaultModalSettings = (): IInfoModalSettings => ({
	type: 'success',
	text: '',
	buttonText: 'main.accept',
	redirect: '',
	errorStatus: 400
});

export const useMainStore = defineStore('mainStore', {
	state() {
		return {
			mainModal: false,
			mainModalSettings: defaultModalSettings(),
			loading: false,
			user: null as null | COMMON.IUserData,
			isAuth: false
		};
	},

	actions: {
		openModal(text: string, redirect: string = '', type: TInfoModalIconType = 'success', status: number = 500) {
			this.mainModalSettings.text = text;
			this.mainModalSettings.type = type;
			this.mainModalSettings.redirect = redirect;
			this.mainModalSettings.errorStatus = status;
			this.mainModal = true;
		},
		clearData() {
			this.mainModalSettings = defaultModalSettings();
		},

		async loadUser() {
			try {
				this.loadingStart();
				const result = await api.getSilent<any, any>('/user/get');

				if (result.success) {
					this.isAuth = true;
					this.user = result.data;
				}
			} catch (e: any) {
				this.loadingStop();
				errorHandler(e);
			} finally {
				this.loadingStop();
			}
		},

		async handleLogout() {
			try {
				this.loadingStart();
				await api.postSilent('/user/logout', { userName: this.user?.username || '' });
				localStorage.removeItem('token');
				this.user = null;
				this.isAuth = false;
				this.clearData();
			} catch (e: any) {
				errorHandler(e);
			} finally {
				this.loadingStop();
			}
		},

		loadingStart() {
			this.loading = true;
		},

		loadingStop() {
			this.loading = false;
		}
	}
});
