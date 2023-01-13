import Block, { Props } from '../../utils/Block';
import { checkFormValidity } from '../../utils/validator';
import FormField from '../../components/formField';
import AutchController from '../../controllers/AutchController';
import store from '../../utils/Store';
import { SignupData } from '../../api/AuthAPI';

export default class Registration extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				event!.preventDefault();
				event!.stopPropagation();
				// @ts-ignore
				const regForm:any = document.forms.registrationForm;
				const data = checkFormValidity(regForm);
				if (regForm.dataset.valid === 'true') {
					AutchController.signup(data as SignupData);
					console.log(store);
				}
			}
		});
	}

	init(){
		this.children.login = <Block>new FormField({
			type: 'text',
			name: 'login',
			label: 'Логин'
		});

		this.children.email = <Block>new FormField({
			type: 'email',
			name: 'email',
			label: 'Почта'
		});

		this.children.firstName = <Block>new FormField({
			type: 'text',
			name: 'first_name',
			label: 'Имя'
		});

		this.children.secondName = <Block>new FormField({
			type: 'text',
			name: 'second_name',
			label: 'Фамилия'
		});

		this.children.phone = <Block>new FormField({
			type: 'phone',
			name: 'phone',
			label: 'Телефон'
		});

		this.children.password = <Block>new FormField({
			type: 'password',
			name: 'password',
			label: 'Пароль'
		});

		this.children.secondPassword = <Block>new FormField({
			type: 'password',
			name: 'second_password',
			label: 'Повторите пароль'
		});

	}

	render() {
		// language=hbs
		return `
        <div class="main-window">
            <header class="main-window__top-line">
                <h1>Регистрация</h1>
                {{{windowManager variation="close"}}}
            </header>
            <main class="container_column_start" style="padding: 40px">
                <div class="logo"></div>
                <form
                        class="login-form container_column_start"
                        id="registrationForm"
                        name="registrationForm"
                        data-valid="false"
								>
                    {{{firstName}}}
                    {{{secondName}}}
                    {{{login}}}
                    {{{email}}}
                    {{{phone}}}
                    {{{password}}}
                    {{{secondPassword}}}
                    <div class="container_row_end" style="width: 300px">
                        {{{button
                                class="button"
                                label="Регистрация"
                                form="registrationForm"
                                onclick=submit
                        }}}
                    </div>
                </form>
            </main>
        </div>
		`;
	}
}
