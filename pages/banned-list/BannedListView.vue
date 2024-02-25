<template>
	<div class="banned">
		<div class="banned__title">{{ $t('main.bannedListPage') }}</div>
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
			<UiCustomButton v-if="currentUser" title="banned.loadList" @click="loadBannedUsers" />
			<div v-else class="banned__bottom-error">{{ $t('banned.loginToSeeList') }}</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import BannedListItem from './components/BannedListItem.vue';
	import api from '~/services/api';
	import { useMainStore } from '~/store/mainStore';

	const mainStore = useMainStore();

	const newPlayer = ref('');
	const bannedList = ref<BANNED.ISteamBannedUser[]>([]);

	const currentUser = computed(() => mainStore.user);
	const spectatedUsers = computed(() => mainStore.user?.spectated_users || []);

	const loadBannedUsers = async () => {
		// @todo fix etu huyny
		try {
			mainStore.loadingStart();
			const data = await api.post<any, BANNED.ISteamBannedUsersResponse>('/steam/list', {
				banned_list: spectatedUsers.value
			});
			if (data) {
				bannedList.value = data.data.players;
			}
			mainStore.loadingStop();
		} catch (e) {
			mainStore.openModal('Something went wrong, try again', undefined, 'error');
		} finally {
			mainStore.loadingStop();
		}
	};

	const handleChange = async () => {
		// @todo fix etu huyny
		try {
			mainStore.loadingStart();
			const data = await api.get<any, any>('/steam/steamid/get', { path: newPlayer.value });
			if (!data.error && data.data.steamId && currentUser.value) {
				if (currentUser.value.spectated_users.includes(data.data.steamId)) {
					mainStore.loadingStop();
					mainStore.openModal('banned.userAlreadyInList', undefined, 'error');
					return;
				}
				const result = await api.put<any, any>('/user/set', {
					...mainStore.user,
					spectated_users: [...currentUser.value.spectated_users, data.data.steamId]
				});
				if (!result.error) {
					mainStore.user = result.data.user;
					newPlayer.value = '';
					loadBannedUsers();
				}
			}
			mainStore.loadingStop();
		} catch (e) {
			mainStore.openModal('Something went wrong, try again', undefined, 'error');
		} finally {
			mainStore.loadingStop();
		}
	};

	const handleDelete = async (steamId: string) => {
		if (!mainStore.user) return;
		mainStore.user.spectated_users = mainStore.user.spectated_users.filter((id) => String(id) !== String(steamId));
		try {
			mainStore.loadingStart();
			const result = await api.put<any, any>('/user/set', mainStore.user);
			if (result.status === 200 && !result.error) {
				mainStore.user = result.data.user;
				loadBannedUsers();
			} else {
				mainStore.openModal(result.message, undefined, 'error');
			}
			mainStore.loadingStop();
		} catch (e) {
			mainStore.openModal('Something went wrong, try again', undefined, 'error');
		} finally {
			mainStore.loadingStop();
		}
	};

	onMounted(() => {
		if (currentUser.value) {
			loadBannedUsers();
		}
	});
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
