import Block, { Props } from '../../utils/Block';
import { checkFormValidity } from '../../utils/validator';
import { Link } from '../../components/link';
import FormField from '../../components/formField';
import AutchController from '../../controllers/AutchController';
import {SigninData} from '../../api/AuthAPI';

export default class LoginPage extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				// @ts-ignore
				event!.preventDefault();
				// @ts-ignore
				const logForm: any = document.forms.loginForm;
				const data = checkFormValidity(logForm);
				if (logForm.dataset.valid === 'true') {
					AutchController.signin(data as SigninData);
				}
			}


		});
	}

	init() {
		this.children.linkRegistartion = <Block>new Link({
			label: 'Регистрация',
			to: '/register',
			class: 'button'
		});

		this.children.login = <Block>new FormField({
			type: 'text',
			name: 'login',
			label: 'Логин'
		});

		this.children.password = <Block>new FormField({
			type: 'password',
			name: 'password',
			label: 'Пароль'
		});


	}

	render() {
		// language=hbs
		return `
        <div class="main-window main-window_login-form">
            <header class="main-window__top-line main-window__top-line_login-form">
                <h1>Вход</h1>
                {{{windowManager variation="close" }}}
            </header>
            <main class="container_column_center" style="padding: 40px">
                <div class="logo"></div>
                <form
                        class="login-form container_column_start"
                        id="loginForm"
                        name="loginForm"
                        data-valid="false"
                >
                    {{{login}}}
                    {{{password}}}
                    <div class="container_row_between" style="width: 300px">
                        {{{linkRegistartion}}}
                        {{{button class="button" label="Вход" form="loginForm" onclick=submit}}}
                    </div>
                </form>
            </main>
        </div>
		`;
	}
}

