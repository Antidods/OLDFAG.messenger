import Block, { Props } from '../../utils/Block';
import Button from '../../components/button';
import AuthController from '../../controllers/AuthController';
import router from '../../utils/Router';
import { withAllStore } from '../../hocs/withAllStore';
import ChatsController from '../../controllers/ChatsController';
import { template } from './template';
import { ChatsList } from '../../components/chatList';
import { Messenger } from '../../components/messenger';
import { SelectedChatInfo } from '../../components/selectedChatInfo';
import MessagesController from '../../controllers/MessagesController';
import InputValidate from '../../components/inputValidate';

class ChatPage extends Block {
	constructor(props: Props) {
		super({
			...props,
		});
	}

	init() {
		AuthController.fetchUser();
		ChatsController.getChats();

		this.children.exitButton = new Button({
			class: 'chat-text-block__button chat-text-block__button_exit button-img',
			onclick: () => {
				AuthController.logout();
				router.go('/');
			},
		});

		this.children.goProfile = new Button({
			class: 'chat-text-block__button chat-text-block__button_setting button-img',
			onclick: () => {
				router.go('/profile');
			},
		});

		this.children.inputMessage = new InputValidate({
			type: 'text',
			class: 'chat-send-block__textarea',
			placeholder: 'Введите сообщение ... ',
			name: 'message',
			id: 'message',
			requared: true,
		});

		this.children.buttonSubmit = new Button({
			class: 'chat-send-block__send',
			label: 'Отправить',
			onclick: () => {
				const input = this.children.inputMessage as InputValidate;
				console.log(input.getValue());
				const message = input.getValue();

				input.setValue('');

				MessagesController.sendMessage(this.props.selectedChat!, message);
			},
		});

		// @ts-ignore
		this.children.chatList = new ChatsList({});
		// @ts-ignore
		this.children.messenger = new Messenger({});
		// @ts-ignore
		this.children.selectedChatInfo = new SelectedChatInfo({});
	}

	// protected componentDidUpdate(oldProps: IMessengerProps, newProps: IMessengerProps): boolean {
	// 	if (!isEqual(oldProps, newProps)) {
	// 		this.children.messages = this.createMessages(newProps);
	// 	}
	// 	return true;
	// }
	//
	// private createMessages(props: IMessengerProps) {
	// 	return props.messages.map((data) => {
	// 		return new Message({ ...data, isMine: props.userId === data.user_id });
	// 	});
	// }

	render() {
		return template;
	}
}

const Chat = withAllStore(ChatPage);

export default Chat;
