import { IPasswordData, IUser, IUserSearch, IResponse } from '../types';
import AuthController from './AuthController';
import API, { UserAPI } from '../api/UserAPI';
import router from '../utils/Router';
import store from '../utils/Store';
import ErrorModal from '../pages/modal/error';

class UserController {
	private readonly api: UserAPI;

	constructor() {
		this.api = API;
	}

	public lockEditProfile(state: boolean) {
		store.set('user.lockEditProfile', state);
		store.emit('updated');
	}

	async updateProfile(data: IUser) {
		try {
			const newUser = await this.api.updateProfile(data);
			console.log(newUser);
			store.set('user', newUser);
		} catch (e) {
			console.log(e);
		} finally {
			AuthController.fetchUser();
			this.lockEditProfile(true);
			this.lockEditProfile(true);
		}
	}

	async updatePassword(PasswordData: IPasswordData) {
		try {
			await this.api.updatePassword(PasswordData);

			router.go('/profile');
		} catch (e: IResponse | unknown) {
			console.log(e);
		}
	}

	async updateAvatar(data: FormData) {
		try {
			const response = (await this.api.updateAvatar(data)) as unknown as IUser;
			store.set('user.avatar', response.avatar);
		} catch (e: any) {
			router.setModal(ErrorModal, {
				error_message: `${e.reason!}`,
			});
		}
	}

	async searchUser(data: IUserSearch) {
		const searchUser = await this.api.search(data);
		store.set('searchUser', searchUser);
	}
}

export default new UserController();
