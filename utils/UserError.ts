export default class UserError extends Error {
	public status: number;
	constructor(error: API.IResponseError) {
		super();
		this.message = error.errorMessage || error.message || 'Произошла ошибка.\r\nСвяжитесь с разработчиками.';
		this.status = error.status;
	}
}
