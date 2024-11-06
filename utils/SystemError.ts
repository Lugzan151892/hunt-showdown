type ErrorType = 'unknown' | 'server' | 'auth';

export default class SystemError extends Error {
	private type: ErrorType;

	constructor(type: ErrorType = 'unknown') {
		super();

		this.name = 'SystemError';
		this.type = type;

		switch (this.type) {
			case 'server':
				this.message = 'Ошибка сервера.\r\nСвяжитесь с разработчиками.';
				break;
			case 'auth':
				this.message = 'Ошибка авторизации.';
				break;
			default:
				this.message = 'Произошла ошибка.\r\nСвяжитесь с разработчиками.';
				break;
		}
	}

	getType() {
		return this.type;
	}
}
