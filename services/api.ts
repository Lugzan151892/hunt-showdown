import { jwtDecode } from 'jwt-decode';
const defaultPath = 'http://localhost:5000/api';
class Api {
	path;
	constructor() {
		this.path = defaultPath;
	}

	async get(path: string) {
		const response = await fetch(this.path + path);
		const result = await response.json();
		return jwtDecode(result.token);
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
			if (result.status === 200 && result.token) {
				return jwtDecode(result.token);
			} else {
				return result;
			}
		} catch (e) {
			console.log(e);
		}
	}
}

export default new Api();
