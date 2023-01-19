import Block, { Props } from '../../../utils/Block';
import Button from '../../../components/button';
import UserController from '../../../controllers/UserController';

export default class LoadAvatar extends Block {
	constructor(props: Props) {
		super({
			...props,
			submit: () => {
				// @ts-ignore
				const form = document.forms.updateAvatar;
				const file = form.elements.avatar;
				const data: FormData = new FormData(form);
				data.append('avatar', file.files[0]);
				UserController.updateAvatar(data);
			},
		});
	}

	init() {
		this.children.submitButton = <Block>new Button({
			label: 'Отправить',
			class: 'button',
		});
	}

	render() {
		// language=hbs
		return `
        <div class="modal-cover">
            <div class="main-window ">
                <header class="main-window__top-line ">
                    <h1>Изменить аватар</h1>
                    {{{windowManager variation="close" }}}
                </header>
                <main class="container_column_center" style="padding: 40px">
                    <div class="logo"></div>

                    <form
                            name="updateAvatar"
                            id="updateAvatar"
                            class="container_column_start"
														onsubmit="submit()"
                    >
                        <input type="file"  id="avatar">
                        {{{button class="button" label="Вход" form="loginForm" onclick=submit}}}
                    </form>

                </main>
            </div>
        </div>
		`;
	}
}
