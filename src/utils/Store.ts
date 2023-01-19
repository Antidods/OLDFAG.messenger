import { set } from './helpers';
import EventBus from './EventBus';
// import Block from './Block';

export enum StoreEvents {
	Updated = 'updated',
}

export class Store extends EventBus {
	private state: any = {};

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
