import Block from '../../utils/Block';
import { IMessageProps } from '../../types';


export class Message extends Block<IMessageProps> {
	constructor(props: IMessageProps) {
		super(props);
	}

	render(): string {
		//language=hbs
		return `
        <div class='{{ styles.message }} {{#if isMine}} {{ styles.message__mine }} {{/if}}'>
            {{ content }}
        </div>
		`;
	}
}
