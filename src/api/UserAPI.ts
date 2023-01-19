import BaseAPI from './BaseAPI';
import { IPasswordData, IUser, IUserSearch } from '../types';

export class UserAPI extends BaseAPI {
	constructor() {
		super('/user');
	}

	updateProfile(data: IUser) {
		return this.http.put('/profile', { data });
	}

	updateAvatar(data: FormData) {
		return this.http.put('/profile/avatar', { data });
	}

	updatePassword(data: IPasswordData) {
		return this.http.put('/password', { data });
	}

	get(id: string) {
		return this.http.get(`/${id}`);
	}

	search(data: IUserSearch) {
		return this.http.post('/search', { data });
	}

	create = undefined;

	read = undefined;

	update = undefined;

	delete = undefined;
}

export default new UserAPI();
