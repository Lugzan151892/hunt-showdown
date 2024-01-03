import { defineStore } from 'pinia';
import api from '~/services/api';
import { validatePassword } from '~/services/validation';

export const useAuthStore = defineStore('authStore', () => {
	const user = ref(null);
	const isAuth = ref(false);
	const userName = ref('');
	const password = ref('');
	const repeatedPassword = ref('');
	const errors = ref({});

	const handleRegistry = async () => {
		if (!userName.value || !password.value) {
			alert('Не введен логин или пароль');
			return;
		}
		const { errors, isValid } = validatePassword(password.value);
		if (!isValid) {
			alert(errors.password);
			return;
		}
		try {
			const result = await api.post('/user/registration', {
				email: userName.value,
				password: password.value
			});
			if (result.error) {
				alert(result.message);
			} else {
				user.value = result;
				isAuth.value = true;
			}
		} catch (e) {
			console.log(e);
		}
	};

	return { isAuth, userName, password, repeatedPassword, handleRegistry };
});
