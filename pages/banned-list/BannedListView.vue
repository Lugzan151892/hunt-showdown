<template>
	<article class="banned">
		<h1 class="banned__title">{{ $t('main.bannedListPage') }}</h1>
		<div class="banned__add">
			<div>{{ $t('banned.addNewPlayer') }}</div>
			<UiCustomInput v-model="newPlayer" :placeholder="$t('banned.addSteamLink')" />
			<UiCustomButton title="banned.add" @click="handleChange" />
		</div>
		<div class="banned__list">
			<BannedListItem
				v-for="(user, index) in bannedList"
				:key="index"
				:user="user"
				class="banned__list--item"
				@delete="handleDelete($event)"
			/>
		</div>
		<div class="banned__bottom">
			<UiCustomButton v-if="mainStore.user" title="banned.loadList" @click="loadBannedUsers" />
			<div v-else class="banned__bottom-error">{{ $t('banned.loginToSeeList') }}</div>
		</div>
	</article>
</template>
<script lang="ts" setup>
	import BannedListItem from '~/pages/banned-list/components/BannedListItem.vue';
	import api from '~/services/api';
	import { useMainStore } from '~/store/mainStore';

	const mainStore = useMainStore();

	const newPlayer = ref('');
	const bannedList = ref<BANNED.ISteamBannedUser[]>([]);

	const loadBannedUsers = async () => {
		try {
			mainStore.loadingStart();
			const result = await api.get<any, BANNED.ISteamBannedUsersResponse>('/steam/list');
			if (result.success) {
				bannedList.value = result.data.bannedUsers.sort((a, b) => b.id - a.id);
			}
			mainStore.loadingStop();
		} catch (e: any) {
			errorHandler(e);
		} finally {
			mainStore.loadingStop();
		}
	};

	const handleChange = async () => {
		try {
			mainStore.loadingStart();
			const data = await api.get<any, any>('/steam/steamid/get', { path: newPlayer.value });
			if (data.data.steamId) {
				await api.post<any, any>('/banned/add', {
					steamId: data.data.steamId,
					comment: ''
				});
				newPlayer.value = '';
			}
		} catch (e: any) {
			errorHandler(e);
		} finally {
			mainStore.loadingStop();
		}
	};

	const handleDelete = async (id: number) => {
		try {
			mainStore.loadingStart();
			await api.delete<any, any>('/banned/delete', { id });
			await loadBannedUsers();
		} catch (e: any) {
			errorHandler(e);
		} finally {
			mainStore.loadingStop();
		}
	};

	loadBannedUsers();
</script>
<style lang="scss" scoped>
	.banned {
		max-width: 1280px;
		display: grid;
		padding-top: 20px;
		height: 100dvh;
		grid-template-rows: max-content max-content 1fr;
		&__title {
			text-align: center;
			font-size: 30px;
		}
		&__add {
			display: grid;
			grid-template-columns: max-content max-content max-content;
			column-gap: 15px;
			margin: 40px auto 0;
			align-items: center;
		}
		&__list {
			max-height: 60vh;
			overflow-y: auto;
			padding-right: 10px;
			margin-top: 40px;
			&--item:not(:last-child) {
				margin-bottom: 10px;
			}
		}
		&__list::-webkit-scrollbar {
			margin: 40px 0;
			padding: 10px 0;
			width: 8px;
			background: var(--menu-icon-active);
			border-radius: 50px;
			border: 1px solid white;
		}
		&__list::-webkit-scrollbar-thumb {
			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 1) 20%,
				rgba(0, 0, 0, 0.95) 50%,
				rgba(255, 255, 255, 1) 80%
			);
			border-bottom: 2px solid white;
			border-top: 2px solid rgba(255, 255, 255, 1);
			border-radius: 50px;
			position: relative;
		}
		&__bottom {
			position: fixed;
			bottom: 50px;
			left: 50%;
			transform: translate(-50%, 50%);
		}
	}
</style>
