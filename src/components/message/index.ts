import Block from '../../core/Block';
import { IMessageProps } from '../../types';

export class Message extends Block<IMessageProps> {
	constructor(props: IMessageProps) {
		super(props);
	}

	render() {
		// language=hbs
		return `
        <div class='message {{#if isMine}} message__mine{{/if}}'>
            {{ content }}
        </div>
		`;
	}
}
