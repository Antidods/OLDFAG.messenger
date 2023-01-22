import { IUser } from './user';

export interface IChatProps {
	id: number;
	title: string;
	avatar?: string;
	unread_count: number;
	selectedChat: IChatInfo;
	last_message?: ILastMessage;
	events?: {
		click: () => void;
	};
}

export interface IChatInfo {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	last_message: {
		user: IUser;
		time: string;
		content: string;
	};
}

export interface ChatsListProps {
	chats: IChatInfo[];
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
