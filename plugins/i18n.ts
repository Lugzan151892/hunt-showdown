import { createI18n, useI18n } from 'vue-i18n';

import {
	authRu,
	authEn,
	mainEn,
	mainRu,
	huntEn,
	huntRu,
	validationEn,
	validationRu,
	infoEn,
	infoRu,
	bannedEn,
	bannedRu
} from '@/locales/locales';

const dataList = [
	authEn,
	mainEn,
	authRu,
	mainRu,
	huntEn,
	huntRu,
	validationEn,
	validationRu,
	infoEn,
	infoRu,
	bannedEn,
	bannedRu
];

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
		messages: getTranslate(dataList)
	});
	vueApp.use(i18n);
});

export const useTranslate = () => {
	const { t } = useI18n();
	return t;
};
