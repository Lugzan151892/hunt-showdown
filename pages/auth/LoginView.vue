<template>
	<div class="auth">
		<AuthWrapper :title="authWrapperTitle" :action-title="authWrapperTitle">
			<div class="auth__content">
				<UiCustomInput v-model="authStore.userName" :placeholder="$t('auth.username')" />
				<UiCustomInput v-model="authStore.password" type="password" :placeholder="$t('auth.password')" />
				<UiCustomInput
					v-if="!isLogin"
					v-model="authStore.repeatedPassword"
					type="password"
					:placeholder="$t('auth.repeatedPassword')"
				/>
				<div class="auth__links">
					<p class="auth__links-title">{{ $t(existedAccTitle) }}</p>
					<p class="auth__links-link" @click="handleRouteLogin">{{ $t(existedAccLinkTitle) }}</p>
				</div>
			</div>
		</AuthWrapper>
	</div>
</template>

<script lang="ts" setup>
	import { useAuthStore } from '@/pages/auth/store/authStore';

	const router = useRouter();
	const isLogin = computed(() => router.currentRoute.value.name === 'login');
	const authStore = useAuthStore();
	const authWrapperTitle = computed(() => (isLogin.value ? 'auth.loginTitle' : 'auth.authTitle'));
	const existedAccLinkTitle = computed(() => (isLogin.value ? 'auth.authTitle' : 'auth.loginTitle'));
	const existedAccTitle = computed(() => (isLogin.value ? 'auth.loginNoAccTitle' : 'auth.authAlreadyHaveAccTitle'));

	const handleRouteLogin = () => {
		router.push({ name: isLogin.value ? 'registration' : 'login' });
	};
</script>

<style lang="scss" scoped>
	.auth {
		display: grid;
		align-items: center;
		height: 100vh;
		&__content {
			min-width: 280px;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content min-content;
			row-gap: 25px;
		}
		&__links {
			display: grid;
			grid-template-columns: max-content max-content;
			column-gap: 15px;
			justify-content: center;
			&-link {
				cursor: pointer;
				color: var(--additional-dark-blue);
			}
		}
	}
</style>
