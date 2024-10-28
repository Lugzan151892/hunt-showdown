import { defineStore } from 'pinia';
import api from '~/services/api';
type TInfoModalIconType = 'success' | 'error' | 'warning';
interface IInfoModalSettings {
	type: TInfoModalIconType;
	text: string;
	buttonText: string;
	redirect: string;
}

const defaultModalSettings = (): IInfoModalSettings => ({
	type: 'success',
	text: '',
	buttonText: 'main.accept',
	redirect: ''
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
		openModal(text: string, redirect: string = '', type: TInfoModalIconType = 'success') {
			this.mainModalSettings.text = text;
			this.mainModalSettings.type = type;
			this.mainModalSettings.redirect = redirect;
			this.mainModal = true;
		},
		clearData() {
			this.mainModalSettings = defaultModalSettings();
		},
		async handleLogout() {
			try {
				this.loadingStart();
				await api.post('/user/logout', { userName: this.user?.username || '' });
				localStorage.removeItem('token');
				this.user = null;
				this.isAuth = false;
				this.clearData();
			} catch (e: any) {
				this.openModal(e || 'Something went wrong, try again', undefined, 'error');
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
