import { IMessage } from './Chats';

export interface IMessageProps {
	content: string;
	isMine: boolean;
}

export interface IMessengerProps {
	selectedChat: number | undefined;
	messages: IMessage[];
	userId: number;
}
