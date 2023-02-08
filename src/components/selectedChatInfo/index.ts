import Block, { Props } from '../../core/Block';
import { withSelectedChat } from '../../hocs/withSelectedChat';

class selectedChatInfoBase extends Block {
	constructor(props: Props) {
		super({
			...props,
			events: {
				click: () => {},
			},
		});
	}

	render() {
		// language=hbs
		return `
				
        <div class="chat-text-block__to-talk-to">
	
            {{#if avatar}}
                <img src="{{avatar}}" alt="avatar"
                     class="chat-text-block__to-talk-to-avatar">
            {{/if}}
            <span class="chat-text-block__to-talk-to-name">{{ selectedChat.title }}</span>
        </div>
		`;
	}
}

export const SelectedChatInfo = withSelectedChat(selectedChatInfoBase);
