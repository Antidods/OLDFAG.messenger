import { checkValueValidity } from '../validator';

describe('Проверка валидации', () => {
	it('тип "firs_name" с значение "1" не должен быть валидным', async () => {
		const value = {
			type: 'first_name',
			value: '1',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', false);
	});

	it('тип "second_name" с значение "!andrey" не должен быть валидным', async () => {
		const value = {
			type: 'second_name',
			value: '!andrey',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', false);
	});

	it('тип "display_name" с значение "*test" не должен быть валидным', async () => {
		const value = {
			type: 'display_name',
			value: '*test',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', false);
	});

	it('тип "login" с значение "andrey"  должен быть валидным', async () => {
		const value = {
			type: 'login',
			value: 'andrey',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', true);
	});

	it('тип "email" с значение "test@test.ru"  должен быть валидным', async () => {
		const value = {
			type: 'email',
			value: 'est@test.ru',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', true);
	});

	it('тип "password" с значение "1" не должен быть валидным', async () => {
		const value = {
			type: 'password',
			value: '1',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', false);
	});

	it('тип "second_password" с значение "50" не должен быть валидным', async () => {
		const value = {
			type: 'second_password',
			value: '50',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', false);
	});

	it('тип "phone" с значение "1" не должен быть валидным', async () => {
		const value = {
			type: 'first_name',
			value: '1',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', false);
	});

	it('тип "message" с значение "1" не должен быть валидным', async () => {
		const value = {
			type: 'first_name',
			value: '1',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', false);
	});

	it('тип "chatName" с значение "1" не должен быть валидным', async () => {
		const value = {
			type: 'first_name',
			value: '1',
		};

		expect(checkValueValidity(value.type, value.value)).toHaveProperty('validateStatus', false);
	});
});
