import Block, { Props } from '../../core/Block';
import { withSelectedChat } from '../../hocs/withSelectedChat';
import Button from '../button/index';

class selectedChatInfoBase extends Block {
	constructor(props: Props) {
		super({
			...props,
			events: {
				click: () => {},
			},
		});
	}

	protected init() {
		this.children.setings = new Button({
			class:'chat-text-block__button chat-text-block__button_setting button-img',
			onclick: this.props.clickSettings,
		})
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
						{{#if selectedChat}}
                {{{ setings }}}
						{{/if}}
						
        </div>
		`;
	}
}

export const SelectedChatInfo = withSelectedChat(selectedChatInfoBase);
