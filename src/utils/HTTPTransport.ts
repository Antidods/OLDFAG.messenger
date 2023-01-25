import { isPlainObject } from './helpers';

type Options = {
	data?: any;
	method?: string;
};

type HTTP = (path: string, options?: Options) => Promise<unknown>;

const METHODS: Record<string, string> = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
};

function queryStringify(data: Record<string, unknown> | unknown): string {
	if (data) {
		return `?${Object.entries(data)
			.map((item) => `${item[0]}=${item[1]}`)
			.join('&')}`;
	}
	return '';
}

export default class HTTPTransport {
	static API_URL = 'https://ya-praktikum.tech/api/v2';

	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public get: HTTP = (path, options?) => {
		const data: Record<string, unknown> | unknown = options?.data;
		const params: string = data ? queryStringify(data) : '';
		return this.request(this.endpoint + path + params, {
			...options,
			method: METHODS.GET,
		});
	};

	public post: HTTP = (url, options?) => {
		const params = options?.data ? queryStringify(options.data) : '';
		return this.request(this.endpoint + url + params, {
			...options,
			method: METHODS.POST,
		});
	};

	public put: HTTP = (url, options = {}): Promise<XMLHttpRequestResponseType> => {
		const data: Record<string, unknown> | unknown = options?.data;
		const params: string = data ? queryStringify(data) : '';
		return this.request(this.endpoint + url + params, {
			...options,
			method: METHODS.PUT,
		});
	};

	public patch: HTTP = (url, options?) => {
		const params = options?.data ? queryStringify(options.data) : '';
		return this.request(this.endpoint + url + params, {
			...options,
			method: METHODS.PATCH,
		});
	};

	public delete: HTTP = (url, options?) => {
		const params = options?.data ? queryStringify(options.data) : '';
		return this.request(this.endpoint + url + params, {
			...options,
			method: METHODS.DELETE,
		});
	};

	private request = (
		url: string,
		options: Options = { method: METHODS.GET }
	): Promise<XMLHttpRequestResponseType> => {
		const { method = METHODS.GET, data } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			xhr.onabort = () => reject({ reason: 'abort' });
			xhr.onerror = () => reject({ reason: 'network error' });
			xhr.ontimeout = () => reject({ reason: 'timeout' });

			if (isPlainObject(data)) {
				xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			}

			xhr.withCredentials = true;
			xhr.responseType = 'json';

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(isPlainObject(data) ? JSON.stringify(data) : data);
			}
		});
	};
}
