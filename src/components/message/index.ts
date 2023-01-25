import Block from '../../utils/Block';
import { IMessageProps } from '../../types';

export class Message extends Block<IMessageProps> {
	constructor(props: IMessageProps) {
		super(props);
	}

	init() {
	setTimeout(()=>{
		const messageField: Element | null = document.querySelector('.message-field');
		const elem: Element | null | undefined = messageField?.lastElementChild;
		if (elem) {
			elem.scrollIntoView(false);
		}
	},50);
	}

	render(): string {
		// language=hbs
		return `
        <div class='message {{#if isMine}} message__mine{{/if}}'>
            {{ content }}
        </div>
		`;
	}



}

