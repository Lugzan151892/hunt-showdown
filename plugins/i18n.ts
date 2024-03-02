import { createI18n, useI18n } from 'vue-i18n';
import * as locales from '@/locales/locales';

function getTranslate(arr: Array<COMMON.TTranslate>): COMMON.TTranslateMain {
	const newData = arr.reduce((obj: COMMON.TTranslateMain, item: COMMON.TTranslate) => {
		const newData: { [key: string]: string } = {};
		for (const key in item.translations) {
			newData[`${item.name}.${key}`] = item.translations[key];
		}
		obj[item.locale] = { ...obj[item.locale], ...newData };
		return obj;
	}, {});
	return newData;
}

export default defineNuxtPlugin(({ vueApp }) => {
	const i18n = createI18n({
		legacy: false,
		globalInjection: true,
		locale: 'ru',
		messages: getTranslate(Object.values(locales))
	});
	vueApp.use(i18n);
});

export const useTranslate = () => {
	const { t } = useI18n();
	return t;
};
