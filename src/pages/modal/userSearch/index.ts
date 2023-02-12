import Block, { Props } from '../../../core/Block';
import FormField from '../../../components/formField';
import router from '../../../core/Router';


export default class UserSearch extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				props.submit(this.props.events);
			},
			clickBack: () => {
				router.closeModalById('userSearch');
			}
		});
	}

	init() {


		this.children.login = <Block>new FormField({
			type: 'text',
			name: 'login',
			label: 'Логин'
		});
	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover" id="userSearch">
            <div class="main-window ">
                <header class="main-window__top-line ">
                    <h1>{{ title }}</h1>
                    {{{ windowManager variation="close" }}}
                </header>
                <main class="container_column_start" style="padding: 40px;">
                    <span>{{ description }}</span>
                    <form
                            name="searchUser"
                            id="searchUser"
                            class="container_column_start"
                            onsubmit="return false"
                            style=" min-height: 150px; justify-content: space-between;"
                    >

                        {{{ login }}}
                        <div class='container_row_between'>
                            {{{ button
                                    class="button"
                                    label="Назад"
                                    form="loginForm"
                                    onclick=clickBack
                            }}}
                            {{{ button
                                    class="button"
                                    label="Найти"
                                    form="loginForm"
                                    onclick=submit
                            }}}

                        </div>
                    </form>
                </main>
            </div>
        </div>
		`;
	}
}
