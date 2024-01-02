import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', () => {
	const isAuth = ref(false);

	const userName = ref('');
	const password = ref('');
	const repeatedPassword = ref('');

	return { isAuth, userName, password, repeatedPassword };
});
