import { defineStore } from 'pinia';
import api from '~/services/api';
import validateAll from '~/services/validation';
import { useMainStore } from '~/store/mainStore';

export const useAuthStore = defineStore('authStore', () => {
	const mainStore = useMainStore();

	const userName = ref('');
	const password = ref('');
	const repeatedPassword = ref('');
	const validationErrors = ref({
		password: '',
		username: '',
		repeatedPassword: ''
	});

	const handleClearFields = () => {
		userName.value = '';
		password.value = '';
		repeatedPassword.value = '';
	};

	const handleRegistry = async () => {
		const { isValid, errors } = validateAll({
			password: password.value,
			username: userName.value,
			repeatedPassword: repeatedPassword.value
		});
		if (!isValid) {
			Object.assign(validationErrors.value, errors);
			return;
		}
		try {
			const result = await api.post<any, any>('/user/registration', {
				email: userName.value,
				password: password.value
			});
			if (!result) {
				mainStore.openModal('auth.somethingWentWrong', undefined, 'error');
				return;
			}
			if (result.status === 200 && !result.error) {
				mainStore.user = result.user;
				mainStore.isAuth = true;
				localStorage.setItem('token', result.data.token);
				mainStore.openModal('auth.userRegistrySuccess', '/games/hunt-showdown');
				handleClearFields();
			} else {
				mainStore.openModal(result.message, undefined, 'error');
			}
		} catch (e) {
			mainStore.openModal(e as string, undefined, 'error');
		}
	};

	const handleLogin = async () => {
		const { isValid, errors } = validateAll({
			password: password.value,
			username: userName.value
		});
		if (!isValid) {
			Object.assign(validationErrors.value, errors);
			return;
		}
		try {
			const result = await api.post<any, any>('/user/login', {
				email: userName.value,
				password: password.value
			});
			if (!result) {
				mainStore.openModal('auth.somethingWentWrong', undefined, 'error');
				return;
			}
			if (result.status === 200 && !result.error) {
				mainStore.user = result.data.user;
				mainStore.isAuth = true;
				localStorage.setItem('token', result.data.token);
				handleClearFields();
				return true;
			} else {
				mainStore.openModal(result.message, undefined, 'error');
			}
		} catch (e) {
			mainStore.openModal(e as string, undefined, 'error');
		}
	};
	const handleCheckIsAuth = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const result = await api.get<any, any>('/user/auth');
				if (result.status === 200 && !result.error) {
					mainStore.isAuth = true;
					mainStore.user = result.data.user;
					localStorage.setItem('token', result.data.token);
				} else if (result.status === 401 && result.error) localStorage.removeItem('token');
				else mainStore.openModal(result.message, undefined, 'error');
			} catch (e) {
				mainStore.openModal(e as string, undefined, 'error');
			}
		}
	};

	return { userName, password, repeatedPassword, handleRegistry, validationErrors, handleCheckIsAuth, handleLogin };
});
