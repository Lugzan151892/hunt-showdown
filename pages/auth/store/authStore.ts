import { defineStore } from 'pinia';
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
			} catch (e) {
				this.mainStore.openModal('Something went wrong, try again', undefined, 'error');
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
					this.loadUser();
				} else {
					this.mainStore.openModal(result.errorMessage || '', undefined, 'error');
				}
			} catch (e) {
				this.mainStore.openModal('Something went wrong, try again', undefined, 'error');
			} finally {
				this.mainStore.loadingStop();
			}
		},
		async loadUser() {
			try {
				this.mainStore.loadingStart();
				const result = await api.get<any, any>('/user/get');
				console.log(result);

				if (result.success) {
					console.log(result.success);
					this.mainStore.isAuth = true;
					this.mainStore.user = result.data;
				} else {
					console.log(result.success);

					localStorage.removeItem('token');
					this.mainStore.openModal(result.errorMessage, undefined, 'error');
				}
			} catch (e) {
				this.mainStore.loadingStop();
				console.log(e);

				this.mainStore.openModal('Something went wrong, try again', undefined, 'error');
			} finally {
				this.mainStore.loadingStop();
			}
		}
	}
});
