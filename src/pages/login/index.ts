import Block, { Props } from '../../utils/Block';
import { checkFormValidity } from '../../utils/validator';

export default class LoginPage extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				event!.preventDefault();
				event!.stopPropagation();
				// @ts-ignore
				const logForm: any = document.forms.loginForm;
				const data = checkFormValidity(logForm);
				console.log(data);
				if (logForm.dataset.valid === 'true') {
					// @ts-ignore
					window.PAGES.selectPage(window.PAGES.chat);
				}
			}
		});
	}

	render() {
		// language=hbs
		return `
        <div class="main-window main-window_login-form">
            <header class="main-window__top-line main-window__top-line_login-form">
                <h1>{{title}}</h1>
                {{{windowManager variation="close"}}}
            </header>
            <main class="container_column_center" style="padding: 40px">
                <div class="logo"></div>
                <form
                        class="login-form container_column_start"
                        id="loginForm"
                        name="loginForm"
                        data-valid="false"
                >


                    {{{formField
                            type="text"
                            name="login"
                            label="Логин"


                    }}}
                    {{{formField
                            type="password"
                            name="password"
                            label="Пароль"


                    }}}
                    <div class="container_row_between" style="width: 300px">
                        <a class="button"
                           onclick="window.PAGES.selectPage(window.PAGES.registration)">Регистрация</a>
                        {{{button class="button" label="Вход" form="loginForm" onclick=submit}}}
                    </div>
                </form>
            </main>
        </div>
		`;
	}
}
