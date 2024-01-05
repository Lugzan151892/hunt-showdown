import { defineStore } from 'pinia';
type TInfoModalIconType = 'success' | 'error' | 'warning';
interface IInfoModalSettings {
	type: TInfoModalIconType;
	text: string;
	buttonText: string;
	redirect: string;
}

const defaultModalSettings = (): IInfoModalSettings => ({
	type: 'success',
	text: '',
	buttonText: 'main.accept',
	redirect: ''
});

export const useMainStore = defineStore('mainStore', () => {
	const mainModal = ref(false);
	const mainModalSettings = ref<IInfoModalSettings>(defaultModalSettings());

	const user = ref<null | Partial<COMMON.JwtPayload>>(null);
	const isAuth = ref(false);

	const openModal = (text: string, redirect: string = '', type: TInfoModalIconType = 'success') => {
		mainModalSettings.value.text = text;
		mainModalSettings.value.type = type;
		mainModalSettings.value.redirect = redirect;
		mainModal.value = true;
	};

	const clearData = () => {
		mainModalSettings.value = defaultModalSettings();
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		user.value = null;
		isAuth.value = false;
		clearData();
	};

	return { mainModal, mainModalSettings, openModal, clearData, user, isAuth, handleLogout };
});
