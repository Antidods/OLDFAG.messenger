import API, { AuthAPI } from '../api/AuthAPI';
import { IResponse, ISigninData, ISignupData } from '../types';
import store from '../core/Store';
import router from '../core/Router';
import MessagesController from './MessagesController';

export class AuthController {
	private readonly api: AuthAPI;

	constructor() {
		this.api = API;
	}

	public async signin(SigninData: ISigninData) {
		try {
			await this.api.signin(SigninData);
			await this.fetchUser();
			router.go('/messenger');
		} catch (e: unknown) {
			const error = e as IResponse;
			if (error.reason === 'User already in system') {
				router.go('/messenger');
			} else {
				console.log('Ошибка при входе', error.reason);
			}
		}
	}

	public async loggingCheck() {
		try {
			await this.fetchUser();
			router.go('/messenger');
		} catch (e: unknown) {
			const error = e as IResponse;
			if (error.reason === 'Cookie is not valid') {
				router.go('/');
			} else {
				console.error('Ошибка при проверки нахождения пользователя в системе', e);
			}
		}
	}

	public async signup(SignupData: ISignupData) {
		try {
			await this.api.signup(SignupData);
			await this.fetchUser();
			router.go('/messenger');
		} catch (e: unknown) {
			const error = e as IResponse;
			console.error('Ошибка при регистрации ', error.reason);
			store.set('user.error', error);
		}
	}

	public async fetchUser() {
		const user = await this.api.read();
		store.set('user', user);
	}

	public async fetchChats() {
		const chats = await this.api.read();
		store.set('chats', chats);
	}

	selectChats(id: number) {
		store.set('selectedChat', id);
	}

	public async logout() {
		try {
			await this.api.logout();
			MessagesController.closeAll();
			store.set('user', undefined);
			router.go('/');
			console.log('Выполнен выход из аккаунта на сервере');
		} catch (e: unknown) {
			const error = e as IResponse;
			console.error('Ошибка при выходе из системы', error.reason);
		}
	}
}

export default new AuthController();
