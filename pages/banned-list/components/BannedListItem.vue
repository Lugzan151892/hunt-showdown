<template>
	<div class="content">
		<img class="content__image" :src="user.avatarmedium" alt="Avatar" />
		<div class="content__item">
			<p>{{ $t('banned.name') }}:</p>
			<p>{{ user.personaname }}</p>
		</div>
		<div />
		<div class="content__item">
			<p>SteamID:</p>
			<p>{{ user.steamid }}</p>
		</div>
		<div class="content__item">
			<p>{{ $t('banned.status') }}:</p>
			<p>{{ $t(userStatus) }}</p>
		</div>
		<div class="content__banned content__item" :class="{ 'content__banned--active': user.banned }">
			<p>{{ $t('banned.profileVacStatus') }}:</p>
			<p>{{ $t(bannedStatusTitle) }}</p>
		</div>
		<UiCustomButton title="main.delete" @click="$emit('delete', user.steamid)" />
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

	const userStatus = computed(() => {
		switch (props.user.personastate) {
			case EUSERSTATUS.OFFLINE:
				return 'banned.offline';
			case EUSERSTATUS.ONLINE:
				return 'banned.online';
			case EUSERSTATUS.BUSY:
				return 'banned.busy';
			case EUSERSTATUS.AWAY:
				return 'banned.away';
			case EUSERSTATUS.SNOOZE:
				return 'banned.snooze';
			case EUSERSTATUS.LOOKING_FOR_TRADE:
				return 'banned.lookingToTrade';
			case EUSERSTATUS.LOOKING_FOR_PLAY:
				return 'banned.lookingToPlay';
			default:
				return '';
		}
	});

	const bannedStatusTitle = computed(() => (props.user.banned ? 'banned.banned' : 'banned.notBanned'));

	defineEmits(['delete']);
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
		}
		&__item {
			display: grid;
			grid-template-rows: min-content min-content;
			row-gap: 5px;
		}
		&__banned {
			color: lightgreen;
			&--active {
				color: red;
			}
		}
	}
</style>
