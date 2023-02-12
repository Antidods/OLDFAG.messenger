import Block from '../../core/Block';
import { IChatsListProps } from '../../types';
import withStore from '../../hocs/withStore';
import { Link } from '../link';
import ChatsController from '../../controllers/ChatsController';
import Button from '../button';
import { isEqual } from '../../utils/helpers';
import { Chat } from '../chat';
import router from '../../core/Router';
import CreateChat from '../../pages/modal/createChat';


class ChatsListBase extends Block<IChatsListProps> {
	constructor(props: IChatsListProps) {
		super({ ...props });
	}

	protected init() {
		// @ts-ignore
		this.children.chats = this.createChats(this.props);

		// @ts-ignore
		this.children.profileLink = new Link({
			to: '/profile',
			label: 'Профиль',
		});

		this.children.createChatButton = new Button({
			class: 'chat-list__button chat-list__button_add',
			label: 'Создать',
			onclick: () => {
				router.setModal(CreateChat, {});
			},
		});

	}

	protected componentDidUpdate(oldProps: IChatsListProps, newProps: IChatsListProps): boolean {
		if (!isEqual(oldProps, newProps)) {
			// @ts-ignore
			this.children.chats = this.createChats(newProps);
		}
		return true;
	}

	private createChats(props: IChatsListProps) {
		return props.chats.map((data) => {
			return new Chat({
				...data,
				events: {
					click: () => {
						ChatsController.selectChat(data.id);
					},
				},
			});
		});
	}

	render() {
		// language=hbs
		return `
        <div class="chat-list">
            <div class="chat-list__action-panel">
                {{{ createChatButton }}}
            </div>
            <div class="chat-list__spacer"></div>
            <div class="chat-list__contacts">
                {{#each chats}}
                    {{{this}}}
                {{/each}}
            </div>
        </div>
		`;
	}
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
