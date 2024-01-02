<template>
	<div class="container">
		<input v-model="value" class="container__input" :type="computedType" :placeholder="placeholder" />
		<img
			v-if="props.type === 'password'"
			:src="showPassword ? visibly : visiblyOff"
			class="container__append"
			@click="showPassword = !showPassword"
		/>
	</div>
</template>
<script lang="ts" setup>
	import visibly from '@/assets/images/password_hide.png';
	import visiblyOff from '@/assets/images/password_show.png';
	const emit = defineEmits(['update:modelValue']);
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
	.container {
		display: grid;
		grid-template-columns: 1fr max-content;
		column-gap: 10px;
		border-bottom: 1px solid var(--bg-secondary);
		align-items: center;
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
</style>
