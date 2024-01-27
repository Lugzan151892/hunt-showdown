<template>
	<div class="app">
		<HeaderComponent />
		<div class="content">
			<NuxtPage />
		</div>
		<InfoModal />
	</div>
</template>
<script lang="ts" setup>
	import { useAuthStore } from './pages/auth/store/authStore';

	const authStore = useAuthStore();

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

	authStore.handleCheckIsAuth();
</script>
<style lang="scss" scoped>
	.content {
		margin: 0 300px;
	}
</style>
