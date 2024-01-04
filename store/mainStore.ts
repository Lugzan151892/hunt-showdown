import { defineStore } from 'pinia';
type TInfoModalIconType = 'success' | 'error' | 'warning';
interface IInfoModalSettings {
	type: TInfoModalIconType;
	text: string;
	buttonText: string;
	redirect: string;
}
export const useMainStore = defineStore('mainStore', () => {
	const mainModal = ref(false);
	const mainModalSettings = ref<IInfoModalSettings>({
		type: 'success',
		text: '',
		buttonText: 'main.accept',
		redirect: ''
	});

	const openModal = (text: string, redirect: string = '', type: TInfoModalIconType = 'success') => {
		mainModalSettings.value.text = text;
		mainModalSettings.value.type = type;
		mainModalSettings.value.redirect = redirect;
		mainModal.value = true;
	};

	return { mainModal, mainModalSettings, openModal };
});
