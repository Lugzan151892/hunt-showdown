// const defaultPath = 'https://hunter-service.fun/api';
const defaultPath = 'http://127.0.0.1:5000/api';
// const authToken = localStorage.getItem('token');
class Api {
	path;
	constructor() {
		this.path = defaultPath;
	}

	async get<Request, Response extends COMMON.IDefaultResponse>(path: string, params?: Request): Promise<Response> {
		let requestParams = '';
		if (params) {
			requestParams = Object.keys(params).reduce(
				(acc, curr) => `${acc}${acc ? '&' : '?'}${curr}=${(params as { [key: string]: string })[curr]}`,
				''
			);
		}
		const authToken = localStorage.getItem('token');
		const response = await fetch(this.path + path + requestParams, {
			headers: {
				...(authToken && { Authorization: 'Bearer ' + authToken })
			}
		});
		if (!response.ok) {
			throw new Error('Something went wrong, try again');
		}
		const result = await response.json();
		return result;
	}

	async post<Request, Response extends COMMON.IDefaultResponse>(
		path: string,
		options: Request
	): Promise<Response | undefined> {
		try {
			const authToken = localStorage.getItem('token');
			const response = await fetch(this.path + path, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken && { Authorization: 'Bearer ' + authToken })
				},
				body: JSON.stringify(options)
			});
			if (!response.ok) {
				throw new Error('Something went wrong, try again');
			}
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
		}
	}

	async put<Request, Response extends COMMON.IDefaultResponse>(
		path: string,
		options: Request
	): Promise<Response | undefined> {
		try {
			const authToken = localStorage.getItem('token');
			const response = await fetch(this.path + path, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken && { Authorization: 'Bearer ' + authToken })
				},
				body: JSON.stringify(options)
			});
			if (!response.ok) {
				throw new Error('Something went wrong, try again');
			}
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new Api();
