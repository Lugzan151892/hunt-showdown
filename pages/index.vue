<template>
	<div class="content">
		{{ $t('main.test') }}

		<form>
			<label for="locale-select">Выберите язык: </label>
			<select id="locale-select" v-model="$i18n.locale">
				<option value="en">en</option>
				<option value="ru">ru</option>
			</select>
		</form>
	</div>
</template>

<script setup lang="ts">
	import { authStore } from '@/store/auth';
	const auth = authStore();
	const isAuth = computed(() => {
		return !auth.isAuth;
	});

	const router = useRouter();

	onMounted(() => {
		if (isAuth.value) {
			router.push({ name: 'login' });
		}
	});
</script>

<style lang="scss" scoped>
	.content {
	}
</style>
