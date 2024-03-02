<template>
	<article class="calculator">
		<h1 class="calculator__title">{{ $t('calc.calculatorTitle') }}</h1>
		<h2 class="calculator__description">{{ $t('calc.calculatorDescription') }}</h2>
		<div>
			<label>
				<p>{{ $t('calc.inputSensitivity') }}:</p>
				<UiCustomInput v-model="userValue" :placeholder="$t('calc.inputSensitivity')" type="number" />
			</label>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.shoulderAim') }}</p>
				<UiCustomProgressBar />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.aimDownSights') }}</p>
				<UiCustomProgressBar />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.deadeyeScope') }}</p>
				<UiCustomProgressBar />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.marksmanScope') }}</p>
				<UiCustomProgressBar />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.sniperScope') }}</p>
				<UiCustomProgressBar />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.aperture') }}</p>
				<UiCustomProgressBar />
			</div>
		</div>
	</article>
</template>

<script lang="ts" setup>
	const userValue = ref(0);
</script>

<style lang="scss" scoped>
	.calculator {
		max-width: 1280px;
		display: grid;
		padding-top: 20px;
		height: 100dvh;
		grid-template-rows: max-content max-content 1fr;
		&__title {
			text-align: center;
			font-size: 30px;
		}
		&__description {
			text-align: center;
		}
		&__item {
			display: grid;
			grid-template-columns: 1fr 1fr;
			align-items: center;
			height: 50px;
			&-title {
				font-size: 26px;
				margin-top: 30px;
			}
		}
	}
</style>
