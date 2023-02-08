import { isEqual } from '../helpers';

describe('Проверка функции isEqual:', () => {
	it('должна возвращать true при сравнении "string" "string"', async () => {
		const obj1 = 'string';
		const obj2 = 'string';

		expect(isEqual(obj1, obj2)).toEqual(true);
	});

	it('должна возвращать true при сравнении {} {}', async () => {
		const obj1 = {};
		const obj2 = {};

		expect(isEqual(obj1, obj2)).toEqual(true);
	});

	it('должна возвращать true при сравнении {1:2} {1:2}', async () => {
		const obj1 = { 1: 2 };
		const obj2 = { 1: 2 };

		expect(isEqual(obj1, obj2)).toEqual(true);
	});

	it('должна возвращать true при сравнении {1:"lol", "2":"lol"} {1:"lol", "2":"lol"}', async () => {
		const obj1 = { 1: 'lol', '2': 'lol' };
		const obj2 = { 1: 'lol', '2': 'lol' };

		expect(isEqual(obj1, obj2)).toEqual(true);
	});

	it('должна возвращать true при сравнении {1:"lol", "2":"lol"} {1:"lol"}', async () => {
		const obj1 = { 1: 'lol', '2': 'lol' };
		const obj2 = { 1: 'lol' };

		expect(isEqual(obj1, obj2)).toEqual(false);
	});
});
