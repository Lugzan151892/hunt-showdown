<template>
	<div>
		tut budet hunt asdasdassssssssssssssssssssssss {{ huntStore.hunt }}
		<UiCustomExpander title="hunt.game" :opened="isOpen" @open="($event) => (isOpen = $event)">
			<UiCustomSliderInput v-model="value" :options="sliderOptions" />
			<UiCustomProgressBar v-model="progressValue" :min="0" :max="2" :step="0.1" />
		</UiCustomExpander>
	</div>
</template>
<script lang="ts" setup>
	import { useHuntStore } from '@/pages/games/hunt/store';

	const huntStore = useHuntStore();

	const isOpen = ref(true);
	const value = ref(1);
	const progressValue = ref(1.27);

	const sliderOptions = [
		{
			text: 'hunt.gunslinger',
			value: 0
		},
		{
			text: 'hunt.hunter',
			value: 1
		}
	];
</script>
<style lang="scss" scoped></style>
