<template>
	<div class="content">
		<img class="content__image" :src="user.avatarmedium" alt="Avatar" />
		<div>Name: {{ user.personaname }}</div>
		<div>SteamID: {{ user.steamid }}</div>
		<div>Status: {{ user.personastate }}</div>
		<div class="content__banned" :class="{ 'content__banned--active': user.banned }">
			Is VAC on ACC: {{ user.banned }}
		</div>
		<UiCustomButton title="main.delete" @click="$emit('delete', user.steamid)" />
	</div>
</template>
<script lang="ts" setup>
	defineProps({
		user: {
			type: Object as PropType<BANNED.ISteamBannedUser>,
			required: true
		}
	});

	defineEmits(['delete']);
</script>
<style lang="scss" scoped>
	.content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-template-rows: min-content;
		align-items: center;
		border-radius: 20px;
		border: 1px solid white;
		padding: 10px;
		&__image {
			border-radius: 20px;
		}
		&__banned {
			color: lightgreen;
			&--active {
				color: red;
			}
		}
	}
</style>
