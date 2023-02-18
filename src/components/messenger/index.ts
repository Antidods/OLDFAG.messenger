import { IMessengerProps } from '../../types';
import Block from '../../core/Block';
import withStore from '../../hocs/withStore';
import { Message } from '../message';
import { isEqual } from '../../utils/helpers';


class MessengerBase extends Block<IMessengerProps> {
	constructor(props: IMessengerProps) {
		super(props);
	}

	protected componentDidUpdate(oldProps: IMessengerProps, newProps: IMessengerProps): boolean {
		if (!isEqual(oldProps, newProps)) {
			this.children.messages = this.createMessages(newProps);
		}
		return true;
	}

	private createMessages(props: IMessengerProps) {
		return props.messages.map((data) => {
			return new Message({
				...data,
				isMine: props.userId === data.user_id,
			});
		});
	}

	protected render() {
		setTimeout(() => {
			const element: Element | null = document.querySelector('.message-field');
			if (element) {
				element.scrollTop = element.scrollHeight;
			}
		}, 50);


		// language=hbs
		return `
        {{#if selectedChat }}
            <div class="message-field">
                {{#each messages}}
                    {{{this}}}
                {{/each}}</div>
        {{else}}
            <div class='message-field_no-selected-chat'>
                выберете чат
            </div>
        {{/if}}
		`;
	}
}

const withSelectedChatMessages = withStore((state) => {
	const selectedChatId = state.selectedChat;

	if (!selectedChatId) {
		return {
			messages: [],
			selectedChat: undefined,
			userId: state.user?.id,
		};
	}

	return {
		messages: (state.messages || {})[selectedChatId] || [],
		selectedChat: state.selectedChat,
		userId: state.user?.id,
	};
});

export const Messenger = withSelectedChatMessages(MessengerBase);
