import Block, { Props } from '../../../core/Block';

export default class ErrorModal extends Block {
	constructor(props: Props) {
		super({
			...props,
		});
	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover">
            <div class="main-window ">
                <header class="main-window__top-line ">
                    <h1>Модалка</h1>
                    {{{windowManager variation="close" }}}
                </header>
                <main class="container_column_center" style="padding: 40px">
                    <div class="logo"></div>
                    {{error_message}}
                </main>
            </div>
        </div>
		`;
	}
}
