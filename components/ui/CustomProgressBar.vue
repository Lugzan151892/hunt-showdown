<template>
	<div class="container">
		<div ref="lineRef" class="line" @click="handleMouseDown($event)">
			<div class="line__filled" :style="{ width: `${fillPercent}%` }" />
		</div>
		<div class="number">{{ value }}</div>
	</div>
</template>
<script lang="ts" setup>
	const props = defineProps({
		max: {
			type: Number,
			default: 2
		},
		min: {
			type: Number,
			default: 0
		},
		step: {
			type: Number,
			default: 0.1
		},
		modelValue: {
			type: Number,
			default: 0
		}
	});

	const lineRef = ref<HTMLDivElement | null>(null);

	const emit = defineEmits(['update:modelValue']);

	const value = computed({
		get() {
			return props.modelValue;
		},
		set(val) {
			emit('update:modelValue', val);
		}
	});

	const fillPercent = ref(0);

	const handleMouseDown = (e: MouseEvent) => {
		if (lineRef.value) {
			const rangeDifference = e.clientX - lineRef.value.offsetLeft;
			const currentLineWidth = lineRef.value.clientWidth;
			fillPercent.value = +((rangeDifference / currentLineWidth) * 100).toFixed(2);
			value.value = +((props.max / 100) * fillPercent.value).toFixed(2);
		}
	};

	onMounted(() => {
		fillPercent.value = (value.value / props.max) * 100;
	});
</script>
<style lang="scss" scoped>
	.container {
		display: grid;
		grid-template-columns: 1fr max-content;
		column-gap: 10px;
		align-items: center;
	}
	.line {
		height: 10px;
		width: 100%;
		border: 1px solid white;
		&__filled {
			height: 100%;
			background-color: white;
		}
	}
	.number {
		width: 30px;
	}
</style>
