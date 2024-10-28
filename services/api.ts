// const defaultPath = 'https://hunter-service.fun/api';
// const defaultPath = 'http://localhost:8000/api';
const API_PATH = window.location.origin === 'http://localhost:3000' ? 'http://localhost:8000/api' : '/api';

class Api {
	static async get<T, R>(path: string, options: T | {} = {}): Promise<API.IResponse<R>> {
		let requestParams = '';

		if (options) {
			requestParams = Object.keys(options).reduce(
				(acc, curr) => `${acc}${acc ? '&' : '?'}${curr}=${(options as { [key: string]: string })[curr]}`,
				''
			);
		}

		const authToken = localStorage.getItem('token');

		const response = await fetch(API_PATH + path + requestParams, {
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				...(authToken && { Authorization: `Bearer ${authToken}` })
			},
			credentials: 'include'
		});

		if (!response.ok && response.status < 500 && response.status !== 401) {
			const error = await response.json();

			return {
				success: false,
				...error
			};
		} else if (!response.ok && response.status === 401) {
			localStorage.removeItem('token');
			return {
				success: false,
				error: true,
				errorMessage: 'Unauthorized',
				status: response.status
			};
		} else if (response.ok) {
			const token = response.headers.get('authorization');
			if (token) {
				localStorage.setItem('token', token);
			}
			const result = await response.text();

			if (response.status === 204 || !result) {
				return {
					success: true,
					error: false,
					status: response.status,
					data: {} as R
				};
			}

			return {
				success: true,
				...JSON.parse(result)
			};
		} else {
			/** @todo обработка ошибок */
			throw new Error('Произошла ошибка. Свяжитесь с разработчиками');
		}
	}

	static async post<T, R>(path: string, options: T | {} = {}): Promise<API.IResponse<R>> {
		const authToken = localStorage.getItem('token');
		const response = await fetch(API_PATH + path, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				...(authToken && { Authorization: `Bearer ${authToken}` })
			},
			credentials: 'include',
			body: JSON.stringify(options)
		});

		if (!response.ok && response.status < 500 && response.status !== 401) {
			const error = await response.json();

			return {
				success: false,
				...error
			};
		} else if (!response.ok && response.status === 401) {
			localStorage.removeItem('token');
			return {
				success: false,
				error: true,
				errorMessage: 'Unauthorized',
				status: response.status
			};
		} else if (response.ok) {
			const token = response.headers.get('authorization');
			if (token) {
				localStorage.setItem('token', token);
			}
			const result = await response.text();

			if (response.status === 204 || !result) {
				return {
					success: true,
					error: false,
					status: response.status,
					data: {} as R
				};
			}

			return {
				success: true,
				...JSON.parse(result)
			};
		} else {
			/** @todo обработка ошибок */
			throw new Error('Произошла ошибка. Свяжитесь с разработчиками');
		}
	}

	static async put<T, R>(path: string, options: T | {} = {}): Promise<API.IResponse<R>> {
		const authToken = localStorage.getItem('token');
		const response = await fetch(API_PATH + path, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				...(authToken && { Authorization: `Bearer ${authToken}` })
			},
			credentials: 'include',
			body: JSON.stringify(options)
		});

		if (!response.ok && response.status < 500 && response.status !== 401) {
			const error = await response.json();

			return {
				success: false,
				...error
			};
		} else if (!response.ok && response.status === 401) {
			localStorage.removeItem('token');
			return {
				success: false,
				error: true,
				errorMessage: 'Unauthorized',
				status: response.status
			};
		} else if (response.ok) {
			const token = response.headers.get('authorization');
			if (token) {
				localStorage.setItem('token', token);
			}
			const result = await response.text();

			if (response.status === 204 || !result) {
				return {
					success: true,
					error: false,
					status: response.status,
					data: {} as R
				};
			}

			return {
				success: true,
				...JSON.parse(result)
			};
		} else {
			/** @todo обработка ошибок */
			throw new Error('Произошла ошибка. Свяжитесь с разработчиками');
		}
	}
}

export default Api;
