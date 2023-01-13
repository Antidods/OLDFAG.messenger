type Options = {
	data?: any;
	method?: string;
	headers?: any;
	timeout?: number;
};

type HTTP = (path: string, options: Options) => Promise<unknown>;

const METHODS: Record<string, string> = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE'
};

function queryStringify(data:Object): string {
	return `?${Object
		.entries(data)
		.map((item) => `${item[0]}=${item[1]}`)
		.join('&')}`;
}

export default class HTTPTransport {
	static API_URL = 'https://ya-praktikum.tech/api/v2';

	protected endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
	}

	public get: HTTP = (path = '/', options?) => {
		const params = options.data ? queryStringify(options.data) : '';
		return this.request(this.endpoint + path + params, {
			...options,
			method: METHODS.GET
		}, options.timeout!);
	};

	public post: HTTP = (path, options?) => {
		const params = options.data ? queryStringify(options.data) : '';
		return this.request(
			this.endpoint + path + params,
			{ ...options, method: METHODS.POST },
			options.timeout
		);
	};

	public put: HTTP = (path, options?) => {
		const params = options.data ? queryStringify(options.data) : '';
		return this.request(
			this.endpoint + path + params,
			{ ...options, method: METHODS.PUT },
			options.timeout
		);
	};


	public patch: HTTP = (path, options?) => {
		const params = options.data ? queryStringify(options.data) : '';
		return this.request(
			this.endpoint + path + params,
			{ ...options, method: METHODS.PATCH },
			options.timeout
		);
	};

	public delete: HTTP = (path, options?) => {
		const params = options.data ? queryStringify(options.data) : '';
		return this.request(
			this.endpoint + path + params,
			{ ...options, method: METHODS.DELETE },
			options.timeout
		);
	};

	private request = (path: string, options: Options = { method: METHODS.GET }, timeout = 10000) => {
		const { method = METHODS.GET, headers, data } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, path);

			xhr.onreadystatechange = () => {

				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			function setHeaders(headers: any) {
				for (const key in headers) {
					xhr.setRequestHeader(key, headers[key]);
				}
			}

			xhr.onabort = () => reject({ reason: 'abort' });
			xhr.onerror = () => reject({ reason: 'network error' });
			xhr.ontimeout = () => reject({ reason: 'timeout' });
			xhr.timeout = timeout;

			if (headers) {
				setHeaders(headers);
			} else if (!(data instanceof FormData)) {
				xhr.setRequestHeader('Content-Type', 'application/json');
			}

			xhr.withCredentials = true;
			xhr.responseType = 'json';

			if (method === METHODS.GET && !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}




