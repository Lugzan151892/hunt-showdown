<template>
	<div class="content">
		<p v-if="settings.type && settings.type === 'title'">{{ settings.text }}</p>
		<UiCustomSliderInput
			v-else-if="settings.options.length"
			v-model="huntStore.settings[settingsKey]"
			:options="settings.options"
		/>
		<UiCustomProgressBar
			v-else-if="settings.type !== 'checkbox'"
			v-model="huntStore.settings[settingsKey]"
			:min="0"
			:max="2"
			:step="0.1"
		/>
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
			type: String,
			required: true
		}
	});
	const huntStore = useHuntStore();
</script>
<style lang=""></style>
