import { IMessengerProps } from '../../types';
import Block from '../../utils/Block';
import withStore from '../../hocs/withStore';
import { Message } from '../message';
import { isEqual } from '../../utils/helpers';

class MessengerBase extends Block<IMessengerProps> {
	constructor(props: IMessengerProps) {
		super(props);
	}

	protected init() {
		this.children.messages = this.createMessages(this.props);
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
		// language=hbs
		return `
        <div class="{{ styles.messenger }}">
            {{#if selectedChat }}

                <div class="{{ styles.messenger__messages }}">
                    {{#each messages}}
                        {{{this}}}
                    {{/each}}
                </div>
            {{else}}
                Выбирете чат
            {{/if}}
        </div>
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
		// @ts-ignore
		messages: (state.messages || {})[selectedChatId] || [],
		selectedChat: state.selectedChat,
		userId: state.user?.id,
	};
});

export const Messenger = withSelectedChatMessages(MessengerBase);
