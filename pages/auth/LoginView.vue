<template>
	<div class="auth">
		<AuthWrapper :title="$t('auth.loginTitle')" :action-title="$t('auth.loginTitle')">
			<div class="auth__content">
				<UiCustomInput :placeholder="$t('auth.login')" />
				<UiCustomInput :placeholder="$t('auth.password')" />
			</div>
		</AuthWrapper>
	</div>
</template>

<script lang="ts" setup></script>

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
	}
</style>
