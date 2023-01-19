import Block, { Props } from '../../utils/Block';

export default class ErrorPage extends Block {
	constructor(props: Props) {
		super({
			...props,
			toMain: () => {
				// @ts-ignore
				window.PAGES.selectPage(window.PAGES.chat);
			},
		});
	}

	render() {
		// language=hbs
		return `
            <div class="error">
                <h2 class="error__title">{{titleError}}</h2>
                <p class="error__p">Теперь питание компьютера</p>
                <p class="error__p">можно выключить</p>
                {{{button 
                        class="error__link"
                        label="на главную"
                        onclick=toMain
                }}}
            </div>
        `;
	}
}
