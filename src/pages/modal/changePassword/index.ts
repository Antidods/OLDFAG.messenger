import Block, { Props } from '../../../core/Block';
import FormField from '../../../components/formField';
import { checkFormValidity } from '../../../utils/validator';
import UserController from '../../../controllers/UserController';
import { IPasswordData } from '../../../types';

export default class ChangePassword extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				// @ts-ignore
				const form = document.forms.changePassword;
				const data = checkFormValidity(form);
				if (form.dataset.valid === 'true') {
					UserController.updatePassword({
						oldPassword: data.old_password,
						newPassword: data.password,
					} as IPasswordData);
				}
			},
		});
	}

	init() {
		this.children.oldPassword = <Block>new FormField({
			type: 'password',
			name: 'old_password',
			id: 'old_password',
			label: 'старый пароль',
		});

		this.children.newPassword = <Block>new FormField({
			type: 'password',
			name: 'password',
			id: 'password',
			label: 'новый пароль',
		});

		this.children.secondPassword = <Block>new FormField({
			type: 'password',
			name: 'second_password',
			id: 'second_password',
			label: 'повторите пароль',
		});
	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover" id="changePasswordModal">
            <div class="main-window modal create-chat">
                <header class="main-window__top-line ">
                    <h1>Изменить пароль</h1>
                    {{{windowManager variation="close" }}}
                </header>
                <div class='logo' style='height: 90px; margin-top: 30px'></div>
                <main class="container_column_center">
                    <form
                            name="changePassword"
                            id="changePassword"
                            class="container_column_start"
                            onsubmit="return false"

                    >

                        {{{ oldPassword }}}
                        {{{ newPassword }}}
                        {{{ secondPassword }}}

                        {{{ button
                                class="button"
                                label="Изменить"
                                form="loginForm"
                                onclick=submit
                        }}}
                    </form>

                </main>
            </div>
        </div>
		`;
	}
}
