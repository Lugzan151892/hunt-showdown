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

	onMounted(() => {
		authStore.handleCheckIsAuth();
	});

	useHead({
		title: 'Hunter Service',
		link: [{ rel: 'icon', type: 'image/svg', href: '/hunt.svg' }]
	});

	useSeoMeta({
		author: 'Lugzan',
		description: 'Service for Hunters',
		keywords: 'Hunt, Hunt-Showdown, Hunter, hunt, hunt showdown, guides, settings, help, issue',
		viewport: 'width=device-width, initial-scale=1.0'
	});
</script>
<style lang="scss" scoped>
	.content {
		margin: 0 300px;
	}
</style>
