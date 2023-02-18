import WSTransport, { WSTransportEvents } from '../utils/WSTransport';
import store from '../core/Store';
import { IMessage } from '../types';

class MessagesController {
	private sockets: Map<number, WSTransport> = new Map();

	async connect(id: number, token: string) {
		if (this.sockets.has(id)) {
			return;
		}

		const userId = store.getState().user?.id;

		const wsTransport = new WSTransport(
			`${process.env.WSS_ENDPOINT}${userId}/${id}/${token}`
		);

		this.sockets.set(id, wsTransport);

		await wsTransport.connect();

		this._subscribe(wsTransport, id);
		await this.fetchOldMessages(id);

	}

	public sendMessage(id: number, message: string) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({
			type: 'message',
			content: message,
		});
	}

	public fetchOldMessages(id: number) {
		const socket = this.sockets.get(id);

		if (!socket) {
			throw new Error(`Chat ${id} is not connected`);
		}

		socket.send({ type: 'get old', content: '0' });
	}

	public closeAll() {
		Array.from(this.sockets.values()).forEach((socket) => socket.close());
	}

	private _onMessage(id: number, messages: IMessage | IMessage[]) {
		let messagesToAdd: IMessage[] = [];

		if (Array.isArray(messages)) {
			messagesToAdd = messages.reverse();
		} else {
			messagesToAdd.push(messages);
		}

		const currentMessages = (store.getState().messages || {})[id] || [];

		messagesToAdd = [...currentMessages, ...messagesToAdd];

		store.set(`messages.${id}`, messagesToAdd);


	}

	private _onClose(id: number) {
		this.sockets.delete(id);
	}

	private _subscribe(transport: WSTransport, id: number) {
		transport.on(WSTransportEvents.Message, (message) => this._onMessage(id, message));
		transport.on(WSTransportEvents.Close, () => this._onClose(id));
	}
}

export default new MessagesController();
