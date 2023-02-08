import Block, { Props } from '../../../core/Block';
import FormField from '../../../components/formField';
import { checkFormValidity } from '../../../utils/validator';
import UserController from '../../../controllers/UserController';
import { IUserSearch } from '../../../types';
import store from '../../../core/Store';

export default class UserSearch extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				event!.preventDefault();
				event!.stopPropagation();
				// @ts-ignore
				const form: any = document.forms.searchUser;
				const data: unknown = checkFormValidity(form);
				UserController.searchUser(data as IUserSearch);
			},
		});
	}

	init() {
		console.log(store.getState());
		store.set('searchUser', null);

		this.children.login = <Block>new FormField({
			type: 'text',
			name: 'login',
			label: 'Логин',
		});
	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover" id="userSearch">
            <div class="main-window ">
                <header class="main-window__top-line ">
                    <h1>Поиск пользователя</h1>
                    {{{ windowManager variation="close" }}}
                </header>
                <main class="container_column_start" style="padding: 40px 40px 0;">
										{{#if searchUser}}
												
												
										{{else}}
                        <form
                                name="searchUser"
                                id="searchUser"
                                class="container_column_start"
                                onsubmit="submit()"
																style=" min-height: 150px; justify-content: space-between;"
                        >

                            {{{ login }}}
                            {{{ button
                                    class="button"
                                    label="Найти"
                                    form="loginForm"
                                    onclick=submit
                            }}}
                        </form>
										{{/if}}
                    <h3>{{ message }}</h3>
                </main>
            </div>
        </div>
		`;
	}
}
