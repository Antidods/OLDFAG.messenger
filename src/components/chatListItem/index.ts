import Block, { Props } from '../../utils/Block';
// import MessagesController from '../../controllers/MessagesController';

export default class ChatListItem extends Block {
	constructor(props: Props) {
		super({
			...props,
			events: {
				click: () => {
					console.log('Click', this.props.name);
					// MessagesController.connect();
				},
			},
		});
	}

	render() {
		// language=hbs
		return `
            <button class="chat-list-item">
                {{#if avatarUrl}}
                    <img src="{{avatarUrl}}" alt="аватар" class="chat-list-item__avatar">
                {{else}}
                    <img src="../img/to-talk-to-avatar.png" alt="аватар" class="chat-list-item__avatar">
                {{/if}}
                <div class="chat-list-item__message">
                    <span class="chat-list-item__message-from">{{name}}</span>
                    <span class="chat-list-item__message-text">{{messageText}}</span>
                </div>
                <div class="chat-list-item__information">
                    <span class="chat-list-item__date">{{messageLastDate}}</span>
                    {{#if messageUnread}}
                        <span class="chat-list-item__unread">{{messageUnread}}</span>
                    {{/if}}
                    {{#if messageUnread}}
                        <div class="chat-list-item__unread-after"></div>
                    {{/if}}
                </div>
            </button>
        `;
	}
}
