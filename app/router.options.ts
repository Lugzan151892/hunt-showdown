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
			component: () => import('~/pages/auth/LoginView.vue').then((r) => r.default || r),
			meta: {
				guestOnly: true
			}
		},
		{
			name: 'registration',
			path: '/registration',
			component: () => import('~/pages/auth/LoginView.vue').then((r) => r.default || r),
			meta: {
				guestOnly: true
			}
		},
		{
			name: 'hunt-showdown',
			path: '/games/hunt-showdown',
			component: () => import('~/pages/hunt/HuntView.vue').then((r) => r.default || r)
		},
		{
			name: 'suspicious-players',
			path: '/suspicious-players',
			component: () => import('~/pages/banned-list/BannedListView.vue').then((r) => r.default || r)
		},
		{
			name: 'hunt-calculator',
			path: '/hunt-calculator',
			component: () => import('~/pages/calculator/CalculatorView.vue')
		}
	]
};
