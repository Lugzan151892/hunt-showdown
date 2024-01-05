<template>
	<div v-if="mainStore.mainModal" class="wrapper" @click.self="closeModal">
		<div class="modal">
			<div class="modal__content">
				<img
					class="modal__content-image"
					:src="icons[mainStore.mainModalSettings.type]"
					:alt="mainStore.mainModalSettings.type"
				/>
				<p>{{ $t(mainStore.mainModalSettings.text) }}</p>
			</div>
			<div class="modal__actions">
				<UiCustomButton :title="$t(mainStore.mainModalSettings.buttonText)" @click="closeModal" />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import success from '@/assets/images/success.svg';
	import warning from '@/assets/images/warning.svg';
	import error from '@/assets/images/error.svg';
	import { useMainStore } from '@/store/mainStore';

	const icons: { [key: string]: any } = {
		success,
		error,
		warning
	};
	const mainStore = useMainStore();

	const closeModal = () => {
		mainStore.mainModal = false;
		if (mainStore.mainModalSettings.redirect) {
			const router = useRouter();
			router.push(mainStore.mainModalSettings.redirect);
		}
		mainStore.clearData();
	};
</script>
<style lang="scss" scoped>
	.wrapper {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.9);
		display: grid;
		justify-content: center;
		align-items: center;
		.modal {
			width: 100%;
			max-width: 500px;
			min-width: 300px;
			padding: 20px 20px 5px 20px;
			background: var(--bg-secondary);
			border-radius: 3px;
			position: relative;
			box-shadow: 0 5px 15px black;
			display: grid;
			grid-template-rows: 1fr min-content;
			row-gap: 20px;
			justify-content: center;
			justify-items: center;
			&__content {
				text-align: center;
				&-image {
					height: 50px;
					width: 50px;
					margin-bottom: 30px;
				}
			}
			&__actions {
				grid-area: 2 / 1 / 3 / 1;
			}
		}
	}
</style>
