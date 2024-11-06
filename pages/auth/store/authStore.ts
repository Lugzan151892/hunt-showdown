import { defineStore } from 'pinia';
import errorHandler from '~/utils/errorHandler';
import api from '~/services/api';
import validateAll from '~/services/validation';
import { useMainStore } from '~/store/mainStore';

export const useAuthStore = defineStore('authStore', {
	state() {
		const mainStore = useMainStore();

		return {
			mainStore,
			userName: '',
			password: '',
			repeatedPassword: '',
			validationErrors: {
				password: '',
				username: '',
				repeatedPassword: ''
			}
		};
	},
	actions: {
		handleClearFields() {
			this.userName = '';
			this.password = '';
			this.repeatedPassword = '';
		},
		async handleRegistry() {
			const { isValid, errors } = validateAll({
				password: this.password,
				username: this.userName,
				repeatedPassword: this.repeatedPassword
			});
			if (!isValid) {
				Object.assign(this.validationErrors, errors);
				return;
			}
			try {
				this.mainStore.loadingStart();
				const result = await api.post<any, any>('/user/registration', {
					email: this.userName,
					password: this.password
				});

				if (result.success) {
					this.mainStore.user = result.data;
					this.mainStore.isAuth = true;
					this.mainStore.openModal('auth.userRegistrySuccess', '/games/hunt-showdown');
					this.handleClearFields();
				} else {
					this.mainStore.openModal(result.errorMessage || 'Something went wrong, try again', undefined, 'error');
				}
			} catch (e: any) {
				errorHandler(e);
			} finally {
				this.mainStore.loadingStop();
			}
		},

		async handleLogin() {
			const { isValid, errors } = validateAll({
				password: this.password,
				username: this.userName
			});
			if (!isValid) {
				Object.assign(this.validationErrors, errors);
				return;
			}
			try {
				this.mainStore.loadingStart();
				const result = await api.post<any, any>('/user/login', {
					email: this.userName,
					password: this.password
				});
				if (result.success) {
					this.mainStore.user = result.data;
					this.mainStore.isAuth = true;
				}
			} catch (e: any) {
				errorHandler(e);
			} finally {
				this.mainStore.loadingStop();
			}
		},
		async loadUser() {
			try {
				this.mainStore.loadingStart();
				const result = await api.getSilent<any, any>('/user/get');

				if (result.success) {
					this.mainStore.isAuth = true;
					this.mainStore.user = result.data;
				}
			} catch (e: any) {
				this.mainStore.loadingStop();
				errorHandler(e);
			} finally {
				this.mainStore.loadingStop();
			}
		}
	}
});
