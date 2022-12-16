type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P];

export default class EventBus<E extends Record<string, string> = Record<string, string>,
	Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>> {
	protected listeners: {
		[K in MapInterface<E>]?: Handler<Args[K]>[];
	} = {};

	// adEventListener
	on<Event extends MapInterface<E>>(
		event: Event,
		callback: Handler<Args[Event]>
	) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event]?.push(callback);
	}

	// removeEventListener
	off<Event extends MapInterface<E>>(
		event: Event,
		callback: Handler<Args[Event]>
	) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}
		// @ts-ignore
		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback
		);

	}

	// вызов события
	emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
		if (!this.listeners[event]) {
			throw new Event(`Нет события: ${event}`);
		}

		this.listeners[event]!.forEach((listener) => {
			listener(...args);
		});
	}
}


// eventBus.on('myEvent', callback);
//
// Так как мы передаём новую функцию (а значит, новую ссылку), оригинальный обработчик не будет отписан
// eventBus.off('myEvent', () => { console.log('Event emitted'); });
//
// Теперь передаём правильную ссылку, обработчик будет отписан
// eventBus.off('myEvent', callback);


