<template>
	<header class="header" :class="{ 'header-active': menu }">
		<div class="header__top" :class="{ 'header__top-active': menu }">
			<img
				:src="menuIcon"
				alt="menu"
				class="header__top-icon"
				:class="{ 'header__top-icon-active': menu }"
				@click="setMenu"
			/>
			<form v-if="menu" class="header__top-form">
				<label for="locale-select">{{ $t('main.chooseLanguage') }}</label>
				<select id="locale-select" v-model="$i18n.locale">
					<option value="en">en</option>
					<option value="ru">ru</option>
				</select>
			</form>
		</div>
		<div class="header__menu" :class="{ 'header__menu-active': menu }">
			<SideMenuComponent :items="items" :show-full-menu="menu" />
		</div>
		<div class="header__bottom">
			<div v-if="user" class="header__bottom-user">
				<p v-if="menu">{{ user.email }}</p>
				<UiCustomButton title="Выйти" @click="mainStore.handleLogout()" />
			</div>
			<div v-else>
				<UiCustomButton title="Войти" @click="handleLogin" />
			</div>
		</div>
	</header>
</template>
<script setup lang="ts">
	import huntIcon from '@/assets/images/hunt.svg';
	import { useMainStore } from '~/store/mainStore';
	import menuIcon from '@/assets/images/menu.svg';
	// import cs from '~/assets/images/counter-strike.svg';

	const mainStore = useMainStore();

	const user = computed(() => mainStore.user);
	const menu = ref(false);
	const setMenu = () => {
		menu.value = !menu.value;
	};
	const router = useRouter();

	const items = [
		// { name: 'Counter-Strike-2', img: cs, route: 'counter-strike' },
		{ name: 'Hunt Showdown', img: huntIcon, route: 'hunt-showdown' }
	];
	const handleLogin = () => {
		router.push({ name: 'login' });
	};
</script>
<style lang="scss" scoped>
	.header {
		width: 80px;
		display: grid;
		grid-template-rows: max-content 1fr;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0px;
		padding-top: 15px;
		background-color: var(--bg-header, #202020);
		transition: all 0.5s ease-in-out;
		&-active {
			width: 250px;
		}
		&__top {
			display: grid;
			grid-template-columns: max-content 1fr;
			margin: 0 auto 15px;
			&-icon {
				display: grid;
				margin: 0 auto;
				transition: all 0.5s ease-in-out;
				max-height: 40px;
				max-width: 40px;
				cursor: pointer;
				&-active {
					grid-area: 1 / 1 / 2 / 2;
					transform: rotate(90deg);
				}
			}

			&-form {
				margin-left: 15px;
				width: 100%;
				display: grid;
				grid-template-columns: max-content max-content;
				align-content: center;
				label {
					margin-right: 10px;
				}
			}
			&-active {
				width: 225px;
			}
		}
		&__menu {
			margin: 0 auto;
			width: 40px;
			&-active {
				width: 225px;
			}
		}
		&__bottom {
			padding: 0 5px 15px;
			&-user {
				display: grid;
				grid-template-columns: max-content max-content;
				align-items: center;
				justify-content: space-around;
			}
		}
	}
</style>
