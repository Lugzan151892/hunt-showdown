const API_PATH =
	window.location.origin === 'http://localhost:3000' ? 'http://localhost:8000/api' : `${window.location.origin}/api`;

type TApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ResponseType<R, S extends boolean> = S extends true ? API.IResponseSilent<R> : API.IResponse<R>;

class Api {
	static handleRequestStatus(status: number, silentError: boolean = false) {
		if (status >= 500 && status <= 599) {
			throw new SystemError('server', status);
		} else if (status === 401 && !silentError) {
			throw new SystemError('auth', status);
		}
	}

	static request<T>(path: string, method: TApiMethod, options: T | {} = {}): Promise<Response> {
		let requestParams = '';

		if (options && method === 'GET') {
			requestParams = Object.keys(options).reduce(
				(acc, curr) => `${acc}${acc ? '&' : '?'}${curr}=${(options as { [key: string]: string })[curr]}`,
				''
			);
		}

		const authToken = localStorage.getItem('token');

		return fetch(API_PATH + path + requestParams, {
			method,
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				...(authToken && { Authorization: `Bearer ${authToken}` })
			},
			credentials: 'include',
			...(method !== 'GET' && { body: JSON.stringify(options) })
		});
	}

	static async handleResponse<T, R, S extends boolean>(
		path: string,
		method: TApiMethod,
		options: T | {} = {},
		silent?: S
	): Promise<ResponseType<R, S>> {
		const response = await this.request<T>(path, method, options);

		this.handleRequestStatus(response.status);

		if (!silent && !response.ok && response.status < 500) {
			const error = await response.json();

			throw new UserError(error);
		}

		const result = await response.text();

		return {
			success: true,
			...JSON.parse(result)
		} as ResponseType<R, S>;
	}

	static async get<T, R>(path: string, options: T | {} = {}): Promise<API.IResponse<R>> {
		return await this.handleResponse<T, R, false>(path, 'GET', options);
	}

	static async getSilent<T, R>(path: string, options: T | {} = {}): Promise<API.IResponseSilent<R>> {
		return await this.handleResponse<T, R, true>(path, 'GET', options, true);
	}

	static async post<T, R>(path: string, options: T | {} = {}): Promise<API.IResponse<R>> {
		return await this.handleResponse<T, R, false>(path, 'POST', options);
	}

	static async postSilent<T, R>(path: string, options: T | {} = {}): Promise<API.IResponseSilent<R>> {
		return await this.handleResponse<T, R, true>(path, 'POST', options, true);
	}

	static async put<T, R>(path: string, options: T | {} = {}): Promise<API.IResponse<R>> {
		return await this.handleResponse<T, R, false>(path, 'PUT', options);
	}

	static async putSilent<T, R>(path: string, options: T | {} = {}): Promise<API.IResponseSilent<R>> {
		return await this.handleResponse<T, R, true>(path, 'PUT', options, true);
	}

	static async delete<T, R>(path: string, options: T | {} = {}): Promise<API.IResponse<R>> {
		return await this.handleResponse<T, R, false>(path, 'DELETE', options);
	}

	static async deleteSilent<T, R>(path: string, options: T | {} = {}): Promise<API.IResponseSilent<R>> {
		return await this.handleResponse<T, R, true>(path, 'DELETE', options, true);
	}
}

export default Api;
