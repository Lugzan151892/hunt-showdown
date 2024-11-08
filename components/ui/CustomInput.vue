<template>
	<div class="wrapper">
		<div class="container" :class="{ 'container-error': errors }">
			<input
				class="container__input"
				:type="computedType"
				:placeholder="placeholder"
				:max="max"
				:value="modelValue"
				@input="handleInput($event)"
				@change="handleInput($event)"
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
	const emit = defineEmits<{
		input: [string | number];
		change: [string | number];
		'update:modelValue': [string | number];
	}>();
	const props = withDefaults(
		defineProps<{
			modelValue: string | number;
			placeholder?: string;
			type?: string;
			errors?: string;
			max?: number;
		}>(),
		{
			modelValue: '',
			placeholder: '',
			type: 'text',
			errors: '',
			max: 0
		}
	);

	const showPassword = ref(false);

	const computedType = computed(() => {
		if (props.type !== 'password') return props.type;
		else return showPassword.value ? 'text' : 'password';
	});

	const handleInput = (e: Event) => {
		const inputElement = e.target as HTMLInputElement;

		if (props.type === 'number') {
			if (props.max && +inputElement.value > props.max) return;
		}
		emit('input', inputElement.value);
		emit('change', inputElement.value);
		emit('update:modelValue', inputElement.value);
	};
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
