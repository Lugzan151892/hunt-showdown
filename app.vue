<template>
	<div class="app">
		<HeaderComponent />
		<div class="content">
			<NuxtPage />
		</div>
		<InfoModal v-if="mainStore.mainModal" />
		<LoadingView v-if="mainStore.loading" />
	</div>
</template>
<script lang="ts" setup>
	import { useAuthStore } from './pages/auth/store/authStore';
	import { useMainStore } from './store/mainStore';

	const authStore = useAuthStore();
	const mainStore = useMainStore();

	useHead({
		title: 'Hunter Service',
		link: [{ rel: 'icon', type: 'image/svg', href: '/hunt.svg' }],
		meta: [{ name: 'google-site-verification', content: 'bbvdxbWc8vl9PfAAiJz60uPjed4T1sKwpf57g7AHlHc' }]
	});

	useSeoMeta({
		author: 'Lugzan',
		description: 'Service for Hunters',
		keywords: 'Hunt, Hunt-Showdown, Hunter, hunt, hunt showdown, guides, settings, help, issue',
		viewport: 'width=device-width, initial-scale=1.0'
	});

	if (!mainStore.user) {
		authStore.handleCheckIsAuth();
	}
</script>
<style lang="scss" scoped>
	.content {
		margin: 0 auto;
		max-width: 1240px;

		@media (max-width: 1440px) and (min-width: 1281px) {
			max-width: 1024px;
		}

		@media (max-width: 1280px) and (min-width: 1080px) {
			max-width: 920px;
		}

		@media (max-width: 1079px) and (min-width: 768px) {
			max-width: 520px;
		}

		@media (max-width: 767px) {
			max-width: 240px;
		}
	}
</style>
