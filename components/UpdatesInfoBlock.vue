<template>
	<div class="updates">
		<div class="updates__item">
			<p class="updates__title">{{ $t('info.updatesVisualTitle') }}</p>
			<div class="updates__list">
				<ul>
					<li>{{ $t('info.updatesVisualList1') }}</li>
					<li>{{ $t('info.updatesVisualList2') }}</li>
					<li>{{ $t('info.updatesVisualList3') }}</li>
					<li>{{ $t('info.updatesVisualList4') }}</li>
				</ul>
			</div>
		</div>
		<div class="updates__item">
			<p class="updates__title">{{ $t('info.updatesLogicTitle') }}</p>
			<div class="updates__list">
				<ul>
					<li>{{ $t('info.updatesLogicList1') }}</li>
					<li>{{ $t('info.updatesLogicList2') }}</li>
					<li>{{ $t('info.updatesLogicList3') }}</li>
					<li>{{ $t('info.updatesLogicList4') }}</li>
					<li>{{ $t('info.updatesLogicList5') }}</li>
					<li>{{ $t('info.updatesLogicList6') }}</li>
					<li>{{ $t('info.updatesLogicList7') }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
	.updates {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: max-content max-content;
		&__item:last-child {
			margin-top: 10px;
		}
		&__title {
			font-size: 22px;
			margin-bottom: 10px;
		}
		&__list {
			ul {
				list-style-position: inside;
				li {
					margin-bottom: 8px;
				}
				li:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>
