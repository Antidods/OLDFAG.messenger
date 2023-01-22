import { IMessage } from '../../types';
import Block from '../../utils/Block';
import Button from '../button';
import witchStore from '../../hocs/withStore';
import FormField from '../formField';
import MessagesController from '../../controllers/MessagesController';
import { Message } from '../message';
import { isEqual } from '../../utils/helpers';


interface MessengerProps {
	selectedChat: number | undefined;
	messages: IMessage[];
	userId: number;
}

class MessengerBase extends Block<MessengerProps> {
	constructor(props: MessengerProps) {
		super(props);
	}

	protected init() {
		this.children.messages = this.createMessages(this.props);

		this.children.input = new FormField({
			type: 'text',
			placeholder: 'Сообщение',
			name: 'message'
		});

		this.children.button = new Button({
			label: 'Отправить',
			type: 'button',
			events: {
				click: () => {
					const input = this.children.input as FormField;
					const message = input.getValue();

					input.setValue('');

					MessagesController.sendMessage(this.props.selectedChat!, message);
				}
			}
		});
	}

	protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
		if (!isEqual(oldProps, newProps)) {
			this.children.messages = this.createMessages(newProps);
			return true;
		} else return false;

	}

	private createMessages(props: MessengerProps) {
		return props.messages.map(data => {
			return new Message({ ...data, isMine: props.userId === data.user_id });
		});
	}

	protected render() {
		// language=hbs
		return `
		`;


	}
}

const withSelectedChatMessages = witchStore(state => {
	const selectedChatId = state.selectedChat;

	if (!selectedChatId) {
		return {
			messages: [],
			selectedChat: undefined,
			userId: state.user.id
		};
	}

	return {
		messages: (state.messages || {})[selectedChatId] || [],
		selectedChat: state.selectedChat,
		userId: state.user.id
	};
});

export const Messenger = withSelectedChatMessages(MessengerBase);
