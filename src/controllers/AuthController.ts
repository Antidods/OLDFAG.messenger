import API, { AuthAPI } from '../api/AuthAPI';
import { ISigninData, ISignupData } from '../types';
import store from '../utils/Store';
import router from '../utils/Router';
import MessagesController from './MessagesController';

export class AuthController {
	private readonly api: AuthAPI;

	constructor() {
		this.api = API;
	}

	public async signin(SigninData: ISigninData) {
		try {
			await this.api.signin(SigninData);
			this.fetchUser();

			router.go('/chat');
		} catch (e: any) {
			if (e.reason === 'User already in system') {
				router.go('/chat');
			} else {
				console.log('Ошибка при входе', e);
			}
		}
	}

	public async signup(SignupData: ISignupData) {
		try {
			await this.api.signup(SignupData);
			await this.fetchUser();
			router.go('/chat');
		} catch (e: any) {
			store.set('user.error', e);
			console.log(e);
		}
	}

	public async fetchChats() {
		const chats = await this.api.read();

		store.set('chats', chats);
	}

	selectChats(id: number) {
		store.set('selectedChat', id);
	}

	public async updateUserName(username: string) {
		const oldUsername = store.getState().user;

		store.set('user.username', username);

		// @ts-ignore
		const result = await this.api.update({ username });

		if (!result) {
			store.set('user.username', oldUsername);
		}
	}

	public async fetchUser() {
		const user = await this.api.read();
		store.set('user', user);
		console.log('Выполнен fetchUser()', store.getState());
	}

	public async logout() {
		try {
			await this.api.logout();
			MessagesController.closeAll();
			store.set('user', undefined);
			router.go('/');
			console.log('Выполнен выход из аккаунта на сервере');
		} catch (e: any) {
			console.error(e.message);
		}
	}
}

export default new AuthController();
