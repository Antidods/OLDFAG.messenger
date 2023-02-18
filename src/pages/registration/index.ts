import Block, { Props } from '../../core/Block';
import { checkFormValidity } from '../../utils/validator';
import FormField from '../../components/formField';
import AuthController from '../../controllers/AuthController';
import store from '../../core/Store';
import { ISignupData } from '../../types';
import { template } from './template';

export default class Registration extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				// @ts-ignore
				const regForm: any = document.forms.registrationForm;
				const data: unknown = checkFormValidity(regForm);
				if (regForm.dataset.valid === 'true') {
					console.log(data);
					AuthController.signup(data as ISignupData);
					console.log(store.getState());
				}
			},
		});
	}

	init() {
		this.children.login = <Block>new FormField({
			type: 'text',
			name: 'login',
			label: 'Логин',
		});

		this.children.email = <Block>new FormField({
			type: 'email',
			name: 'email',
			label: 'Почта',
		});

		this.children.firstName = <Block>new FormField({
			type: 'text',
			name: 'first_name',
			label: 'Имя',
		});

		this.children.secondName = <Block>new FormField({
			type: 'text',
			name: 'second_name',
			label: 'Фамилия',
		});

		this.children.phone = <Block>new FormField({
			type: 'phone',
			name: 'phone',
			label: 'Телефон',
		});

		this.children.password = <Block>new FormField({
			type: 'password',
			name: 'password',
			label: 'Пароль',
		});

		this.children.secondPassword = <Block>new FormField({
			type: 'password',
			name: 'second_password',
			label: 'Повторите пароль',
		});
	}

	render() {
		// language=hbs
		return template;
	}
}
