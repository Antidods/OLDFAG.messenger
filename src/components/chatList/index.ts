import Block from '../../utils/Block';
import { ChatsListProps } from '../../types';
import withStore from '../../hocs/withStore';
import { Link } from '../link';
import ChatsController from '../../controllers/ChatsController';
import Button from '../button';
import { isEqual } from '../../utils/helpers';
import { Chat } from '../chat';

import router from '../../utils/Router';
import UserSearch from '../../pages/modal/userSearch';
import CreateChat from '../../pages/modal/createChat';

class ChatsListBase extends Block<ChatsListProps> {
	constructor(props: ChatsListProps) {
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

		this.children.userSearchButton = new Button({
			class: 'chat-list__button chat-list__button_search',
			label: 'Найти',
			onclick: () => {
				router.setModal(UserSearch, {});
			},
		});
	}

	protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
		if (!isEqual(oldProps, newProps)) {
			// @ts-ignore
			this.children.chats = this.createChats(newProps);
		}
		return true;
	}

	private createChats(props: ChatsListProps) {
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
                {{{button
                        class="chat-list__button chat-list__button_dell"
                        label="добавить"
                        onclick=error404
                }}}
                {{{ userSearchButton }}}
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
