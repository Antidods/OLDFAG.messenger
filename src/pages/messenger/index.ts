import Block, { Props } from '../../core/Block';
import Button from '../../components/button';
import AuthController from '../../controllers/AuthController';
import router from '../../core/Router';
import { withAllStore } from '../../hocs/withAllStore';
import ChatsController from '../../controllers/ChatsController';
import { template } from './template';
import { ChatsList } from '../../components/chatList';
import { Messenger } from '../../components/messenger';
import { SelectedChatInfo } from '../../components/selectedChatInfo';
import MessagesController from '../../controllers/MessagesController';
import InputValidate from '../../components/inputValidate';
import StatusBar from '../../components/statusBar';

class ChatPage extends Block {
	constructor(props: Props) {
		super({
			...props,
		});
	}

	init() {
		AuthController.loggingCheck();
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
		// @ts-ignore
		this.children.statusBar = new StatusBar({});
	}

	render() {
		return template;
	}
}

const Chat = withAllStore(ChatPage);

export default Chat;
