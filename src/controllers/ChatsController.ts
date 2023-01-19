import ChatsAPI from '../api/ChatsAPI';
import store from '../utils/Store';
import { IChatUsersRequest, ICreateChat } from '../types/Chats';
import UserController from './UserController';
import { IUser } from '../types';

class ChatsController {
	private api: ChatsAPI;

	// private socket: SocketConnection | null;

	constructor() {
		this.api = new ChatsAPI();
	}

	async getChats() {
		const chatList = await this.api.getChats({
			offset: 0,
			limit: 50,
		});

		store.set('chatList', chatList);
		store.emit('updated');
	}

	async addChat(data: ICreateChat) {
		await this.api.addChat(data);

		this.getChats();
	}

	async addUser(data: Record<string, unknown>) {
		const { login, chatId } = data;

		const user = (await UserController.searchUser({
			login: login as string,
		})) as unknown as IUser[];

		const requestData: IChatUsersRequest = {
			users: [user[0].id as number],
			chatId: chatId as number,
		};

		await this.api.addUser(requestData);
	}

	async deleteUser(data: Record<string, unknown>) {
		const { login, chatId } = data;

		const user = (await UserController.searchUser({
			login: login as string,
		})) as unknown as IUser[];

		const requestData: IChatUsersRequest = {
			users: [user[0].id as number],
			chatId: chatId as number,
		};

		await this.api.deleteUser(requestData);
	}

	async deleteChat(id: string) {
		await this.api.deleteChat(id);
		await this.getChats();
		store.set('activeChat.chat.id', null);
	}
}

export default new ChatsController();
