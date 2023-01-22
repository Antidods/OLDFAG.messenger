import { set } from './helpers';
import EventBus from './EventBus';
import { IChatInfo, IMessage, IUser } from '../types';
// import Block from './Block';

export enum StoreEvents {
	Updated = 'updated',
}

export interface IState {
	user?: IUser;
	chats?: IChatInfo[];
	messages?: Record<number, IMessage[]>;
	selectedChat?: {
		chat: IChatInfo | null;
		messages: IChatInfo[] | [];
	};
}

export class Store extends EventBus {
	private state: IState = {};

	public set(keypath: string, data: unknown) {
		set(this.state, keypath, data);

		this.emit(StoreEvents.Updated, this.getState());
		this.emit(StoreEvents.Updated);
	}

	public getState() {
		return this.state;
	}
}

const store = new Store();

export default store;
