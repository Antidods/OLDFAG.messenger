import { Store } from '../Store';

describe('Тестирование store.getState()', () => {
	it('должен вернуть объект', () => {
		const store = new Store();
		expect(typeof store.getState() === 'object');
	});
});

describe('Тестирование store.set()/store.getState() с различными типами аргументов:', () => {
	it('число', () => {
		const store = new Store();

		store.set('userId', 123);

		expect(store.getState()).toStrictEqual({ userId: 123 });
	});
	it('строка', () => {
		const store = new Store();

		store.set('userId', '123');

		expect(store.getState()).toStrictEqual({ userId: '123' });
	});
	it('массив', () => {
		const store = new Store();

		store.set('userId', [1, 2, 3]);

		expect(store.getState()).toStrictEqual({ userId: [1, 2, 3] });
	});
	it('объект + ключ кириллицей', () => {
		const store = new Store();

		store.set('userId', { test: 'test' });

		expect(store.getState()).toStrictEqual({ userId: { test: 'test' } });
	});
	it('пустая строка', () => {
		const store = new Store();

		store.set('userId', '');

		expect(store.getState()).toStrictEqual({ userId: '' });
	});
	it('null', () => {
		const store = new Store();

		store.set('userId', null);

		expect(store.getState()).toStrictEqual({ userId: null });
	});
	it('undefined', () => {
		const store = new Store();

		store.set('userId', undefined);

		expect(store.getState()).toStrictEqual({ userId: undefined });
	});
	it('lorem ipsum', () => {
		const store = new Store();

		store.set('userId', 'Lorem ipsum');

		expect(store.getState()).toEqual({
			userId: 'Lorem ipsum',
		});
	});
});

describe('Тестирование шины событий Store:', () => {
	it('должен генерировать событие при обновлении', () => {
		const store = new Store();
		const mock = jest.fn();
		store.on('updated', mock);
		store.set('userId', 1);
		expect(mock).toHaveBeenCalled();
		// TODO: откорректировать тест после решения проблемы с событием Update Store
		expect(mock).toHaveBeenCalledTimes(2);
		expect(mock).toHaveBeenCalledWith({ userId: 1 });
	});
});
