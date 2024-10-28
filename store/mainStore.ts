import { defineStore } from 'pinia';
import api from '~/services/api';
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
	const loading = ref(false);

	const user = ref<null | COMMON.IUserData>(null);
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

	const handleLogout = async () => {
		try {
			loadingStart();
			const result = await api.post('/user/logout', { userName: user.value?.username || '' });

			if (result) {
				console.log(result);
			}
			localStorage.removeItem('token');
			user.value = null;
			isAuth.value = false;
			clearData();
		} catch (e: any) {
			console.log(e);
		} finally {
			loadingStop();
		}
	};

	const loadingStart = () => {
		loading.value = true;
	};

	const loadingStop = () => {
		loading.value = false;
	};

	return {
		mainModal,
		mainModalSettings,
		openModal,
		clearData,
		user,
		isAuth,
		handleLogout,
		loading,
		loadingStart,
		loadingStop
	};
});
