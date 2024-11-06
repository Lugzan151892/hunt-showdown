import { useMainStore } from '~/store/mainStore';

const errorHandler = (error?: API.IResponse<null>) => {
	const mainStore = useMainStore();
	if (error?.errorMessage) {
		mainStore.openModal(error?.errorMessage, undefined, 'error', error.status);
	} else {
		mainStore.openModal(
			error?.message || 'Произошла ошибка.\r\nСвяжитесь с разработчиками. asdas',
			undefined,
			'error',
			error?.status || 500
		);
	}
};

export default errorHandler;
