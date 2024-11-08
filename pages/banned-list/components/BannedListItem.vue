<template>
	<div class="content">
		<img class="content__image" :src="user.avatarMedium" alt="Avatar" @click="handleGoSteam()" />
		<div class="content__item">
			<p>{{ $t('banned.name') }}:</p>
			<p class="content__item-name" @click="handleGoSteam()">{{ user.personaName }}</p>
		</div>
		<div />
		<div class="content__item">
			<p>SteamID:</p>
			<p>{{ user.steamId }}</p>
		</div>
		<div class="content__item">
			<p>{{ $t('banned.status') }}:</p>
			<p :style="{ color: userStatus.color }">{{ $t(userStatus.text) }}</p>
		</div>
		<div class="content__banned content__item" :class="{ 'content__banned--active': user.banned }">
			<p>{{ $t('banned.profileVacStatus') }}:</p>
			<p>{{ $t(bannedStatusTitle) }}</p>
		</div>
		<UiCustomButton title="main.delete" @click="$emit('delete', user.id)" />
	</div>
</template>
<script lang="ts" setup>
	import { EUSERSTATUS } from '../interfaces';

	const props = defineProps({
		user: {
			type: Object as PropType<BANNED.ISteamBannedUser>,
			required: true
		}
	});

	defineEmits(['delete']);

	const userStatus = computed(() => {
		switch (props.user.personastate) {
			case EUSERSTATUS.OFFLINE:
				return { text: 'banned.offline', color: 'var(--user-offline)' };
			case EUSERSTATUS.ONLINE:
				return { text: 'banned.online', color: 'var(--user-online)' };
			case EUSERSTATUS.BUSY:
				return { text: 'banned.busy', color: 'var(--user-busy)' };
			case EUSERSTATUS.AWAY:
				return { text: 'banned.away', color: 'var(--user-away)' };
			case EUSERSTATUS.SNOOZE:
				return { text: 'banned.snooze', color: 'var(--user-away)' };
			case EUSERSTATUS.LOOKING_FOR_TRADE:
				return { text: 'banned.lookingToTrade', color: 'var(--user-other)' };
			case EUSERSTATUS.LOOKING_FOR_PLAY:
				return { text: 'banned.lookingToPlay', color: 'var(--user-other)' };
			default:
				return { text: '', color: '' };
		}
	});

	const bannedStatusTitle = computed(() => (props.user.banned ? 'banned.banned' : 'banned.notBanned'));

	const handleGoSteam = () => {
		window.open(props.user.profileUrl, '_blank');
	};
</script>
<style lang="scss" scoped>
	.content {
		display: grid;
		grid-template-columns: max-content max-content 1fr max-content 100px repeat(2, minmax(100px, 200px));
		column-gap: 10px;
		grid-template-rows: min-content;
		align-items: center;
		border-radius: 20px;
		border: 1px solid white;
		padding: 10px;
		&__image {
			border-radius: 20px;
			cursor: pointer;
		}
		&__item {
			display: grid;
			grid-template-rows: min-content min-content;
			row-gap: 5px;
			&-name {
				cursor: pointer;
			}
			&-name:hover {
				color: var(--bg-additional-blue);
			}
		}
		&__banned {
			color: lightgreen;
			&--active {
				color: red;
			}
		}
	}
</style>
