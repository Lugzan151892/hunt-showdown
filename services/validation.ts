export function validatePassword(password: string) {
	const errors = {
		password: ''
	};
	let isValid = false;

	if (password.length < 6) {
		errors.password = 'validation.notEnoughtPasswordLength';
		return { isValid, errors };
	}
	isValid = true;
	return { isValid, errors };
}

export function validateUsername(username: string) {
	const errors = {
		username: ''
	};
	let isValid = false;

	if (username.length < 6) {
		errors.username = 'validation.notEnoughtPasswordLength';
		return { isValid, errors };
	}
	isValid = true;
	return { isValid, errors };
}
