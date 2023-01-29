import Block, { Props } from '../../utils/Block';
import { withSelectedChat } from '../../hocs/withSelectedChat';
import { transformDateInChat } from '../../utils/transformDateInChat';


class ChatBase extends Block {
	constructor(props: Props) {
		super({
			...props,
			messageLastDate: () => {
				return transformDateInChat(props.last_message?.time );
			}
		});
	}

	render() {
		// language=hbs
		return `
        <button class="chat-list-item">
            {{#if avatar}}
                <img src="{{avatar}}" alt="аватар" class="chat-list-item__avatar">
            {{else}}
                <span class='chat-list-item__avatar chat-list-item__avatar_null'></span>
            {{/if}}
            <div class="chat-list-item__message">
                <span class="chat-list-item__message-from">{{ title }}</span>
                <span class="chat-list-item__message-text">
                    {{#if last_message.content }}
                        {{last_message.content }}
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
