function validatePassword(password: string) {
	const errors = {
		password: ''
	};

	if (!password) {
		errors.password = 'validation.requiredField';
		return errors;
	}

	if (password.length < 6) {
		errors.password = 'validation.notEnoughtPasswordLength';
		return errors;
	}
	return errors;
}

function validateRepeatedPassword(password: string, repeatedPassword: string) {
	const errors = {
		repeatedPassword: ''
	};

	if (password !== repeatedPassword) {
		errors.repeatedPassword = 'validation.passwordsNotEqual';
		return errors;
	}

	return errors;
}

function validateUsername(username: string) {
	const errors = {
		username: ''
	};

	if (!username) {
		errors.username = 'validation.requiredField';
		return errors;
	}

	if (username.length < 3) {
		errors.username = 'validation.notEnoughtUsernameLength';
		return errors;
	}
	return errors;
}

const validationFunctions: { [key: string]: any } = {
	username: validateUsername,
	password: validatePassword,
	repeatedPassword: validateRepeatedPassword
};

export default function validateAll(options: { [key: string]: any }) {
	const errors: { [key: string]: any } = {};
	for (const key in options) {
		if (key === 'repeatedPassword') {
			Object.assign(errors, validationFunctions.repeatedPassword(options.password, options.repeatedPassword));
			continue;
		}
		Object.assign(errors, validationFunctions[key](options[key]));
	}
	const isValid = !Object.values(errors).some((el) => !!el);
	return { isValid, errors };
}
