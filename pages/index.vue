<template>
	<div class="content">
		<ContentBlock
			class="content__hunt"
			title="info.huntInfoTitle"
			text="info.huntInfoText"
			redirect-path="/games/hunt-showdown"
			button-title="info.huntInfoButton"
		/>
		<ContentBlock class="content__updates" title="info.updatesInfoTitle">
			<UpdatesInfoBlock />
		</ContentBlock>
		<ContentBlock
			v-if="!mainStore.isAuth"
			title="info.authInfoTitle"
			text="info.authInfoText"
			button-title="auth.loginTitle"
			redirect-path="/login"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useMainStore } from '~/store/mainStore';

	const mainStore = useMainStore();
</script>

<style lang="scss" scoped>
	.content {
		max-width: 1280px;
		display: grid;
		margin-top: 20px;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		&__updates {
			grid-area: 1 / 2 / 6 / 3;
		}
	}
</style>
