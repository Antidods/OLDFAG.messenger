type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P];

export default class EventBus<
	E extends Record<string, string> = Record<string, string>,
	Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>
> {
	protected listeners: {
		[K in MapInterface<E>]?: Handler<Args[K]>[];
	} = {};

	public on<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event]?.push(callback);
	}

	public off<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event]!.filter((listener) => listener !== callback);
	}

	public emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
		if (!this.listeners[event]) {
			throw new Event(`Нет события: ${event}`);
		}

		this.listeners[event]!.forEach((listener) => {
			listener(...args);
		});
	}
}
