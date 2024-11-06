// plugins/global-middleware.ts
import { defineNuxtPlugin } from '#app';
import { useMainStore } from '~/store/mainStore';

export default defineNuxtPlugin((_nuxtApp) => {
	const router = useRouter();
	const mainStore = useMainStore();

	router.beforeEach(async (to, _from, next) => {
		const token = localStorage.getItem('token');
		if (token) {
			await mainStore.loadUser();
		}

		if (to.meta.authRequired) {
			if (!mainStore.user) {
				next({ name: 'login' });
			} else {
				next();
			}
		} else if (to.meta.guestOnly) {
			if (mainStore.user) {
				next({ name: 'home' });
			} else {
				next();
			}
		} else {
			next();
		}
	});
});
