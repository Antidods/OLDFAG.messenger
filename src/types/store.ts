import { IUser } from './user';
import { IChatInfo, IMessage } from './Chats';

export interface IState {
	user?: IUser;
	chats?: IChatInfo[];
	messages?: Record<number, IMessage[]>;
	selectedChat?:  number | null;
	selectedChatUsers?: IUser[];
}
