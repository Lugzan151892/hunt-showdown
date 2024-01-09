<template>
	<div class="hunt">
		<div class="hunt__content">
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
			<div v-if="huntStore.isSettingsChanged" class="hunt__save">
				<UiCustomButton title="main.save" @click="handleSave" />
			</div>
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
</script>
<style lang="scss" scoped>
	.hunt {
		margin: 40px 0;
		max-height: calc(100vh - 80px);
		overflow-y: auto;
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
	.hunt::-webkit-scrollbar {
		margin: 40px 0;
		padding: 10px 0;
		width: 8px;
		background: var(--menu-icon-active);
		border-radius: 50px;
		border: 1px solid white;
	}
	.hunt::-webkit-scrollbar-thumb {
		background: linear-gradient(90deg, rgba(255, 255, 255, 1) 20%, rgba(0, 0, 0, 0.95) 50%, rgba(255, 255, 255, 1) 80%);
		border-bottom: 2px solid white;
		border-top: 2px solid rgba(255, 255, 255, 1);
		border-radius: 50px;
		position: relative;
	}
</style>
