import Block, { Props } from '../../core/Block';
import router from '../../core/Router';

export default class ErrorPage extends Block {
	constructor(props: Props) {
		super({
			...props,
			toMain: () => {
				// @ts-ignore
				router.go('/messenger');
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
