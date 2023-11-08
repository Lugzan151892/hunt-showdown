<template>
	<div class="menu">
		<div v-for="item in items" :key="`${item}-key`" class="menu__item">
			<img :src="`_nuxt/assets/images/${item.img}.svg`" alt="menu" class="menu__item-logo" />
			<p v-if="showFullMenu">{{ item.name }}</p>
		</div>
	</div>
</template>
<script setup lang="ts">
	const props = defineProps({
		items: {
			type: Array<{ name: string; img: string }>,
			required: true
		},
		showFullMenu: {
			type: Boolean,
			default: false
		}
	});

	console.log(props);
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
			padding: 10px 0;
			cursor: pointer;
			grid-template-columns: max-content max-content;
			column-gap: 15px;
			align-items: center;
			&-logo {
				height: 40px;
				width: 40px;
			}
		}
		&__item:hover {
			border: 1px solid white;
		}
	}
</style>
