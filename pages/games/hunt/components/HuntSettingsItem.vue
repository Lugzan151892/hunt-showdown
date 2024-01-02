<template>
	<div class="content">
		<UiCustomSliderInput
			v-if="settings.type !== 'title' && settings.options?.length"
			v-model="huntStore.settings[settingsKey]"
			:options="settings.options"
		/>
		<UiCustomProgressBar
			v-else-if="settings.type !== 'title' && settings.type !== 'checkbox'"
			v-model="huntStore.settings[settingsKey]"
			:min="0"
			:max="2"
			:step="0.1"
		/>
		<div v-else-if="settings.type === 'checkbox'" class="content__checkbox">
			<UiCustomCheckbox v-model="huntStore.settings[settingsKey]" />
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { useHuntStore } from '@/pages/games/hunt/store';
	defineProps({
		settings: {
			type: Object,
			required: true
		},
		settingsKey: {
			type: String as PropType<string | number>,
			required: true
		}
	});
	const huntStore = useHuntStore();
</script>
<style lang="scss" scoped>
	.content {
		&__checkbox {
			width: 100%;
			margin: 0 auto;
			display: grid;
			justify-content: center;
		}
	}
</style>
