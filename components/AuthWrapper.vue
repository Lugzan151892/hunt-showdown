<template>
	<div class="wrapper">
		<h1 class="wrapper__title">{{ title }}</h1>
		<div class="wrapper__content">
			<slot />
		</div>
		<div class="wrapper__actions">
			<UiCustomButton :title="actionTitle" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		title: {
			type: String,
			default: ''
		},
		actionTitle: {
			type: String,
			default: ''
		}
	});
</script>

<style lang="scss" scoped>
	.wrapper {
		margin: 0 auto;
		width: max-content;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content min-content min-content;
		row-gap: 25px;
		&__title {
			text-align: center;
			margin-bottom: 25px;
		}
		&__actions {
			justify-self: center;
		}
	}
</style>
