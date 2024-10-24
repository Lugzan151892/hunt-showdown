<template>
	<article class="calculator">
		<h1 class="calculator__title">{{ $t('calc.calculatorTitle') }}</h1>
		<h2 class="calculator__description">{{ $t('calc.calculatorDescription') }}</h2>
		<div class="calculator__content">
			<label>
				<p>{{ $t('calc.inputSensitivity') }}:</p>
				<UiCustomInput
					v-model="userValue"
					:placeholder="$t('calc.inputSensitivity')"
					type="number"
					:max="3"
					@input="handleInputUserValue"
				/>
			</label>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.shoulderAim') }}</p>
				<UiCustomProgressBar v-model="shoulderAim" disabled />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.aimDownSights') }}</p>
				<UiCustomProgressBar v-model="aimDownSights" disabled />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.deadeyeScope') }}</p>
				<UiCustomProgressBar v-model="deadeyeScope" disabled />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.marksmanScope') }}</p>
				<UiCustomProgressBar v-model="marksmanScope" disabled />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.sniperScope') }}</p>
				<UiCustomProgressBar v-model="sniperScope" disabled />
			</div>
			<div v-if="userValue" class="calculator__item">
				<p class="calculator__item-title">{{ $t('hunt.aperture') }}</p>
				<UiCustomProgressBar v-model="aperture" disabled />
			</div>
		</div>
	</article>
</template>

<script lang="ts" setup>
	const userValue = ref(0);

	const shoulderAim = ref(0);
	const aimDownSights = ref(0);
	const deadeyeScope = ref(0);
	const marksmanScope = ref(0);
	const sniperScope = ref(0);
	const aperture = ref(0);

	const handleInputUserValue = () => {
		shoulderAim.value = userValue.value;
		aimDownSights.value = +(userValue.value * 0.8).toFixed(2);
		deadeyeScope.value = +(userValue.value * 0.7).toFixed(2);
		marksmanScope.value = +(userValue.value * 0.6).toFixed(2);
		sniperScope.value = +(userValue.value * 0.5).toFixed(2);
		aperture.value = +(userValue.value * 0.7).toFixed(2);
	};
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
			margin-top: 30px;
			grid-template-columns: 1fr 1fr;
			align-items: center;
			height: 50px;
			&-title {
				font-size: 26px;
			}
		}
	}
</style>
