import HTTPTransport from '../HTTPTransport';

describe('Проверка HTTPTransport:', () => {
	it('GET - должен возвращать статус-код 200', async () => {
		const endpoint = '/test';
		const http = new HTTPTransport(endpoint);

		const response = await http.get('');
		expect(response).toHaveProperty('status', 200);
	});

	it('POST - должен возвращать статус-код 200', async () => {
		const endpoint = '/test';
		const http = new HTTPTransport(endpoint);

		const response = await http.post('');

		expect(response).toHaveProperty('status', 200);
	});

	it('PUT - должен возвращать статус-код 200', async () => {
		const endpoint = '/test';
		const http = new HTTPTransport(endpoint);

		const response = await http.put('');

		expect(response).toHaveProperty('status', 200);
	});

	it('DELETE - должен возвращать статус-код 200', async () => {
		const endpoint = '/test';
		const http = new HTTPTransport(endpoint);

		const response = await http.delete('');

		expect(response).toHaveProperty('status', 200);
	});

	it('PATCH - должен возвращать статус-код 200', async () => {
		const endpoint = '/test';
		const http = new HTTPTransport(endpoint);

		const response = await http.patch('');

		expect(response).toHaveProperty('status', 200);
	});
});
