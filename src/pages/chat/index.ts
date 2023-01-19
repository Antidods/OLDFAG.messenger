import Block, { Props } from '../../utils/Block';
import Button from '../../components/button';
import AuthController from '../../controllers/AuthController';
import router from '../../utils/Router';
import { withAllStore } from '../../hocs/withAllStore';
import ChatsController from '../../controllers/ChatsController';
import UserSearch from '../modal/userSearch';
import { template } from './template';

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

		this.children.userSearchButton = new Button({
			class: 'chat-list__button chat-list__button_search',
			label: 'Найти',

			onclick: () => {
				router.setModal(UserSearch, {});
			},
		});
	}

	render() {
		return template;
	}
}

const Chat = withAllStore(ChatPage);

export default Chat;
