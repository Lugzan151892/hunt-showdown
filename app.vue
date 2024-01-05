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
</script>
<style lang="scss" scoped>
	.content {
		margin: 0 300px;
	}
</style>
