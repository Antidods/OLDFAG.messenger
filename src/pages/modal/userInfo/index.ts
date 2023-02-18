import Block, { Props } from '../../../core/Block';
import router from '../../../core/Router';


export default class UserInfo extends Block {
	constructor(props: Props) {
		super({
			...props,
			clickOk: () => {
				props.clickOk(this.props.events);
			},
			clickBack: () => {
				router.closeModalById('userInfo');
			}
		});
	}

	init() {

	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover" id="userInfo">
            <div class="main-window ">
                <header class="main-window__top-line ">
                    <h1>{{ title }}</h1>
                    {{{ windowManager variation="close" }}}
                </header>
                <main 
												class="container_column_center"
												style="padding: 20px"
                >
                {{#if avatar}}
                    <img src="https://ya-praktikum.tech/api/v2/resources{{avatar}}"
                         alt="avatar" class="user-settings__avatar"
                    >
                {{else}}
                    <img src="#"
                         alt="avatar" class="user-settings__avatar"
                    >
                {{/if}}
                <div class="container_column_start">
                    <span> {{ first_name }}</span>
                    <span> {{ display_name }}</span>

                </div>
								<div class="container_row_between">
                    {{{ button
                            class = 'button'
                            label = 'Назад'
														onclick=clickBack
                    }}}
                    {{{ button
                            class = 'button'
                            label = 'Добавить'
                            onclick=clickOk
                    }}}
								</div>
                </main>
            </div>
        </div>
		`;
	}
}
