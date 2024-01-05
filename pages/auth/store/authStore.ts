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
			const result = await api.post('/user/registration', {
				email: userName.value,
				password: password.value
			});
			if (result.status === 200 && !result.error) {
				mainStore.user = result.user;
				mainStore.isAuth = true;
				localStorage.setItem('token', result.token);
				mainStore.openModal('auth.userRegistrySuccess', '/games/hunt-showdown');
			} else {
				mainStore.openModal(result.message, undefined, 'error');
			}
		} catch (e) {
			console.log(e);
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
			const result = await api.post('/user/login', {
				email: userName.value,
				password: password.value
			});
			if (result.status === 200 && !result.error) {
				mainStore.user = result.user;
				mainStore.isAuth = true;
				localStorage.setItem('token', result.token);
				return true;
			} else {
				mainStore.openModal(result.message, undefined, 'error');
			}
		} catch (e) {
			console.log(e);
		}
	};
	const handleCheckIsAuth = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			const result = await api.get('/user/auth', token);
			if (result.status === 200 && !result.error) {
				mainStore.user = result.user;
				localStorage.setItem('token', result.token);
			} else {
				mainStore.openModal(result.message, undefined, 'error');
			}
			console.log(result);
		}
	};

	return { userName, password, repeatedPassword, handleRegistry, validationErrors, handleCheckIsAuth, handleLogin };
});
