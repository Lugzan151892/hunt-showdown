<template>
	<div class="content">
		<img class="content__image" :src="user.avatarmedium" alt="Avatar" />
		<div>Name: {{ user.personaname }}</div>
		<div>SteamID: {{ user.steamid }}</div>
		<div>Status: {{ user.personastate }}</div>
	</div>
</template>
<script lang="ts" setup>
	defineProps({
		user: {
			type: Object as PropType<BANNED.ISteamBannedUser>,
			required: true
		}
	});
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
	}
</style>
