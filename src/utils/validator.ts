export const checkValueValidity = (type: string, value: string): { validateStatus: boolean, errorMessage?: String } => {
	const _pattern: Record<string, RegExp> = {

		//first_name, second_name — латиница или кириллица, первая буква должна быть заглавной,
		// без пробелов и без цифр, нет спецсимволов (допустим только дефис).
		first_name: /^[А-ЯA-Z][a-zA-Zа-яА-Я/-]{1,20}$/,
		second_name: /^[А-ЯA-Z][a-zA-Zа-яА-Я/-]{1,20}$/,
		display_name: /^[А-ЯA-Z][a-zA-Zа-яА-Я/-]{1,20}$/,

		//login — от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,
		// без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
		login: /^[a-zA-Z][a-zA-Z0-9-_-]{3,20}$/,

		//email — латиница, может включать цифры и спецсимволы вроде дефиса,
		// обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.
		email: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/i,

		//password — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
		password: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6}/,
		second_password: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6}/,

		//phone — от 10 до 15 символов, состоит из цифр, может начинаться с плюса.
		phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,

		//message — не должно быть пустым.
		message: /^\s*$/
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
		message: 'сообщение содержит недопустимые символы'
	};

	let validateStatus: boolean = _pattern[type].test(value);

	const errorMessage = (validateStatus) ? undefined : _errorMessage[type];


	return { validateStatus, errorMessage };
};

export const checkFormValidity = (form: any): Record<string, string> => {
	const _data: Record<string, string> = {};
	const formElements = form.elements;

	for (let item of formElements) {
		if (item.tagName !== 'INPUT') continue;
		checkElementValidity(item);
		_data[item.name] = item.value.toString();
	}


	form.dataset.valid = 'true';
	for (let item of formElements) {
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

export const checkElementValidity = (input: any) => {
	const validStatus: boolean = checkValueValidity(input.name, input.value).validateStatus;
	const errorMessage: string | unknown = checkValueValidity(input.name, input.value).errorMessage;
	const sibling: HTMLElement | any = input.nextElementSibling;
	input.dataset.valid = validStatus.toString();
	if (!input.value) {
		sibling.textContent = 'поле не должно быть пустым';

	} else {
		sibling.textContent = (errorMessage) ? errorMessage : '';
	}
};
