<template>
	<div class="slider">
		<div class="slider__image" @click="handleClick(true)">
			<img :src="arrow" class="slider__image-prev" />
		</div>
		<p class="slider__text">{{ $t(currentValue?.text || '') }}</p>
		<div class="slider__image" @click="handleClick()">
			<img :src="arrow" class="slider__image-next" />
		</div>
		<div class="slider__pagination">
			<div
				v-for="(item, index) in options"
				:key="index"
				class="slider__pagination-item"
				:class="{ 'slider__pagination-item-active': currentIndex === index }"
				@click="value = index"
			/>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import arrow from '@/assets/images/arrow.svg';

	type TInputValue = {
		text: string;
		id: number;
	};

	const props = defineProps({
		modelValue: {
			type: Number,
			required: true
		},
		options: {
			type: Array as PropType<Array<TInputValue>>,
			default: () => []
		}
	});

	const emit = defineEmits(['update:modelValue']);

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(val) {
			emit('update:modelValue', val);
		}
	});

	const currentValue = computed(() => props.options.find((item) => item.id === value.value));
	const currentIndex = computed(() => props.options.findIndex((item) => item.id === value.value));

	const handleClick = (back: boolean = false) => {
		const lastValue = props.options[props.options.length - 1].id;
		const firstValue = props.options[0].id;
		if (back) {
			value.value = value.value === firstValue ? lastValue : value.value - 1;
			return;
		}
		value.value = value.value === lastValue ? firstValue : value.value + 1;
	};
</script>
<style lang="scss" scoped>
	.slider {
		display: grid;
		grid-template-columns: max-content 1fr max-content;
		align-items: center;
		text-align: center;
		padding: 5px 20px;
		&__image {
			display: flex;
			align-items: center;
			cursor: pointer;
			padding: 10px;
			border: 1px solid var(--bg-header);
			grid-row-start: 1;
			grid-row-end: 3;
			&-prev {
				width: 15px;
				height: 15px;
				transform: rotate(90deg);
			}
			&-next {
				width: 15px;
				height: 15px;
				transform: rotate(-90deg);
			}
		}
		&__image:hover {
			border: 1px solid white;
		}
		&__text {
			grid-area: 1 / 2 / 2 / 3;
		}
		&__pagination {
			display: grid;
			grid-auto-columns: min-content;
			grid-auto-flow: column;
			column-gap: 10px;
			height: 10px;
			align-items: center;
			justify-content: center;
			grid-area: 2 / 2 / 3 / 3;
			&-item {
				background-color: var(--bg-main);
				border: 0.5px solid white;
				width: 8px;
				height: 8px;
				cursor: pointer;
				&-active {
					background-color: white;
				}
			}
		}
	}
</style>
