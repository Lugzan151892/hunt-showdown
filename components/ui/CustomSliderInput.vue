<template>
	<div class="slider">
		<img :src="arrow" class="slider__image slider__image-prev" @click="handleClick(value - 1)" />
		<p>{{ $t(currentValue || '') }}</p>
		<img :src="arrow" class="slider__image slider__image-next" @click="handleClick(value + 1)" />
	</div>
</template>
<script lang="ts" setup>
	import arrow from '@/assets/images/arrow.svg';
	const props = defineProps({
		modelValue: {
			type: Number,
			required: true
		},
		options: {
			type: Array as PropType<Array<{ text: string; value: number }>>,
			default: () => []
		}
	});
	const emit = defineEmits(['update:modelValue']);

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(val) {
			if (val >= 0) {
				emit('update:modelValue', val);
			}
			// emit('update:modelValue', val);
			console.log(val, props.modelValue);
		}
	});

	const currentValue = computed(() => props.options.find((item) => item.value === value.value)?.text);

	const handleClick = (val: number) => {
		const lastValue = props.options[props.options.length - 1].value;
		const firstValue = props.options[0].value;
		if (val) {
			value.value = val > lastValue ? firstValue : val;
		} else {
			value.value = lastValue;
		}
	};
</script>
<style lang="scss" scoped>
	.slider {
		display: grid;
		grid-template-columns: max-content 1fr max-content;
		text-align: center;
		&__image {
			width: 15px;
			height: 15px;
			&-prev {
				transform: rotate(90deg);
			}
			&-next {
				transform: rotate(-90deg);
			}
		}
	}
</style>
