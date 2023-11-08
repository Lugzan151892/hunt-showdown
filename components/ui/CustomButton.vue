<template>
	<button class="button" @click="$emit('click')">{{ title }}</button>
</template>

<script lang="ts" setup>
	defineProps({
		title: {
			type: String,
			default: ''
		}
	});
	defineEmits(['click']);
</script>

<style lang="scss" scoped>
	.button {
		padding: 8px 15px;
		border-radius: 5px;
		background: #3137c9;
		cursor: pointer;
		border: 1px solid rgba(48, 55, 201, 0.3);
	}
</style>
