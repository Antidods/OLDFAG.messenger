import Block, { Props } from '../../core/Block';
import { withAllStore } from '../../hocs/withAllStore';

class StatusBarBase extends Block {
	constructor(props: Props) {
		super({
			...props,
			chatsSum: props.chats?.length,
		});
	}

	render() {
		// language=hbs
		return `
        <div class="status-bar">
            <div class="status-bar__container">
                <div class="status-bar__section status-bar__section_right">
                    {{# if chatsSum }}
                        Всего чатов:
                    {{/if}}
                </div>
                <div class="status-bar__section status-bar__section_left">{{ chatsSum }}</div>
            </div>
            <div class="status-bar__section status-bar__section_right"></div>
        </div>
		`;
	}
}

const StatusBar = withAllStore(StatusBarBase);

export default StatusBar;
