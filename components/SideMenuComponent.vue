<template>
	<div class="menu">
		<div
			v-for="item in items"
			:key="`${item}-key`"
			class="menu__item"
			:class="{ 'menu__item-active': $route.params.game === item.route }"
			@click="handleClickRoute('games-game', item.route)"
		>
			<img :src="`_nuxt/assets/images/${item.img}.svg`" :alt="item.img" class="menu__item-logo" />
			<p v-if="showFullMenu" class="menu__item-name">{{ item.name }}</p>
		</div>
		<div
			class="menu__item"
			:class="{ 'menu__item-active': $route.fullPath === '/' }"
			@click="handleClickRoute('index')"
		>
			<img src="../assets/images/home.svg" alt="home" class="menu__item-logo" />
			<p v-if="showFullMenu" class="menu__item-name">{{ $t('main.toMainPage') }}</p>
		</div>
	</div>
</template>
<script setup lang="ts">
	defineProps({
		items: {
			type: Array<{ name: string; img: string; route: string }>,
			required: true
		},
		showFullMenu: {
			type: Boolean,
			default: false
		}
	});

	const router = useRouter();

	const handleClickRoute = (routeName: string, game?: string): void => {
		router.push({ name: routeName, ...(game && { params: { game } }) });
	};
</script>
<style lang="scss" scoped>
	.menu {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr;
		row-gap: 10px;
		background: var(--bg-header, #202020);
		&__item {
			display: grid;
			padding: 10px;
			cursor: pointer;
			grid-template-columns: max-content max-content;
			align-items: center;
			border-radius: 10px;
			&-active {
				background-color: rgba(88, 88, 88, 0.137);
			}
			&-logo {
				height: 30px;
				width: 30px;
			}
			&-name {
				margin-left: 15px;
			}
		}
		&__item:hover {
			background-color: rgba(88, 88, 88, 0.137);
		}
	}
</style>
