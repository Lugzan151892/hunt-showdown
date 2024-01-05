const defaultPath = 'http://localhost:5000/api';
class Api {
	path;
	constructor() {
		this.path = defaultPath;
	}

	async get(path: string, token?: string) {
		const response = await fetch(this.path + path, {
			headers: {
				...(token && { Authorization: 'Bearer ' + token })
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
					'Content-Type': 'application/json;charset=utf-8'
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
					'Content-Type': 'application/json;charset=utf-8'
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
