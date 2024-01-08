<template>
	<div class="wrapper">
		<div>{{ title }}</div>
		<UiCustomButton :title="buttonTitle" @click="handleRedirect" />
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
		box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.35);
		padding: 20px;
		display: grid;
		grid-template-rows: max-content max-content;
		row-gap: 20px;
		justify-items: center;
	}
</style>
