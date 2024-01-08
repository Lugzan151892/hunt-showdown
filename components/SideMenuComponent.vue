<template>
	<div class="menu">
		<div
			v-for="item in items"
			:key="`${item}-key`"
			class="menu__item"
			:class="{ 'menu__item-active': $route.name === item.route }"
			@click="handleClickRoute(item.route)"
		>
			<img :src="item.img" :alt="item.img" class="menu__item-logo" />
			<p v-if="showFullMenu" class="menu__item-name">{{ item.name }}</p>
		</div>
		<div class="menu__item" :class="{ 'menu__item-active': $route.fullPath === '/' }" @click="handleClickRoute('home')">
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

	const handleClickRoute = (routeName: string): void => {
		router.push({ name: routeName });
	};
</script>
<style lang="scss" scoped>
	.menu {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr;
		&__item {
			display: grid;
			padding: 5px;
			cursor: pointer;
			grid-template-columns: max-content max-content;
			align-items: center;
			border-radius: 10px;
			margin-bottom: 15px;
			&-logo {
				height: 30px;
				width: 30px;
			}
			&-name {
				margin-left: 15px;
			}
			&-active {
				background-color: var(--menu-icon-active);
			}
		}
		&__item:last-child {
			margin-bottom: 0;
		}
		&__item:hover {
			background-color: var(--menu-icon-active);
		}
	}
</style>
