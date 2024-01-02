import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
	routes: (_routes) => [
		{
			name: 'home',
			path: '/',
			component: () => import('~/pages/index.vue').then((r) => r.default || r)
		},
		{
			name: 'login',
			path: '/login',
			component: () => import('~/pages/auth/LoginView.vue').then((r) => r.default || r)
		},
		{
			name: 'registration',
			path: '/registration',
			component: () => import('~/pages/auth/LoginView.vue').then((r) => r.default || r)
		},
		{
			name: 'hunt-showdown',
			path: '/games/hunt-showdown',
			component: () => import('~/pages/games/hunt/HuntView.vue').then((r) => r.default || r)
		}
	]
};
