const defaultPath = 'https://hunter-service.fun/api';
const authToken = localStorage.getItem('token');
class Api {
	path;
	constructor() {
		this.path = defaultPath;
	}

	async get(path: string) {
		const response = await fetch(this.path + path, {
			headers: {
				...(authToken && { Authorization: 'Bearer ' + authToken })
			}
		});
		const result = await response.json();
		return result;
	}

	async post(path: string, options: any) {
		try {
			const response = await fetch(this.path + path, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken && { Authorization: 'Bearer ' + authToken })
				},
				body: JSON.stringify(options)
			});
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
		}
	}

	async put(path: string, options: any) {
		try {
			const response = await fetch(this.path + path, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					...(authToken && { Authorization: 'Bearer ' + authToken })
				},
				body: JSON.stringify(options)
			});
			const result = await response.json();
			return result;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new Api();
