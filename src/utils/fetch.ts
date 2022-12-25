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
  DELETE: 'DELETE',
};

function queryStringify(data: any): string {
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

  public get: HTTP = (path, options = {}) => {
    const params = options.data ? queryStringify(options.data) : '';
    return this.request(path + params, { ...options, method: METHODS.GET }, options.timeout);
  };

  put: HTTP = (path, options = {}) => this.request(
    path,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  post: HTTP = (path, options = {}) => this.request(
    path,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  delete: HTTP = (path, options = {}) => this.request(
    path,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  private request = (path: string, options: any, timeout = 10000) => {
    const { method, headers = {}, data = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, path);

      function setHeaders(headers: any) {
        for (const key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }

      setHeaders(headers);
      xhr.timeout = timeout;

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }

      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.onabort = () => reject;
      xhr.onerror = () => reject;
      xhr.ontimeout = () => reject;
    });
  };
}
