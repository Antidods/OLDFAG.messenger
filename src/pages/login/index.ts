import Block, { Props } from '../../utils/Block';
import { checkFormValidity } from '../../utils/validator';
import { Link } from '../../components/link';
import FormField from '../../components/formField';
import AuthController from '../../controllers/AuthController';
import { ISigninData } from '../../types';
import { template } from './template';

export default class LoginPage extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				event!.preventDefault();
				// @ts-ignore
				const logForm: any = document.forms.loginForm;
				const data: unknown = checkFormValidity(logForm);
				if (logForm.dataset.valid === 'true') {
					AuthController.signin(data as ISigninData);
				}
			}
		});
	}

	init() {

		AuthController.loggingCheck();

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
		return template;
	}
}
