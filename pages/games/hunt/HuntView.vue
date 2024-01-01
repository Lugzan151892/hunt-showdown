<template>
	<div class="hunt">
		<UiCustomExpander
			v-for="(group, key) in huntDefaultSettings"
			:key="key"
			title="hunt.game"
			:opened="isOpen"
			@open="($event) => (isOpen = $event)"
		>
			<div
				v-for="(settings, settingsKey) in group"
				:key="`${key}` + settingsKey"
				class="hunt__item"
				:class="{ 'hunt__item-title': isTitle(settings.type) }"
			>
				<p>{{ settings.text }}</p>
				<HuntSettingsItem :settings="settings" :settings-key="settingsKey" />
			</div>
		</UiCustomExpander>
	</div>
</template>
<script lang="ts" setup>
	import huntSettings from '@/mock/huntSettings.json';
	import HuntSettingsItem from '@/pages/games/hunt/components/HuntSettingsItem.vue';
	const huntDefaultSettings = computed(() => huntSettings as unknown as HUNT.IHuntSettings);

	const isOpen = ref(true);

	const isTitle = (type?: 'title' | 'checkbox') => {
		return type === 'title';
	};
</script>
<style lang="scss" scoped>
	.hunt {
		padding-bottom: 40px;
		&__item {
			display: grid;
			grid-template-columns: 1fr 1fr;
			align-items: center;
			padding: 3px 0;
			margin: 0 20px;
			height: 50px;
			border-bottom: 1px solid white;
			&-title {
				font-size: 26px;
				border-bottom: none;
				margin-top: 30px;
			}
		}
	}
</style>
