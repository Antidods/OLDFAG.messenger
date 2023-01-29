import BaseAPI from './BaseAPI';
import { ISignupData, ISigninData } from '../types';

export class AuthAPI extends BaseAPI {
	constructor() {
		super('/auth');
	}

	signin(data: ISigninData) {
		return this.http.post('/signin', { data });
	}

	signup(data: ISignupData) {
		return this.http.post('/signup', { data });
	}

	read() {
		return this.http.get('/user', {});
	}

	logout() {
		return this.http.post('/logout', {});
	}

	create = undefined;

	update = undefined;

	delete = undefined;
}

export default new AuthAPI();
