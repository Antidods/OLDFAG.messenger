import { IUser } from './user';

export interface IChatItem {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	last_message?: ILastMessage;
}

export interface ICreateChat {
	title: string;
}

export interface IChatUsersRequest {
	users: number[];
	chatId: number;
}

export interface ILastMessage {
	user: IUser;
	time: string;
	content: string;
}

export interface IMessage {
	chat_id: number;
	time: string;
	type: string;
	user_id: number;
	content: string;
	file?: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	};
}
