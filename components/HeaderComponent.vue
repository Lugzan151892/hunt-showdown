<template>
	<header class="header" :class="{ 'header-active': menu }">
		<img
			src="../assets/images/menu.svg"
			alt="menu"
			class="header__icon"
			:class="{ 'header__icon-active': menu }"
			@click="setMenu"
		/>
		<form v-if="menu" class="header__form">
			<label for="locale-select">{{ $t('main.chooseLanguage') }}</label>
			<select id="locale-select" v-model="$i18n.locale">
				<option value="en">en</option>
				<option value="ru">ru</option>
			</select>
		</form>
		<div class="header__menu" :class="{ 'header__menu-active': menu }">
			<SideMenuComponent :items="items" :show-full-menu="menu" />
			<div v-if="user">
				<p>{{ user.email }}</p>
				<UiCustomButton title="Выйти" @click="mainStore.handleLogout()" />
			</div>
			<div v-else>
				<UiCustomButton title="Войти" @click="handleLogin" />
			</div>
		</div>
	</header>
</template>
<script setup lang="ts">
	import hunt from '~/assets/images/hunt.svg';
	import { useMainStore } from '~/store/mainStore';
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
		{ name: 'Hunt Showdown', img: hunt, route: 'hunt-showdown' }
	];
	const handleLogin = () => {
		router.push({ name: 'login' });
	};
</script>
<style lang="scss" scoped>
	.header {
		width: 70px;
		height: 50px;
		display: grid;
		grid-template-columns: max-content 1fr;
		justify-items: center;
		align-items: center;
		column-gap: 10px;
		padding: 0 10px 0 15px;
		position: relative;
		background-color: var(--bg-header, #202020);
		transition: all 0.5s ease-in-out;
		&-active {
			width: 250px;
		}
		&__icon {
			transition: all 0.5s ease-in-out;
			max-height: 40px;
			max-width: 40px;
			cursor: pointer;
			&-active {
				transform: rotate(90deg);
			}
		}
		&__form {
			max-width: 200px;
			width: 100%;
			display: grid;
			grid-template-columns: max-content max-content;
			justify-content: space-around;
		}
		&__menu {
			position: absolute;
			top: 50px;
			left: 0px;
			padding: 0 10px 0;
			width: 70px;
			height: calc(100vh - 50px);
			border-radius: 5px;
			background-color: var(--bg-header, #202020);
			box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.35);
			transition: all 0.5s ease-in-out;
			&-active {
				width: 250px;
			}
		}
	}
</style>
