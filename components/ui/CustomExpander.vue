<template>
	<div class="expander">
		<div class="expander__header">
			<img
				class="expander__header_img"
				:class="{ 'expander__header_img-opened': open }"
				:src="arrow"
				@click="open = !open"
			/>
			<p>{{ $t(title) }}</p>
			<img
				class="expander__header_img"
				:class="{ 'expander__header_img-opened': open }"
				:src="arrow"
				@click="open = !open"
			/>
		</div>
		<div v-if="open" class="expander__content">
			<slot />
		</div>
	</div>
</template>
<script lang="ts" setup>
	import arrow from '@/assets/images/arrow.svg';
	const props = defineProps({
		title: {
			type: String,
			default: ''
		},
		opened: {
			type: Boolean,
			default: false
		}
	});

	const open = ref(props.opened);
</script>
<style lang="scss" scoped>
	.expander {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr;
		row-gap: 10px;
		background: var(--bg-header, #202020);
		&__header {
			display: grid;
			grid-template-columns: max-content 1fr max-content;
			align-items: center;
			padding: 5px 15px;
			height: 50px;
			text-align: center;
			&_img {
				height: 30px;
				width: 30px;
				transition: all 0.5s ease-in-out;
				cursor: pointer;
				&-opened {
					transform: rotate(180deg);
				}
			}
		}
	}
</style>
