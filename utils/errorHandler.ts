import { useMainStore } from '~/store/mainStore';

const errorHandler = (error?: API.IResponse<null>) => {
	const mainStore = useMainStore();
	if (error?.errorMessage) {
		mainStore.openModal(error?.errorMessage, undefined, 'error');
	} else {
		mainStore.openModal(error?.message || 'Произошла ошибка.\r\nСвяжитесь с разработчиками. asdas', undefined, 'error');
	}
};

export default errorHandler;
