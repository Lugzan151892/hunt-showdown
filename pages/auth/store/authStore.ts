import { defineStore } from 'pinia';
import api from '~/services/api';
import validateAll from '~/services/validation';
import { useMainStore } from '~/store/mainStore';

export const useAuthStore = defineStore('authStore', () => {
	const mainStore = useMainStore();

	const user = ref(null);
	const isAuth = ref(false);
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
			if (result.error) {
				mainStore.openModal(result.message, undefined, 'error');
			} else {
				user.value = result;
				isAuth.value = true;
				mainStore.openModal('auth.userRegistrySuccess', '/games/hunt-showdown');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return { isAuth, userName, password, repeatedPassword, handleRegistry, validationErrors };
});
