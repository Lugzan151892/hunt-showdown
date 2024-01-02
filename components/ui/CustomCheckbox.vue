<template>
	<div class="checkbox" :class="{ checkbox__active: modelValue }" @click="$emit('update:modelValue', !modelValue)">
		<div class="checkbox__content" :class="{ 'checkbox__content-active': modelValue }" />
	</div>
</template>
<script lang="ts" setup>
	defineEmits(['update:modelValue']);
	defineProps({
		modelValue: {
			type: Boolean,
			requred: true
		}
	});
</script>
<style lang="scss" scoped>
	.checkbox {
		height: 40px;
		width: 40px;
		border: 1px solid white;
		padding: 5px;
		&__content {
			height: 100%;
			width: 100%;
			cursor: pointer;
			&-active {
				background-color: white;
			}
		}
	}
</style>
