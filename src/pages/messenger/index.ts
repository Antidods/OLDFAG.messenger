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
import ChatSettings from '../chatSettings';
import ErrorModal from '../modal/error/index';


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
			required: true,
		});

		this.children.buttonSubmit = new Button({
			class: 'chat-send-block__send',
			label: 'Отправить',
			onclick: () => {
				const input = this.children.inputMessage as InputValidate;
				const message = input.getValue();
				if(this.props.selectedChat) {
					if (input.getValidateStatus()) {
						input.setValue('');
						MessagesController.sendMessage(this.props.selectedChat!, message);
					} else {
						router.setModal(ErrorModal, {
							title: 'Ошибка',
							error_message: 'Поле ввода содержит недопустимые символы'
						})

					}
				} else {
					router.setModal(ErrorModal, {
						title: 'Ошибка',
						error_message: 'Для отправки сообщения выберите чат'
					})
				}
			},
		});

		// @ts-ignore
		this.children.chatList = new ChatsList({});
		// @ts-ignore
		this.children.messenger = new Messenger({

		});
		// @ts-ignore
		this.children.selectedChatInfo = new SelectedChatInfo({
			clickSettings: () =>{
				router.setModal(ChatSettings);
			}
		});
		// @ts-ignore
		this.children.statusBar = new StatusBar({});
	}

	render() {

		return template;
	}
}

const Chat = withAllStore(ChatPage);

export default Chat;
