<template>
	<div>
		<UiCustomExpander
			v-for="(group, key) in huntDefaultSettings"
			:key="key"
			title="hunt.game"
			:opened="isOpen"
			@open="($event) => (isOpen = $event)"
		>
			<template v-for="(settings, settingsKey) in group" :key="key + settingsKey">
				<HuntSettingsItem :settings="settings" :settings-key="settingsKey" />
			</template>
		</UiCustomExpander>
	</div>
</template>
<script lang="ts" setup>
	import huntSettings from '@/mock/huntSettings.json';
	import HuntSettingsItem from '@/pages/games/hunt/components/HuntSettingsItem.vue';
	const huntDefaultSettings = computed(() => huntSettings as unknown as HUNT.IHuntSettings);

	const isOpen = ref(true);
</script>
<style lang="scss" scoped></style>
