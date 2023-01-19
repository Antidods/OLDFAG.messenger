import BaseAPI from './BaseAPI';
import { IChatUsersRequest, ICreateChat } from '../types/Chats';

export default class ChatsAPI extends BaseAPI {
	constructor() {
		super('/chats');
	}

	getChats(data: Record<string, unknown>) {
		return this.http.get('', { data });
	}

	getToken(id: string) {
		return this.http.post(`/token/${id}`);
	}

	addChat(data: ICreateChat) {
		return this.http.post('', { data });
	}

	deleteChat(id: string) {
		return this.http.delete('', { data: { chatId: id } });
	}

	addUser(data: IChatUsersRequest) {
		return this.http.put('/users', { data });
	}

	deleteUser(data: IChatUsersRequest) {
		return this.http.delete('/users', { data });
	}

	create = undefined;

	read = undefined;

	update = undefined;

	delete = undefined;
}
