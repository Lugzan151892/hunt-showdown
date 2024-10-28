// plugins/global-middleware.ts
import { defineNuxtPlugin } from '#app';
import { useAuthStore } from '~/pages/auth/store/authStore';
import { useMainStore } from '~/store/mainStore';

export default defineNuxtPlugin((_nuxtApp) => {
	const router = useRouter();
	const mainStore = useMainStore();
	const authStore = useAuthStore();

	router.beforeEach(async (to, _from, next) => {
		await authStore.loadUser();

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
