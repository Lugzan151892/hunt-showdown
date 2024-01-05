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
		<div class="hunt__save">
			<UiCustomButton title="save" @click="handleSave" />
		</div>
	</div>
</template>
<script lang="ts" setup>
	import huntSettings from '@/mock/huntSettings.json';
	import HuntSettingsItem from '@/pages/games/hunt/components/HuntSettingsItem.vue';
	import { useHuntStore } from '@/pages/games/hunt/store';

	const huntStore = useHuntStore();
	const huntDefaultSettings = computed(() => huntSettings as unknown as HUNT.IHuntSettings);

	const isOpen = ref(true);

	const isTitle = (type?: 'title' | 'checkbox') => {
		return type === 'title';
	};

	const handleSave = () => {
		huntStore.saveUserSettings();
	};

	onMounted(() => {
		huntStore.handleFillSettings();
	});

	watch(() => huntStore.currentUser, huntStore.handleFillSettings);
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
		&__save {
			position: fixed;
			bottom: 50px;
			left: 50%;
			transform: translate(-50%, 50%);
		}
	}
</style>
