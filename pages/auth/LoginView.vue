<template>
	<div class="auth">
		<AuthWrapper :title="authWrapperTitle" :action-title="authWrapperTitle" @submit="handleSubmit">
			<div class="auth__content">
				<UiCustomInput
					v-model="user.userName"
					:placeholder="$t('auth.username')"
					:errors="$t(validationErrors.username)"
				/>
				<UiCustomInput
					v-model="user.password"
					type="password"
					:placeholder="$t('auth.password')"
					:errors="$t(validationErrors.password)"
				/>
				<UiCustomInput
					v-if="!isLogin"
					v-model="user.repeatedPassword"
					type="password"
					:placeholder="$t('auth.repeatedPassword')"
					:errors="$t(validationErrors.repeatedPassword)"
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
	import Api from '~/services/api';
	import validateAll from '~/services/validation';
	import { useMainStore } from '~/store/mainStore';

	const router = useRouter();
	const isLogin = computed(() => router.currentRoute.value.name === 'login');
	const mainStore = useMainStore();
	const authWrapperTitle = computed(() => (isLogin.value ? 'auth.loginTitle' : 'auth.authTitle'));
	const existedAccLinkTitle = computed(() => (isLogin.value ? 'auth.authTitle' : 'auth.loginTitle'));
	const existedAccTitle = computed(() => (isLogin.value ? 'auth.loginNoAccTitle' : 'auth.authAlreadyHaveAccTitle'));

	const user = ref({
		userName: '',
		password: '',
		repeatedPassword: ''
	});

	const validationErrors = ref({
		password: '',
		username: '',
		repeatedPassword: ''
	});

	const handleClearFields = () => {
		user.value.userName = '';
		user.value.password = '';
		user.value.repeatedPassword = '';
	};

	const handleRouteLogin = () => {
		router.push({ name: isLogin.value ? 'registration' : 'login' });
	};

	const login = async () => {
		const { isValid, errors } = validateAll({
			password: user.value.password,
			username: user.value.userName
		});
		if (!isValid) {
			Object.assign(validationErrors.value, errors);
			return;
		}
		try {
			mainStore.loadingStart();
			const result = await Api.post<any, any>('/user/login', {
				email: user.value.userName,
				password: user.value.password
			});
			mainStore.user = result.data;
			mainStore.isAuth = true;
			handleClearFields();
			router.push({ name: 'home' });
		} catch (e: any) {
			errorHandler(e);
		} finally {
			mainStore.loadingStop();
		}
	};

	const registry = async () => {
		const { isValid, errors } = validateAll({
			password: user.value.password,
			username: user.value.userName,
			repeatedPassword: user.value.repeatedPassword
		});
		if (!isValid) {
			Object.assign(validationErrors.value, errors);
			return;
		}
		try {
			mainStore.loadingStart();
			const result = await Api.post<any, any>('/user/registration', {
				email: user.value.userName,
				password: user.value.password
			});

			mainStore.user = result.data;
			mainStore.isAuth = true;
			mainStore.openModal('auth.userRegistrySuccess', '/games/hunt-showdown');
			handleClearFields();
		} catch (e: any) {
			errorHandler(e);
		} finally {
			mainStore.loadingStop();
		}
	};

	const handleSubmit = () => {
		if (isLogin.value) {
			login();
		} else {
			registry();
		}
	};
</script>

<style lang="scss" scoped>
	.auth {
		display: grid;
		align-items: center;
		height: 100vh;
		&__content {
			width: 300px;
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
