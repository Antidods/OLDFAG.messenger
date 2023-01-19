export const checkValueValidity = (
	type: string,
	value: string
): { validateStatus: boolean; errorMessage?: string } => {
	const _pattern: Record<string, RegExp> = {
		first_name: /^[А-ЯA-Z][a-zA-Zа-яА-Я/-]{1,20}$/,
		second_name: /^[А-ЯA-Z][a-zA-Zа-яА-Я/-]{1,20}$/,
		display_name: /^[А-ЯA-Z][a-zA-Zа-яА-Я/-]{1,20}$/,
		login: /^[a-zA-Z][a-zA-Z0-9-_-]{3,20}$/,
		email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i,
		password: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6}/,
		second_password: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6}/,
		phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
		message: /^\s*$/,
	};

	const _errorMessage: Record<string, string> = {
		first_name: 'недопустимое значение',
		second_name: 'недопустимое значение',
		display_name: 'недопустимое значение',
		login: 'недопустимое значение',
		email: 'недопустимое значение',
		password: 'недопустимое значение',
		second_password: 'пароли не совпадают',
		phone: 'недопустимое значение',
		message: 'сообщение содержит недопустимые символы',
	};

	if (!_pattern[type]) return { validateStatus: true };

	const validateStatus: boolean = _pattern[type].test(value);

	const errorMessage = validateStatus ? undefined : _errorMessage[type];

	return { validateStatus, errorMessage };
};

export const checkElementValidity = (input: any) => {
	const validStatus: boolean = checkValueValidity(input.name, input.value).validateStatus;
	const { errorMessage } = checkValueValidity(input.name, input.value);
	const sibling: HTMLElement | any = input.nextElementSibling;
	input.dataset.valid = validStatus.toString();
	if (!input.value) {
		sibling.textContent = 'поле не должно быть пустым';
	} else {
		sibling.textContent = errorMessage || '';
	}
};

export const checkFormValidity = (form: any): Record<string, unknown> => {
	const _data: any = {};
	const formElements = form.elements;

	for (const item of formElements) {
		if (item.tagName !== 'INPUT' || item.name === 'second_password') continue;
		checkElementValidity(item);
		_data[item.name] = item.value.toString();
	}

	form.dataset.valid = 'true';
	for (const item of formElements) {
		if (item.tagName !== 'INPUT') continue;

		if (item.name === 'second_password' && item.value !== formElements.password.value) {
			form.dataset.valid = 'false';
			break;
		}

		if (item.dataset.valid === 'false' || !item.dataset.valid) {
			form.dataset.valid = 'false';
			break;
		}
	}

	return _data;
};
