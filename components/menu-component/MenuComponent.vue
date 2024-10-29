<template>
	<header
		:class="{
			[$style[className]]: true,
			[$style[`${className}--active`]]: menu
		}"
	>
		<div :class="$style[`${className}-left`]">
			<img
				:src="menuIcon"
				alt="menu"
				:class="{
					[$style[`${className}-left--icon`]]: true,
					[$style[`${className}-left--icon-active`]]: menu
				}"
				@click="setMenu"
			/>
			<div :class="$style[`${className}-menu`]">
				<div
					v-for="item in items"
					:key="`${item}-key`"
					:class="{
						[$style[`${className}-menu--item`]]: true,
						[$style[`${className}-menu--item-active`]]: $route.name === item.route
					}"
					@click="handleClickRoute(item.route)"
				>
					<img :src="item.img" :alt="item.img" :class="$style[`${className}-menu--item-logo`]" />
				</div>
			</div>
			<div :class="$style[`${className}-left--bottom`]">
				<UiCustomButton v-if="mainStore.user" title="auth.logout" @click="mainStore.handleLogout()" />
				<UiCustomButton v-if="!mainStore.user" title="auth.loginTitle" @click="handleLogin" />
			</div>
		</div>
		<div :class="$style[`${className}-right`]">
			<div :class="$style[`${className}-right--title`]">{{ $t('main.menuTitle') }}</div>
			<div :class="$style[`${className}-right--menu`]">
				<div
					v-for="item in items"
					:key="`${item}-key`"
					:class="{
						[$style[`${className}-right--menu-item`]]: true,
						[$style[`${className}-right--menu-item--active`]]: $route.name === item.route
					}"
					@click="handleClickRoute(item.route)"
				>
					{{ $t(item.text) }}
				</div>
			</div>
			<div :class="$style[`${className}-right--bottom`]">
				<div>
					{{ mainStore.user ? `Вы вошли как ${mainStore.user.username}` : 'Не авторизован' }}
				</div>
				<form v-if="menu" :class="$style[`${className}-right--bottom-form`]">
					<label for="locale-select">{{ $t('main.chooseLanguage') }}</label>
					<select id="locale-select" v-model="$i18n.locale">
						<option value="en">en</option>
						<option value="ru">ru</option>
					</select>
				</form>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
	import huntIcon from '@/assets/images/hunt.svg';
	import { useMainStore } from '~/store/mainStore';
	import menuIcon from '@/assets/images/menu.svg';
	import home from '@/assets/images/home.svg';
	import ban from '@/assets/images/ban.svg';

	const className = 'menu-component';

	const mainStore = useMainStore();
	const menu = ref(false);

	const setMenu = () => {
		menu.value = !menu.value;
	};

	const router = useRouter();

	const items = [
		{ name: 'Main Page', img: home, route: 'home', text: 'main.mainPage' },
		{ name: 'Hunt Showdown', img: huntIcon, route: 'hunt-showdown', text: 'main.huntSettingsPage' },
		{ name: 'Banned list', img: ban, route: 'suspicious-players', text: 'main.bannedListPage' }
	];

	const handleLogin = () => {
		router.push({ name: 'login' });
	};

	const handleClickRoute = (routeName: string): void => {
		router.push({ name: routeName });
	};
</script>

<style lang="scss" module>
	$component: 'menu-component';
	.#{$component} {
		max-width: 100%;
		display: grid;
		height: 100vh;
		position: fixed;
		grid-template-columns: 80px 1fr;
		top: 0;
		left: 0px;
		padding-top: 15px;
		background-color: var(--bg-header, #202020);
		width: 80px;
		transition: width ease-in-out 0.3s;

		&--active {
			width: 280px;
		}

		&-left {
			width: 80px;
			min-height: 100%;
			display: grid;
			grid-template-rows: max-content 1fr max-content;
			&--icon {
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
			&--bottom {
				padding: 0 5px 15px;
			}
		}

		&-menu {
			margin: 0 auto;
			width: 50px;
			margin-top: 15px;

			&--item {
				border-radius: 10px;
				cursor: pointer;
				display: grid;
				justify-items: center;
				padding: 10px;
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

		&-right {
			overflow: hidden;
			width: 100%;
			display: grid;
			grid-template-rows: max-content 1fr max-content;
			min-height: 100%;
			&--title {
				margin: auto 0;
				height: 40px;
				display: grid;
				align-items: center;
				text-align: center;
				background-color: var(--menu-icon-active);
				border-radius: 10px;
			}
			&--menu {
				margin-top: 15px;
				&-item {
					@extend .#{$component}-menu--item;
					height: 50px;
					display: grid;
					align-items: center;
					text-align: center;
					&--active {
						@extend .#{$component}-menu--item-active;
					}
				}
			}
			&--bottom {
				padding: 0 5px 15px;
				display: grid;
				row-gap: 15px;

				&-form {
					display: grid;
					grid-template-columns: max-content max-content;
					column-gap: 5px;
				}
			}
		}
		&-right > div {
			margin-right: 15px;
		}
	}
</style>
