import { set } from '../utils/helpers';
import EventBus from './EventBus';
import { IState } from '../types';

export enum StoreEvents {
	Updated = 'updated',
}

export class Store extends EventBus {
	private state: IState = {};

	public set(keypath: string, data: unknown) {
		set(this.state, keypath, data);
		this.emit(StoreEvents.Updated, this.getState());
		// TODO: Решить проблему с необходимость повторного прокидывания события Update для Store
		this.emit(StoreEvents.Updated);
	}

	public getState() {
		return this.state;
	}
}

const store = new Store();

export default store;
