<template>
	<header class="header">
		<div class="header__left">
			<img
				:src="menuIcon"
				alt="menu"
				class="header__left-icon"
				:class="{ 'header__left-icon-active': menu }"
				@click="setMenu"
			/>
			<div class="header__left__menu">
				<div
					v-for="item in items"
					:key="`${item}-key`"
					class="header__left__menu--item"
					:class="{ 'header__left__menu--item-active': $route.name === item.route }"
					@click="handleClickRoute(item.route)"
				>
					<img :src="item.img" :alt="item.img" class="header__left__menu--item-logo" />
				</div>
				<div
					class="header__left__menu--item"
					:class="{ 'header__left__menu--item-active': $route.fullPath === '/' }"
					@click="handleClickRoute('home')"
				>
					<img src="../assets/images/home.svg" alt="home" class="header__left__menu--item-logo" />
				</div>
			</div>
			<div class="header__left__bottom">
				<div v-if="user" class="header__left__bottom-user">
					<p>{{ user.username }}</p>
					<UiCustomButton title="auth.logout" @click="mainStore.handleLogout()" />
				</div>
				<div v-else>
					<UiCustomButton title="auth.loginTitle" @click="handleLogin" />
				</div>
			</div>
		</div>
		<div class="header__right" :class="{ 'header__right--active': menu }">
			<div class="header__right-title">{{ $t('main.menuTitle') }}</div>
			<form v-if="menu" class="header__right-form">
				<div class="header__right-form__language">
					<label for="locale-select">{{ $t('main.chooseLanguage') }}</label>
					<select id="locale-select" v-model="$i18n.locale" class="header__right-form__language-select">
						<option value="en">en</option>
						<option value="ru">ru</option>
					</select>
				</div>
			</form>
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

	const handleClickRoute = (routeName: string): void => {
		router.push({ name: routeName });
	};
</script>
<style lang="scss" scoped>
	.header {
		max-width: 100%;
		display: grid;
		height: 100vh;
		position: fixed;
		grid-template-columns: max-content max-content;
		top: 0;
		left: 0px;
		padding-top: 15px;
		background-color: var(--bg-header, #202020);
		&__left {
			width: 80px;
			min-height: 100%;
			display: grid;
			grid-template-rows: max-content 1fr max-content;
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
			&__menu {
				margin: 0 auto;
				width: 40px;
				margin-top: 15px;
				&-active {
					width: 225px;
				}
				&--item {
					border-radius: 10px;
					cursor: pointer;
					display: grid;
					justify-items: center;
					padding: 5px;
					margin-bottom: 10px;
					&-logo {
						height: 30px;
						width: 30px;
					}
					&-active {
						background-color: var(--menu-icon-active);
					}
				}
				&--item:last-child {
					margin-bottom: 0;
				}
			}
			&__bottom {
				padding: 0 5px 15px;
				align-self: flex-end;
				&-user {
					display: grid;
					grid-template-rows: max-content max-content;
					justify-items: center;
					row-gap: 15px;
				}
			}
		}
		&__right {
			overflow: hidden;
			width: 0px;
			transition: width ease-in-out 0.5s;
			display: grid;
			grid-template-rows: 40px max-content;
			row-gap: 15px;
			&--active {
				width: 150px;
			}
			&-title {
				margin: auto 0;
			}
			&-form {
				&__language {
					display: grid;
					grid-template-rows: min-content min-content;
					row-gap: 5px;
					height: 40px;
					&-select {
						max-width: 50px;
					}
				}
			}
		}
	}
</style>
