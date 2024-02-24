<template>
	<div class="wrapper">
		<div class="container" :class="{ 'container-error': errors }">
			<input
				v-model="value"
				class="container__input"
				:type="computedType"
				:placeholder="placeholder"
				@input="$emit('input', $event)"
				@change="$emit('change', $event)"
			/>
			<img
				v-if="props.type === 'password'"
				:src="showPassword ? visibly : visiblyOff"
				class="container__append"
				@click="showPassword = !showPassword"
			/>
		</div>
		<p v-if="errors">{{ errors }}</p>
	</div>
</template>
<script lang="ts" setup>
	import visibly from '@/assets/images/password_hide.png';
	import visiblyOff from '@/assets/images/password_show.png';
	const emit = defineEmits(['update:modelValue', 'input', 'change']);
	const props = defineProps({
		modelValue: {
			type: String,
			required: true
		},
		placeholder: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		errors: {
			type: String,
			default: ''
		}
	});

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(val) {
			emit('update:modelValue', val);
		}
	});

	const showPassword = ref(false);

	const computedType = computed(() => {
		if (props.type !== 'password') return props.type;
		else return showPassword.value ? 'text' : 'password';
	});
</script>
<style lang="scss" scoped>
	.wrapper {
		display: grid;
		grid-template-rows: min-content min-content;
		row-gap: 3px;
		max-width: 300px;
		.container {
			display: grid;
			grid-template-columns: 1fr max-content;
			column-gap: 10px;
			border-bottom: 1px solid var(--bg-secondary);
			align-items: center;
			&-error {
				border-bottom: 1px solid red;
			}
			&__input {
				background: none;
				box-shadow: none;
				border: none;
				color: var(--text-color-primary);
				padding: 10px 0 10px 5px;
			}
			&__input:focus {
				outline: none;
			}
			&__append {
				cursor: pointer;
			}
		}
	}
</style>
