<template>
	<div class="wrapper">
		<img class="wrapper__image" :src="loading" alt="loading-animation" />
	</div>
</template>
<script lang="ts" setup>
	import loading from '@/assets/images/loading.gif';
</script>
<style lang="scss" scoped>
	.wrapper {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.9);
		display: grid;
		justify-content: center;
		align-items: center;
		&__image {
			width: 80px;
			height: 80px;
		}
	}
</style>
