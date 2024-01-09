<template>
	<div class="wrapper">
		<div class="wrapper__title">{{ $t(title) }}</div>
		<div class="wrapper__text">{{ $t(text) }}</div>
		<slot />
		<UiCustomButton v-if="redirectPath" class="wrapper__button" :title="$t(buttonTitle)" @click="handleRedirect" />
	</div>
</template>
<script lang="ts" setup>
	const props = defineProps({
		title: {
			type: String,
			default: ''
		},
		buttonTitle: {
			type: String,
			default: 'Перейти'
		},
		redirectPath: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		}
	});

	const router = useRouter();

	const handleRedirect = () => {
		if (props.redirectPath) {
			router.push(props.redirectPath);
		}
	};
</script>
<style lang="scss" scoped>
	.wrapper {
		border-radius: 20px;
		background: var(--bg-secondary);
		box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.35);
		padding: 20px;
		display: grid;
		grid-template-rows: max-content max-content;
		row-gap: 20px;
		justify-items: center;
		&__title {
			font-size: 22px;
		}
	}
</style>
