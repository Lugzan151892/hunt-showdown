import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
	routes: (_routes) => [
		{
			name: 'home',
			path: '/',
			component: () => import('~/pages/index.vue').then((r) => r.default || r),
			middleware: ['auth']
		},
		{
			name: 'login',
			path: '/login',
			component: () => import('~/pages/auth/LoginView.vue').then((r) => r.default || r),
			meta: {
				guestOnly: true
			},
			middleware: ['auth']
		},
		{
			name: 'registration',
			path: '/registration',
			component: () => import('~/pages/auth/LoginView.vue').then((r) => r.default || r),
			meta: {
				guestOnly: true
			},
			middleware: ['auth']
		},
		{
			name: 'hunt-showdown',
			path: '/games/hunt-showdown',
			component: () => import('~/pages/hunt/HuntView.vue').then((r) => r.default || r),
			middleware: ['auth']
		},
		{
			name: 'suspicious-players',
			path: '/suspicious-players',
			component: () => import('~/pages/banned-list/BannedListView.vue').then((r) => r.default || r),
			middleware: ['auth']
		},
		{
			name: 'hunt-calculator',
			path: '/hunt-calculator',
			component: () => import('~/pages/calculator/CalculatorView.vue'),
			middleware: ['auth']
		}
	]
};
