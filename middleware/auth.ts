import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/pages/auth/store/authStore';
import { useMainStore } from '~/store/mainStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore();
	const mainStore = useMainStore();

	console.log('Middleware Triggered');

	if (to.name !== from.name) {
		await authStore.loadUser();
	}

	if (to.meta.authRequired) {
		if (!mainStore.user) {
			return navigateTo('/login'); // Обратите внимание на return
		}
	} else if (to.meta.guestOnly) {
		if (mainStore.user) {
			return navigateTo('/'); // Обратите внимание на return
		}
	}
});
