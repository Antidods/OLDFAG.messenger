import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class AuthController {
	private readonly api: AuthAPI;

	constructor() {
		this.api = API;
	}


	async request(req: () => void) {
		store.set('user.isLoading', true);

		try {
			await req();
			store.set('user.error', undefined);
		} catch (e) {
			store.set('user.error', e);
			console.error('ОШИБКА')
		} finally {
			store.set('user.isLoading', false);
		}
	}

	async signin(SigninData: SigninData) {

		try {
			await this.api.signin(SigninData);
			this.fetchUser();
			console.log(store);

			router.go('/chat');
		} catch (e: any) {
			if (e.reason === 'User already in system'){
				await this.fetchUser();
				console.log(store);
				router.go('/chat')
			} else console.log('Ошибка при входе', e);

		}
	}


	async signup(SignupData: SignupData) {
		store.set('user.isLoading', true);

		try {
			await this.api.signup(SignupData);
			await this.fetchUser();
			router.go('/chat');
			console.log(store);
		} catch (e: any) {
			store.set('user.error', e);
			console.log(e);

		} finally {
			store.set('user.isLoading', false);
		}
	}


	async fetchChats() {
		const chats = await this.api.read();

		store.set('chats', chats);
	}

	selectChats(id: number) {
		store.set('selectedChat', id);
	}


	async updateUserName(username: string) {
		const { username: oldUsername } = store.getState().user;

		store.set('user.username', username);

		// @ts-ignore
		const result = await this.api.update({ username });

		if (!result) {
			store.set('user.username', oldUsername);
		}

	}


	// async fetchUser() {
	// 	try {
	// 		const user = await this.api.read();
	// 		store.set('user.data', user);
	// 	} catch (e: any) {
	// 		store.set('user.error', e);
	// 		alert('Error during user fetch');
	// 	}
	// }

	async fetchUser() {
		await this.api.read();


	}


	async logout() {
		try {
			await this.api.logout();
			router.go('/');
			console.log('Выполнен выход из аккаунта на сервере');
		} catch (e: any) {
			console.error(e.message);
		}
	}

}


export default new AuthController();
