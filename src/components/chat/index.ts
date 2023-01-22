import Block, { Props } from '../../utils/Block';
import { withSelectedChat } from '../../hocs/withSelectedChat';

class ChatBase extends Block {
	constructor(props: Props) {
		super({
			...props,
		});
	}

	render() {
		// language=hbs
		return `
            <button class="chat-list-item">
                {{#if avatar}}
                    <img src="{{avatar}}" alt="аватар" class="chat-list-item__avatar">
                {{else}}
                    <img src="#" alt="аватар" class="chat-list-item__avatar">
                {{/if}}
                <div class="chat-list-item__message">
                    <span class="chat-list-item__message-from">{{ title }}</span>
                    <span class="chat-list-item__message-text">
												{{#if last_message }}
														{{last_message }}
												{{else}}
														id: {{ id }}
												{{/if}}
										</span>
                </div>
                <div class="chat-list-item__information">
                    <span class="chat-list-item__date">{{messageLastDate}}</span>
                    {{#if messageUnread }}
                        <span class="chat-list-item__unread">{{messageUnread}}</span>
                    {{/if}}
                    {{#if unread_count }}
                        <div class="chat-list-item__unread-after">{{ unread_count }}</div>
                    {{/if}}
                </div>
            </button>
        `;
	}
}

export const Chat = withSelectedChat(ChatBase);
