<template>
	<input class="input" type="text" :placeholder="placeholder" />
</template>
<script lang="ts" setup>
	defineProps({
		placeholder: {
			type: String,
			default: ''
		}
	});
</script>
<style lang="scss" scoped>
	.input {
		background: none;
		box-shadow: none;
		border: none;
		color: var(--text-color-primary);
		border-bottom: 1px solid var(--bg-secondary);
		padding: 0 0 10px 5px;
	}
	.input:focus {
		outline: none;
		border-bottom: 1px solid var(--bg-additional-blue);
	}
</style>
