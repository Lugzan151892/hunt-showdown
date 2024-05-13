<template>
	<article class="content">
		<h1 class="content__title">{{ $t('main.mainTitle') }}</h1>
		<ContentBlock
			title="info.huntInfoTitle"
			text="info.huntInfoText"
			redirect-path="/games/hunt-showdown"
			button-title="info.huntInfoButton"
		/>
		<ContentBlock
			title="info.bannedListInfoTitle"
			text="info.bannedListInfoDescription"
			redirect-path="/suspicious-players"
			button-title="info.bannedListInfoButton"
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
	</article>
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
		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
		gap: 20px;
		&__title {
			@media (min-width: 768px) {
				grid-area: 1 / 1 / 2 / 3;
			}
			text-align: center;
			font-size: 30px;
		}
		&__updates {
			@media (min-width: 768px) {
				grid-area: 2 / 2 / 6 / 3;
			}
		}
	}
</style>
