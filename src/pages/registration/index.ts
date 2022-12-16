import Block, { Props } from '../../utils/Block';
import { checkFormValidity } from '../../utils/validator';

export default class Registration extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				event!.preventDefault();
				event!.stopPropagation()
				// @ts-ignore
				const regForm: any = document.forms.registrationForm;
				const data = checkFormValidity(regForm);
				console.log(data);
				if (regForm.dataset.valid === 'true') {
					// @ts-ignore
					window.PAGES.selectPage(window.PAGES.chat)
				}
			}
		});
	}

	render() {
		// language=hbs
		return `
        <div class="main-window">
            <header class="main-window__top-line">
                <h1>{{title}}</h1>
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
                    {{{formField
                            type="text"
                            name="login"
                            label="Логин"


                    }}}
                    {{{formField
                            type="email"
                            name="email"
                            label="email"


                    }}}
                    {{{formField
                            type="text"
                            name="first_name"
                            label="Имя"


                    }}}
                    {{{formField
                            type="text"
                            name="second_name"
                            label="Фамилия"


                    }}}
                    {{{formField
                            type="phone"
                            name="phone"
                            label="Телефон"


                    }}}
                    {{{formField
														type="password"
                            name="password"
                            label="Пароль"


                    }}}
                    {{{formField
                            type="password"
                            name="second_password"
                            label="Повторите пароль"


                    }}}
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
