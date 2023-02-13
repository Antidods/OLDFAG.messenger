import Block, { Props } from '../../../core/Block';
import Button from '../../../components/button/index';
import router from '../../../core/Router';

export default class ErrorModal extends Block {
	constructor(props: Props) {
		super({
			...props,
		});
	}

	init() {
		this.children.OK = new Button({
			class: 'button',
			label: 'OK',
			onclick: () => {
				router.closeModalById('errorModal');
			},
		});
	}

	render() {
		// language=hbs
		return `
        <article class="modal-cover" id="errorModal">
            <div class="main-window ">
                <header class="main-window__top-line ">
                    <h2>{{ title }}</h2>
                    {{{windowManager variation="close" }}}
                </header>
                <div class="container_column_center" style="padding: 40px">
                    <div class="error-modal__message-container container_row_center">
                        <div class="error-modal__icon"></div>
                        <span class="error-modal__message">
                            {{ error_message }}
                        </span>
                    </div>
                    {{{ OK }}}
                </div>
            </div>
        </article>
		`;
	}
}
