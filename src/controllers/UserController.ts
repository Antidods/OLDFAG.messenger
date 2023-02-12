import { IPasswordData, IResponse, IUser, IUserSearch } from '../types';
import AuthController from './AuthController';
import API, { UserAPI } from '../api/UserAPI';
import router from '../core/Router';
import store from '../core/Store';
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
			store.set('user', newUser);
		} catch (e) {
			console.error(e);
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
			console.error(e);
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
		// TODO: редактирование контроллера, протестировать
		// store.set('searchUser', searchUser);
		return await this.api.search(data) as IUser[];
	}
}

export default new UserController();
