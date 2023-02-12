import ChatsAPI from '../api/ChatsAPI';
import store from '../core/Store';
import { IChatUsersRequest, ICreateChat } from '../types';
import MessagesController from './MessagesController';

class ChatsController {
	private api: ChatsAPI;

	// private socket: SocketConnection | null;

	constructor() {
		this.api = new ChatsAPI();
	}

	getToken(id: number) {
		return this.api.getToken(id);
	}

	async getChats() {
		const chatList = await this.api.getChats({
			offset: 0,
			limit: 50
		});

		store.set('chats', chatList);
		store.emit('updated');
	}

	async getChatUsers(id: string | number) {
		const userList = await this.api.getChatUsers(id, {
			offset: 0,
			limit: 20
		});
		store.set('selectedChatUsers', userList);
		store.emit('updated');
	}

	public async selectChat(id: number) {
		store.set('selectedChat', id);
		const token = await this.getToken(id);
		await MessagesController.connect(id, token);
		await this.getChatUsers(id);
	}

	async createChat(data: ICreateChat) {
		await this.api.createChat(data);

		await this.getChats();
	}

	async addUser(data: Record<string, string | number>) {
		const { id, chatId } = data;

		const requestData: IChatUsersRequest = {
			users: [id as number],
			chatId: chatId as number
		};

		await this.api.addUser(requestData);
	}

	async deleteUser(data: Record<string, string | number>) {
		const { userId, chatId } = data;

		const requestData: IChatUsersRequest = {
			users: [userId as number],
			chatId: chatId as number
		};

		await this.api.deleteUser(requestData);
	}


	async deleteChat(id: string | number) {
		await this.api.deleteChat(id as string);
		await this.getChats();
		store.set('activeChat.chat.id', null);
	}
}

export default new ChatsController();
